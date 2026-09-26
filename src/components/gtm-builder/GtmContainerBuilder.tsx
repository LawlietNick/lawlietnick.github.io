import { useEffect, useMemo, useRef, useState } from "react";
import individualTemplate from "../../data/gtm-templates/full_ecom_gtm.json";
import simplifiedTemplate from "../../data/gtm-templates/full_simplified_ecom_gtm.json";
import {
  applyTagNamingConvention,
  buildSelectedContainer,
  createBuilderState,
  generateSelectedJson,
  outputCounts,
  parseBuilderState,
  selectTags,
  tagOptions,
  toggleTag,
  updateBuilderSetting,
  validateBuilder,
  MEASUREMENT_ID_PATTERN,
  NECESSITY_LABELS,
  type BuilderSettings,
  type GtmRecord,
  type TagNamingConvention,
  type TagOption,
} from "./engine";
import "./gtm-builder.css";

const SOURCES = {
  individual: individualTemplate as GtmRecord,
  simplified: simplifiedTemplate as GtmRecord,
};
type TemplateMode = keyof typeof SOURCES;
// Stable display order for both source templates.
const GROUPS: TagOption["group"][] = ["Page views", "Ecommerce", "Browse", "Cart", "Checkout", "Promotions"];
const STORAGE_KEY = "karppinen-gtm-tag-selection-v1";
const FALLBACK_CURRENCIES = ["EUR", "USD", "GBP", "SEK", "NOK", "DKK", "CHF", "CAD", "AUD", "NZD", "JPY", "PLN"];
const supportedValuesOf = (Intl as typeof Intl & { supportedValuesOf?: (key: string) => string[] }).supportedValuesOf?.bind(Intl);
const currencyNames = typeof Intl.DisplayNames === "function" ? new Intl.DisplayNames(["en"], { type: "currency" }) : undefined;
const CURRENCY_OPTIONS = (supportedValuesOf?.("currency") ?? FALLBACK_CURRENCIES).map((code) => {
  const name = currencyNames?.of(code);
  return { value: code, label: name ? `${code} · ${name}` : code };
});

