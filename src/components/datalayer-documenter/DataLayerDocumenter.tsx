import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  buildDocxBlob,
  buildMarkdown,
  createInitialState,
  documentFilename,
  downloadBlob,
  parseSavedState,
  selectedSections,
  type DocumentParameter,
  type DocumentSection,
  type DocumentSettings,
  type DocumentState,
} from "./engine";
import "./datalayer-documenter.css";

const STORAGE_KEY = "nk:datalayer-documenter:v1";

function EditableText({
  value,
  onChange,
  label,
  className = "",
  rows = 2,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
  rows?: number;
}) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const element = textarea.current;
    if (!element) return;
    const resize = () => {
      element.style.height = "auto";
      const borderAndScrollbar = element.offsetHeight - element.clientHeight;
      element.style.height = `${element.scrollHeight + borderAndScrollbar}px`;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [value]);

  return (
    <label className={`dl-editable ${className}`}>
      <span className="visually-hidden">{label}</span>
      <textarea ref={textarea} rows={rows} value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
      <PrintText value={value} />
    </label>
  );
}

// Form controls clip and keep screen-width heights on paper, so print shows this plain copy instead.
const PrintText = ({ value }: { value: string }) => <span className="dl-print" aria-hidden="true">{value}</span>;

export default function DataLayerDocumenter() {
  const [state, setState] = useState<DocumentState>(createInitialState);
  const [saveStatus, setSaveStatus] = useState("Luonnos tallennetaan tähän selaimeen.");
  const [exportStatus, setExportStatus] = useState("");
  const [exportingDocx, setExportingDocx] = useState(false);
  const hydrated = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState(parseSavedState(saved));
        setSaveStatus("Aiempi luonnos palautettiin tästä selaimesta.");
      }
    } catch {
      setSaveStatus("Luonnosta ei voitu lukea. Voit silti muokata ja viedä dokumentin.");
    } finally {
      hydrated.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    setSaveStatus("Tallennetaan luonnosta...");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        setSaveStatus("Luonnos tallennettu tähän selaimeen.");
      } catch {
        setSaveStatus("Luonnosta ei voitu tallentaa. Vie dokumentti ennen sivulta poistumista.");
      }
    }, 350);
    return () => clearTimeout(saveTimer.current);
  }, [state]);

  const chosen = useMemo(() => selectedSections(state), [state]);
  const groups = useMemo(() => Array.from(new Set(state.sections.map(({ group }) => group))), [state.sections]);

  const updateSettings = (key: keyof DocumentSettings, value: string) =>
    setState((current) => ({ ...current, settings: { ...current.settings, [key]: value } }));

  const updateSection = (id: string, patch: Partial<DocumentSection>) =>
    setState((current) => ({
      ...current,
      sections: current.sections.map((section) => section.id === id ? { ...section, ...patch } : section),
    }));

  const updateParameter = (sectionId: string, index: number, patch: Partial<DocumentParameter>) =>
    setState((current) => ({
      ...current,
      sections: current.sections.map((section) => section.id === sectionId
        ? { ...section, parameters: section.parameters.map((parameter, parameterIndex) => parameterIndex === index ? { ...parameter, ...patch } : parameter) }
        : section),
    }));

  const moveSection = (id: string, direction: -1 | 1) => {
    setState((current) => {
      const sections = [...current.sections];
      const index = sections.findIndex((section) => section.id === id);
      let nextIndex = index + direction;
      while (sections[nextIndex] && !sections[nextIndex].selected) nextIndex += direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= sections.length) return current;
      [sections[index], sections[nextIndex]] = [sections[nextIndex], sections[index]];
      return { ...current, sections };
    });
  };

  const reset = () => {
    if (!window.confirm("Palautetaanko alkuperäinen sisältöpohja? Nykyisiä muutoksia ei voi palauttaa.")) return;
    localStorage.removeItem(STORAGE_KEY);
    setState(createInitialState());
    setExportStatus("Alkuperäinen sisältöpohja palautettu.");
  };

  const downloadMarkdown = () => {
    downloadBlob(new Blob([buildMarkdown(state)], { type: "text/markdown;charset=utf-8" }), documentFilename(state, "md"));
    setExportStatus("Markdown-tiedosto ladattu.");
  };

  const downloadDocx = async () => {
    setExportingDocx(true);
    setExportStatus("Muodostetaan DOCX-tiedostoa...");
    try {
      downloadBlob(await buildDocxBlob(state), documentFilename(state, "docx"));
      setExportStatus("DOCX-tiedosto ladattu.");
    } catch (error) {
      console.error("DOCX export failed", error);
      setExportStatus("DOCX-tiedostoa ei voitu muodostaa. Kokeile uudelleen tai vie Markdown-tiedosto.");
    } finally {
      setExportingDocx(false);
    }
  };

  const printPdf = () => {
    setExportStatus("Valitse tulostusikkunassa Tallenna PDF:nä ja poista valinta kohdasta Ylä- ja alatunnisteet.");
    requestAnimationFrame(() => window.print());
  };

  return (
    <section className="dl-builder" aria-label="dataLayer-dokumentaatiogeneraattori">
      {/* Chrome can't draw images in @page margin boxes, so the running header is a fixed element that repeats on every printed page. */}
      <div className="dl-print-header" aria-hidden="true">
        <img src="/nk-logo-print.svg" alt="" />
        <span>{state.settings.title.trim() || "Verkkokaupan dataLayer-dokumentaatio"}</span>
        <span>Niko Karppinen</span>
      </div>
      <div className="dl-builder__privacy">
        <strong>Paikallinen luonnos</strong>
        <p>Asiakastiedot ja muokkaukset säilyvät vain tässä selaimessa.</p>
      </div>

      <div className="dl-builder__layout">
        <aside className="dl-controls" aria-label="Dokumentin asetukset">
          <div className="dl-controls__section">
            <p className="label">1. Projektitiedot</p>
            <label>
              <span>Asiakkaan nimi</span>
              <input value={state.settings.clientName} onChange={(event) => updateSettings("clientName", event.target.value)} placeholder="Esim. Acme Oy" />
            </label>
            <label>
              <span>Verkkokauppa-alusta</span>
              <input value={state.settings.platform} onChange={(event) => updateSettings("platform", event.target.value)} placeholder="Esim. Shopify" />
            </label>
            <label>
              <span>Valuutta</span>
              <input value={state.settings.currency} onChange={(event) => updateSettings("currency", event.target.value.toUpperCase())} maxLength={3} inputMode="text" placeholder="EUR" />
            </label>
            <label>
              <span>Dokumentin versio</span>
              <input value={state.settings.documentVersion} onChange={(event) => updateSettings("documentVersion", event.target.value)} placeholder="1.0" />
            </label>
          </div>

          <div className="dl-controls__section">
            <div className="dl-controls__heading">
              <p className="label">2. Valitse osiot</p>
              <span>{chosen.length}/{state.sections.length}</span>
            </div>
            <div className="dl-selection">
              {groups.map((group) => (
                <fieldset key={group}>
                  <legend>{group}</legend>
                  {state.sections.filter((section) => section.group === group).map((section) => (
                    <label key={section.id}>
                      <input type="checkbox" checked={section.selected} onChange={(event) => updateSection(section.id, { selected: event.target.checked })} />
                      <span>{section.eventName || section.title}</span>
                    </label>
                  ))}
                </fieldset>
              ))}
            </div>
          </div>

          <div className="dl-controls__section dl-export">
            <p className="label">3. Vie dokumentti</p>
            <button type="button" onClick={downloadMarkdown} disabled={!chosen.length}>Lataa Markdown</button>
            <button type="button" onClick={downloadDocx} disabled={!chosen.length || exportingDocx}>{exportingDocx ? "Muodostetaan DOCX..." : "Lataa DOCX"}</button>
            <button type="button" onClick={printPdf} disabled={!chosen.length}>Tulosta tai tallenna PDF</button>
            <button type="button" className="dl-reset" onClick={reset}>Palauta sisältöpohja</button>
            <p className="dl-status" role="status" aria-live="polite">{exportStatus || saveStatus}</p>
          </div>
        </aside>

        <div className="dl-document" id="datalayer-document">
          <header className={`dl-document__header${state.settings.notes.trim() ? "" : " dl-document__header--no-notes"}`}>
            <EditableText className="dl-title" rows={1} label="Dokumentin otsikko" value={state.settings.title} onChange={(value) => updateSettings("title", value)} />
            <dl>
              <div><dt>Asiakas</dt><dd>{state.settings.clientName || "Täydennä asiakkaan nimi"}</dd></div>
              <div><dt>Alusta</dt><dd>{state.settings.platform || "Täydennä verkkokauppa-alusta"}</dd></div>
              <div><dt>Valuutta</dt><dd>{state.settings.currency || "EUR"}</dd></div>
              <div><dt>Versio</dt><dd>{state.settings.documentVersion || "1.0"}</dd></div>
            </dl>
            <div className="dl-project-notes">
              <span>Projektin lisähuomiot</span>
              <EditableText rows={3} label="Projektin lisähuomiot" value={state.settings.notes} onChange={(value) => updateSettings("notes", value)} />
            </div>
          </header>

          {!chosen.length ? (
            <div className="dl-empty">
              <h2>Valitse vähintään yksi osio</h2>
              <p>Dokumentti muodostuu vasemmalta valituista sisältöosioista.</p>
            </div>
          ) : chosen.map((section, chosenIndex) => (
            <article className="dl-section" key={section.id}>
              <div className="dl-section__order" aria-label={`${section.title}: järjestys`}>
                <span>{String(chosenIndex + 1).padStart(2, "0")}</span>
                <button type="button" aria-label={`Siirrä ${section.title} ylemmäs`} onClick={() => moveSection(section.id, -1)} disabled={chosenIndex === 0}>↑</button>
                <button type="button" aria-label={`Siirrä ${section.title} alemmas`} onClick={() => moveSection(section.id, 1)} disabled={chosenIndex === chosen.length - 1}>↓</button>
              </div>

              <div className="dl-section__content">
                {section.eventName && <code className="dl-event-name">{section.eventName}</code>}
                <h2 className="dl-section-title" aria-label={section.title}>
                  <EditableText rows={1} label={`${section.title}: otsikko`} value={section.title} onChange={(value) => updateSection(section.id, { title: value })} />
                </h2>

                <div className="dl-copy-block">
                  <strong>Tarkoitus</strong>
                  <EditableText rows={2} label={`${section.title}: tarkoitus`} value={section.purpose} onChange={(value) => updateSection(section.id, { purpose: value })} />
                </div>
                <div className="dl-copy-block">
                  <strong>Lähetyshetki ja toteutus</strong>
                  <EditableText rows={3} label={`${section.title}: lähetyshetki ja toteutus`} value={section.trigger} onChange={(value) => updateSection(section.id, { trigger: value })} />
                </div>

                {!!section.parameters.length && (
                  <div className="dl-parameters">
                    <h3>Parametrit</h3>
                    <div className="dl-table-wrap">
                      <table>
                        <thead><tr><th>Parametri</th><th>Tyyppi</th><th>Pakollinen</th><th>Kuvaus</th></tr></thead>
                        <tbody>
                          {section.parameters.map((parameter, parameterIndex) => (
                            <tr key={`${section.id}-${parameterIndex}`}>
                              <td><input aria-label={`${section.title}: parametrin nimi`} value={parameter.name} onChange={(event) => updateParameter(section.id, parameterIndex, { name: event.target.value })} /><PrintText value={parameter.name} /></td>
                              <td><input aria-label={`${parameter.name}: tyyppi`} value={parameter.type} onChange={(event) => updateParameter(section.id, parameterIndex, { type: event.target.value })} /><PrintText value={parameter.type} /></td>
                              <td>
                                <select aria-label={`${parameter.name}: pakollisuus`} value={parameter.required} onChange={(event) => updateParameter(section.id, parameterIndex, { required: event.target.value as DocumentParameter["required"] })}>
                                  <option>Kyllä</option><option>Jompikumpi</option><option value="Jos value">Jos value annetaan</option><option>Suositeltu</option><option>Ei</option>
                                </select>
                                <PrintText value={parameter.required === "Jos value" ? "Jos value annetaan" : parameter.required} />
                              </td>
                              <td>
                                <EditableText
                                  rows={2}
                                  label={`${parameter.name}: kuvaus`}
                                  value={parameter.description}
                                  onChange={(value) => updateParameter(section.id, parameterIndex, { description: value })}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {section.code && (
                  <div className="dl-code">
                    <h3>Esimerkki</h3>
                    <EditableText rows={1} label={`${section.title}: koodiesimerkki`} value={section.code} onChange={(value) => updateSection(section.id, { code: value })} />
                  </div>
                )}

                <div className={`dl-notes${section.notes.some((note) => note.trim()) ? "" : " dl-notes--empty"}`}>
                  <h3>Erityistapaukset ja tarkistukset</h3>
                  {section.notes.map((note, noteIndex) => (
                    <div className={`dl-note${note.trim() ? "" : " dl-note--empty"}`} key={`${section.id}-note-${noteIndex}`}>
                      <span aria-hidden="true">•</span>
                      <EditableText rows={2} label={`${section.title}: huomio ${noteIndex + 1}`} value={note} onChange={(value) => updateSection(section.id, { notes: section.notes.map((item, index) => index === noteIndex ? value : item) })} />
                      <button type="button" aria-label={`Poista huomio ${noteIndex + 1} osiosta ${section.title}`} onClick={() => updateSection(section.id, { notes: section.notes.filter((_, index) => index !== noteIndex) })}>Poista</button>
                    </div>
                  ))}
                  <button type="button" className="dl-add-note" onClick={() => updateSection(section.id, { notes: [...section.notes, ""] })}>Lisää huomio</button>
                </div>

                <a className="dl-source" href={section.source} target="_blank" rel="noreferrer">Google Developers -lähde</a>
                {section.source.trim() && <p className="dl-print dl-print-source">Lähde: {section.source.trim()}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
