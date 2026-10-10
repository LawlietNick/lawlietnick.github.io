// This article demonstration changes the page only; it sends no analytics event.
export function observeAuthorVisibility(root: Element | null): () => void {
  const target = root?.querySelector(".author-bio");
  const status = root?.querySelector("[data-visibility-status]");
  const complete = status?.getAttribute("data-visibility-complete");
  const note = root?.querySelector<HTMLElement>("[data-visibility-note]");
  if (!root || !target || !status || !complete || !note || !("IntersectionObserver" in window)) return () => {};

  note.hidden = false;
  let visible = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cancel = () => {
    clearTimeout(timer);
    timer = undefined;
  };
  const update = () => {
    cancel();
    if (!visible || document.hidden) return;
    timer = setTimeout(() => {
      root.setAttribute("data-seen", "");
      status.textContent = complete;
      cleanup();
    }, 1000);
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
    update();
  }, { threshold: 0.5 });
  function cleanup() {
    cancel();
    observer.disconnect();
    document.removeEventListener("visibilitychange", update);
  }
  observer.observe(target);
  document.addEventListener("visibilitychange", update);
  return cleanup;
}