function Setting({
  label,
  value,
  onChange,
  hint,
  error,
  placeholder,
  pattern,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint: string;
  error?: string;
  placeholder?: string;
  pattern?: string;
  options?: readonly { value: string; label: string }[];
}) {
  const id = `gtm-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div className="gtm-setting">
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select id={id} value={value} aria-describedby={`${id}-hint`} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      ) : (
        /* ponytail: `required` + `pattern` let :user-invalid do the "don't shout before I've typed"
           work in CSS, with no touched/blurred state to track in React */
        <input
          id={id}
          value={value}
          required
          pattern={pattern}
          placeholder={placeholder}
          aria-describedby={`${id}-hint`}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      <small className="gtm-setting__hint" id={`${id}-hint`}>{hint}</small>
      <small className="gtm-setting__error">{error ?? `${label} is required.`}</small>
    </div>
  );
}

export default function GtmContainerBuilder() {
  const [mode, setMode] = useState<TemplateMode>("individual");
  const [namingConvention, setNamingConvention] = useState<TagNamingConvention>("numbered");
  const [state, setState] = useState(() => createBuilderState(SOURCES.individual));
  const [previewOpen, setPreviewOpen] = useState(false);
  const [status, setStatus] = useState("Choose the tags you need. Dependencies are handled automatically.");
  const recovered = useRef(false);
  const source = useMemo(
    () => applyTagNamingConvention(SOURCES[mode], namingConvention),
    [mode, namingConvention],
  );
  const options = useMemo(() => tagOptions(source), [source]);
  const visibleGroups = GROUPS.filter((group) => options.some((option) => option.group === group));
  const validation = useMemo(() => validateBuilder(state, source), [state, source]);
  const ready = validation.errors.length === 0;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const fingerprint = String(parsed?.sourceFingerprint ?? "");
        const savedMode = (Object.keys(SOURCES) as TemplateMode[]).find(
          (candidate) => String(SOURCES[candidate].containerVersion.fingerprint) === fingerprint,
        );
        if (!savedMode) throw new Error("Unknown GTM template.");
        const savedNaming: TagNamingConvention = parsed?.namingConvention === "short" || parsed?.namingConvention === "numbered"
          ? parsed.namingConvention
          : savedMode === "simplified" ? "short" : "numbered";
        const savedSource = applyTagNamingConvention(SOURCES[savedMode], savedNaming);
        setMode(savedMode);
        setNamingConvention(savedNaming);
        setState(parseBuilderState(saved, savedSource));
        setStatus("Saved tag choices recovered.");
      }
    } catch {
      setStatus("Saved choices could not be recovered. Default tag choices restored.");
    } finally {
      recovered.current = true;
    }
  }, []);

  useEffect(() => {
    if (!recovered.current) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, templateMode: mode, namingConvention })); }
    catch { setStatus("Automatic saving is unavailable in this browser."); }
  }, [state, mode, namingConvention]);

  const setting = (key: keyof BuilderSettings, value: string) => {
    const normalized = key === "measurementId" || key === "defaultCurrency" ? value.toUpperCase() : value;
    setState(updateBuilderSetting(state, key, normalized));
  };

  const changeMode = (nextMode: TemplateMode) => {
    if (nextMode === mode) return;
    const currentDefaults = createBuilderState(source);
    const nextSource = applyTagNamingConvention(SOURCES[nextMode], namingConvention);
    const next = createBuilderState(nextSource);
    next.settings.measurementId = state.settings.measurementId;
    next.settings.companyName = state.settings.companyName;
    next.settings.defaultCurrency = state.settings.defaultCurrency;
    if (state.settings.containerName !== currentDefaults.settings.containerName) next.settings.containerName = state.settings.containerName;
    if (state.settings.outputFilename !== currentDefaults.settings.outputFilename) next.settings.outputFilename = state.settings.outputFilename;
    setMode(nextMode);
    setState(next);
    setStatus(nextMode === "simplified" ? "Simplified tag structure selected." : "Individual event tags selected.");
  };

  const changeNamingConvention = (nextConvention: TagNamingConvention) => {
    setNamingConvention(nextConvention);
    setStatus(nextConvention === "short" ? "Short tag names selected." : "Numbered tag names selected.");
  };

  const choosePreset = (preset: "all" | "essential" | "none") => {
    const requiredIds = options.filter(({ necessity }) => necessity === "required").map(({ id }) => id);
    const ids = preset === "all"
      ? options.map(({ id }) => id)
      : preset === "essential"
        ? options.filter(({ necessity }) => necessity === "required" || necessity === "essential").map(({ id }) => id)
        : requiredIds;
    setState(selectTags(state, ids));
    setStatus(preset === "all" ? "All tags selected." : preset === "essential" ? "Required page view and five essential funnel events selected." : "Page view only selected.");
  };

  // Generated at click time, so the export can never be stale relative to the choices on screen.
  const copy = async () => {
    if (!ready) return;
    const json = generateSelectedJson(state, source);
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(json);
      else {
        const textarea = document.createElement("textarea");
        textarea.value = json;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.append(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      setStatus("JSON copied to the clipboard.");
    } catch {
      setStatus("Copy failed. Open the preview and copy the JSON manually.");
    }
  };

  const download = () => {
    if (!ready) return;
    const url = URL.createObjectURL(new Blob([generateSelectedJson(state, source)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = state.settings.outputFilename;
    link.click();
    URL.revokeObjectURL(url);
    setStatus(`Downloaded ${link.download}.`);
  };

  // ponytail: rebuilds the 138 KB container per state change; key on state.selectedTagIds if typing feels laggy
  const counts = useMemo(
    () => (validateBuilder(state, source).errors.length ? undefined : outputCounts(buildSelectedContainer(state, source))),
    [state, source],
  );

  return (
    <div className="gtm-builder">
      <div className="gtm-builder__privacy">
        <strong>Local-only builder</strong>
        <p>Your GTM configuration never leaves this browser.</p>
      </div>

      <div className="gtm-builder__layout">
        <main>
          <section className="gtm-builder__section" aria-labelledby="gtm-settings-title">
            <div className="gtm-section-heading">
              <div><span>1</span><h2 id="gtm-settings-title">Add your details</h2></div>
              <p>These values replace the placeholders in the source container.</p>
            </div>
            <div className="gtm-settings-grid">
              <Setting
                label="GA4 measurement ID"
                value={state.settings.measurementId}
                onChange={(value) => setting("measurementId", value)}
                hint="Find it in GA4 → Admin → Data streams."
                placeholder="G-ABCDEFGHIJK"
                pattern={MEASUREMENT_ID_PATTERN}
                error="Use a value such as G-ABC123."
              />
              <Setting
                label="Company suffix"
                value={state.settings.companyName}
                onChange={(value) => setting("companyName", value)}
                hint="Names the GA4 ID variable: CONST - GA4 ID - G-… - Acme."
                placeholder="Acme"
              />
              {mode === "individual" ? (
                <Setting
                  label="Default currency"
                  value={state.settings.defaultCurrency}
                  onChange={(value) => setting("defaultCurrency", value)}
                  hint="ISO code used when the data layer omits one."
                  options={CURRENCY_OPTIONS}
                />
              ) : (
                <div className="gtm-setting gtm-setting--note">
                  <span>Currency source</span>
                  <p>Provided by <code>ecommerce.currency</code> in each data layer event.</p>
                </div>
              )}
              <Setting
                label="Container name"
                value={state.settings.containerName}
                onChange={(value) => setting("containerName", value)}
                hint="Shown in GTM after import."
              />
            </div>
          </section>

          <section className="gtm-builder__section" aria-labelledby="gtm-events-title">
            <div className="gtm-section-heading gtm-section-heading--events">
              <div><span>2</span><h2 id="gtm-events-title">Choose tags</h2></div>
              <div className="gtm-presets" aria-label="Selection shortcuts">
                {mode === "individual" && <button type="button" onClick={() => choosePreset("essential")}>Essential only</button>}
                <button type="button" onClick={() => choosePreset("all")}>Select all</button>
                <button type="button" onClick={() => choosePreset("none")}>Page view only</button>
              </div>
            </div>

            <div className="gtm-tag-settings">
              <div className="gtm-setting">
                <label htmlFor="gtm-tag-structure">Tag structure</label>
                <select id="gtm-tag-structure" value={mode} aria-describedby="gtm-tag-structure-hint" onChange={(event) => changeMode(event.target.value as TemplateMode)}>
                  <option value="individual">Individual event tags</option>
                  <option value="simplified">One shared ecommerce tag</option>
                </select>
                <small className="gtm-setting__hint" id="gtm-tag-structure-hint">
                  {mode === "individual" ? "Choose ecommerce events separately." : "All 13 supported events use one dynamic GA4 tag."}
                </small>
              </div>
              <div className="gtm-setting">
                <label htmlFor="gtm-tag-naming">Tag naming</label>
                <select id="gtm-tag-naming" value={namingConvention} aria-describedby="gtm-tag-naming-hint" onChange={(event) => changeNamingConvention(event.target.value as TagNamingConvention)}>
                  <option value="numbered">Numbered names</option>
                  <option value="short">Short names</option>
                </select>
                <small className="gtm-setting__hint" id="gtm-tag-naming-hint">
                  {namingConvention === "numbered" ? "Prefixes tags with 01.01, 01.02, and so on." : "Uses tag names without numeric prefixes."}
                </small>
              </div>
            </div>

            <table className="gtm-tags">
              <caption className="visually-hidden">GA4 tags available in this container, grouped by purpose</caption>
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Description</th>
                  <th scope="col">Necessity</th>
                  <th scope="col"><span className="visually-hidden">Include</span></th>
                </tr>
              </thead>
              {/* One tbody per stage: gives each group its own heading row and breathing space,
                  and scope="colgroup" ties the stage to its rows for screen readers. */}
              {visibleGroups.map((group) => {
                const groupOptions = options.filter((option) => option.group === group);
                const selected = groupOptions.filter((option) => state.selectedTagIds.includes(option.id)).length;
                return (
                  <tbody key={group}>
                    <tr className="gtm-tags__group">
                      <th colSpan={5} scope="colgroup">
                        <div><span>{group}</span><span>{selected}/{groupOptions.length}</span></div>
                      </th>
                    </tr>
                    {groupOptions.map((option) => {
                      const id = `gtm-tag-${option.id}`;
                      return (
                        <tr className={option.necessity === "required" ? "gtm-tags__required" : undefined} key={option.id}>
                          <td>{option.tagType}</td>
                          {/* label htmlFor names the checkbox and makes the tag name a second hit target */}
                          <th scope="row">
                            <label htmlFor={id}><strong>{option.eventName}</strong><small>{option.name}</small></label>
                          </th>
                          <td className="gtm-tags__description">{option.description}</td>
                          <td><span className={`gtm-need gtm-need--${option.necessity}`}>{NECESSITY_LABELS[option.necessity]}</span></td>
                          <td className="gtm-tags__select">
                            {/* The box must sit inside its own label — without it the visible
                                checkbox is just a styled span and clicking it does nothing. */}
                            <label className="gtm-tags__box">
                              <input id={id} type="checkbox" checked={state.selectedTagIds.includes(option.id)} disabled={option.necessity === "required"} onChange={() => setState(toggleTag(state, option.id))} />
                              <span className="gtm-event__check" aria-hidden="true">✓</span>
                            </label>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                );
              })}
            </table>
          </section>
        </main>

        <aside className="gtm-summary" aria-labelledby="gtm-summary-title">
          <div className="gtm-summary__inner">
            <p className="gtm-summary__eyebrow">Your container</p>
            <h2 id="gtm-summary-title">{state.selectedTagIds.length} tag{state.selectedTagIds.length === 1 ? "" : "s"} selected</h2>
            <p className="gtm-summary__intro">Matching triggers, variables, folders, and custom templates are included automatically.</p>

            {counts && (
              <dl>
                <div><dt>Tags</dt><dd>{counts.tags}</dd></div>
                <div><dt>Triggers</dt><dd>{counts.triggers}</dd></div>
                <div><dt>Variables</dt><dd>{counts.variables}</dd></div>
                <div><dt>Folders</dt><dd>{counts.folders}</dd></div>
                <div><dt>Custom templates</dt><dd>{counts.templates}</dd></div>
              </dl>
            )}

            <div className="gtm-filename">
              <label htmlFor="gtm-output-filename">Filename</label>
              <input id="gtm-output-filename" value={state.settings.outputFilename} onChange={(event) => setting("outputFilename", event.target.value)} />
            </div>

            {/* Not styled as errors: export is gated by the disabled buttons, so this is a to-do list.
                Genuinely wrong input turns the field itself red via :user-invalid. */}
            {validation.errors.length > 0 && (
              <div className="gtm-messages gtm-messages--todo">
                <p>Before you can export:</p>
                <ul>{validation.errors.map((error) => <li key={error}>{error}</li>)}</ul>
              </div>
            )}
            {validation.warnings.length > 0 && <ul className="gtm-messages">{validation.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>}

            <div className="gtm-export-actions">
              <button className="gtm-primary" type="button" disabled={!ready} onClick={download}>Download</button>
              <button type="button" disabled={!ready} onClick={copy}>Copy JSON</button>
            </div>

            <p className="gtm-status" role="status" aria-live="polite">{status}</p>

            {ready && (
              <details className="gtm-preview" onToggle={(event) => setPreviewOpen(event.currentTarget.open)}>
                <summary>Preview JSON</summary>
                {previewOpen && <textarea aria-label="Generated GTM JSON" readOnly spellCheck={false} value={generateSelectedJson(state, source)} />}
              </details>
            )}
            <button className="gtm-reset" type="button" onClick={() => { localStorage.removeItem(STORAGE_KEY); setState(createBuilderState(source)); setStatus("Builder reset to the source defaults."); }}>Reset choices</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
