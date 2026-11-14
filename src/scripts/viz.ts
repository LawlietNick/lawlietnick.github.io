// Animation driver for the figures in src/components/viz/.
//
// Single-phase figures: data-state is "idle" (hidden start frame) or "playing".
// Two-phase figures (data-viz-phases="2"): data-phase is "0" (start frame), "1" (the
// problem) or "2" (the result). With neither attribute the figure shows its finished
// frame, so it is complete without JavaScript.
//
// prefers-reduced-motion never animates: single-phase figures show the finished frame
// and two-phase figures get a Before/After toggle that switches instantly.

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PHASE_ONE_MS = 1200; // time the first phase takes to draw
const AUTO_ADVANCE_MS = 4000; // pause after it before phase 2 starts on its own

function button(label: string, className: string): HTMLButtonElement {
  const el = document.createElement("button");
  el.type = "button";
  el.className = className;
  el.textContent = label;
  return el;
}

function whenVisible(root: HTMLElement, run: () => void): void {
  if (!("IntersectionObserver" in window)) {
    run();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        run();
      }
    },
    { threshold: 0.35 },
  );
  observer.observe(root);
}

function enhanceSinglePhase(root: HTMLElement): void {
  const head = root.querySelector(".viz__head");
  const replay = button(root.dataset.replayLabel ?? "Replay", "viz__replay");
  head?.append(replay);

  const play = () => {
    root.dataset.state = "playing";
  };
  const restart = () => {
    root.dataset.state = "idle";
    void root.offsetWidth; // commit the start frame before the transitions run
    requestAnimationFrame(play);
  };

  root.dataset.state = "idle";
  replay.addEventListener("click", restart);
  whenVisible(root, play);
}

// reduced motion: two static states, no movement
function enhanceToggle(root: HTMLElement): void {
  const group = document.createElement("div");
  group.className = "viz__toggle";
  group.setAttribute("role", "group");
  group.setAttribute("aria-label", root.dataset.labelView ?? "");

  const before = button(root.dataset.labelBefore ?? "", "viz__toggle-button");
  const after = button(root.dataset.labelAfter ?? "", "viz__toggle-button");
  const show = (phase: "1" | "2") => {
    root.dataset.phase = phase;
    before.setAttribute("aria-pressed", String(phase === "1"));
    after.setAttribute("aria-pressed", String(phase === "2"));
  };
  before.addEventListener("click", () => show("1"));
  after.addEventListener("click", () => show("2"));
  group.append(before, after);
  root.querySelector(".viz__head")?.append(group);
  show("2");
}

function enhanceTwoPhase(root: HTMLElement): void {
  if (reducedMotion()) return enhanceToggle(root);

  const controls = document.createElement("div");
  controls.className = "viz__controls";
  const merge = button(root.dataset.labelMerge ?? "", "viz__replay viz__merge");
  const replay = button(root.dataset.replayLabel ?? "Replay", "viz__replay");
  controls.append(merge, replay);
  root.querySelector(".viz__head")?.append(controls);

  let timer = 0;
  // aria-disabled instead of hidden/disabled, so keyboard focus stays on the button
  const setMergeEnabled = (on: boolean) => merge.setAttribute("aria-disabled", String(!on));

  const toPhase2 = () => {
    window.clearTimeout(timer);
    if (!root.isConnected) return;
    setMergeEnabled(false);
    root.dataset.phase = "2";
  };
  const toPhase1 = () => {
    root.dataset.phase = "1";
    setMergeEnabled(true);
    timer = window.setTimeout(toPhase2, PHASE_ONE_MS + AUTO_ADVANCE_MS);
  };
  const restart = () => {
    window.clearTimeout(timer);
    setMergeEnabled(false);
    root.dataset.phase = "0";
    void root.offsetWidth; // commit the start frame before phase 1 runs
    requestAnimationFrame(toPhase1);
  };

  merge.addEventListener("click", () => {
    if (merge.getAttribute("aria-disabled") !== "true") toPhase2();
  });
  replay.addEventListener("click", restart);

  setMergeEnabled(false);
  root.dataset.phase = "0";
  whenVisible(root, toPhase1);
}

export function enhanceViz(): void {
  document.querySelectorAll<HTMLElement>("[data-viz-root]").forEach((root) => {
    if (root.dataset.vizReady) return;
    root.dataset.vizReady = "true";

    if (root.dataset.vizPhases === "2") {
      enhanceTwoPhase(root);
      return;
    }
    if (reducedMotion()) return; // finished frame, no replay button
    enhanceSinglePhase(root);
  });
}
