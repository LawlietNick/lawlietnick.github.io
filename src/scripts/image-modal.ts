type Point = { x: number; y: number };
let dispose: (() => void) | undefined;

export function enhanceImageModal(root: HTMLElement) {
  dispose?.();
  const dialog = root.querySelector<HTMLDialogElement>("#image-modal");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const viewport = dialog.querySelector<HTMLElement>(".image-modal__viewport")!;
  const image = document.createElement("img");
  image.className = "image-modal__image";
  image.alt = "";
  image.draggable = false;
  image.decoding = "async";
  image.hidden = true;
  dialog.querySelector("[data-image-slot]")!.replaceChildren(image);
  const caption = dialog.querySelector<HTMLElement>("#image-modal-caption")!;
  const status = dialog.querySelector<HTMLElement>("[data-image-status]")!;
  const original = dialog.querySelector<HTMLAnchorElement>("[data-image-original]")!;
  const output = dialog.querySelector<HTMLOutputElement>("[data-image-zoom]")!;
  const closeButton = dialog.querySelector<HTMLButtonElement>('[data-image-action="close"]')!;
  const zoomIn = dialog.querySelector<HTMLButtonElement>('[data-image-action="in"]')!;
  const zoomOut = dialog.querySelector<HTMLButtonElement>('[data-image-action="out"]')!;
  const fitButton = dialog.querySelector<HTMLButtonElement>('[data-image-action="fit"]')!;
  const controller = new AbortController();
  const { signal } = controller;
  const pointers = new Map<number, Point>();
  let opener: HTMLAnchorElement | undefined;
  let loaded = false;
  let locked = false;
  let scrollY = 0;
  let previousTop = "";
  let fitScale = 1;
  let width = 0;
  let height = 0;
  let zoom = 1;
  let x = 0;
  let y = 0;
  const maxZoom = () => Math.max(4, 1 / fitScale);

  function render() {
    const limitX = Math.max(0, (width * zoom - viewport.clientWidth) / 2);
    const limitY = Math.max(0, (height * zoom - viewport.clientHeight) / 2);
    x = Math.max(-limitX, Math.min(x, limitX));
    y = Math.max(-limitY, Math.min(y, limitY));
    image.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${zoom})`;
    viewport.toggleAttribute("data-zoomed", loaded && zoom > 1);
    output.value = loaded ? `${Math.round(fitScale * zoom * 100)}%` : "—";
    zoomIn.disabled = !loaded || zoom >= maxZoom();
    zoomOut.disabled = !loaded || zoom <= 1;
    fitButton.disabled = !loaded || zoom === 1;
    const focused = document.activeElement;
    if (focused instanceof HTMLButtonElement && dialog!.contains(focused) && focused.disabled) viewport.focus({ preventScroll: true });
  }

  function fit() {
    if (!loaded) return;
    fitScale = Math.min(1, Math.max(1, viewport.clientWidth - 24) / image.naturalWidth, Math.max(1, viewport.clientHeight - 24) / image.naturalHeight);
    width = image.naturalWidth * fitScale;
    height = image.naturalHeight * fitScale;
    image.style.width = `${width}px`;
    image.style.height = `${height}px`;
    zoom = 1;
    x = y = 0;
    render();
  }

  function setZoom(value: number, anchor: Point = { x: 0, y: 0 }) {
    if (!loaded) return;
    const next = Math.max(1, Math.min(value, maxZoom()));
    const ratio = next / zoom;
    x = anchor.x - (anchor.x - x) * ratio;
    y = anchor.y - (anchor.y - y) * ratio;
    zoom = next;
    render();
  }

  function unlock(restoreFocus: boolean) {
    if (!locked) return;
    locked = false;
    pointers.clear();
    viewport.removeAttribute("data-dragging");
    document.documentElement.classList.remove("image-modal-open");
    root.style.top = previousTop;
    window.scrollTo({ top: scrollY, behavior: "instant" });
    if (restoreFocus && opener?.isConnected) opener.focus({ preventScroll: true });
  }

  function open(link: HTMLAnchorElement) {
    const figure = link.closest("figure");
    const thumb = link.querySelector("img") ?? figure?.querySelector("img");
    opener = link;
    loaded = false;
    zoom = 1;
    x = y = 0;
    image.hidden = true;
    image.alt = thumb?.alt ?? link.textContent?.trim() ?? "";
    caption.textContent = figure?.dataset.imageCaption ?? link.dataset.imageCaption ?? image.alt;
    status.textContent = dialog!.dataset.loading!;
    original.hidden = true;
    original.href = link.href;
    scrollY = window.scrollY;
    previousTop = root.style.top;
    locked = true;
    root.style.top = `-${scrollY}px`;
    document.documentElement.classList.add("image-modal-open");
    render();
    dialog!.showModal();
    closeButton.focus({ preventScroll: true });
    image.src = link.href;
  }

  for (const element of root.querySelectorAll<HTMLElement>("[data-image-modal]")) {
    const links: HTMLAnchorElement[] = [];
    if (element instanceof HTMLAnchorElement) links.push(element);
    else {
      const source = element.dataset.imageModal;
      const thumb = element.querySelector("img");
      if (!source || !thumb) continue;
      const media = thumb.closest("picture") ?? thumb;
      let link = media.closest("a");
      if (!link) {
        link = document.createElement("a");
        media.before(link);
        link.append(media);
      }
      link.href = source;
      link.classList.add("image-modal-trigger");
      link.setAttribute("aria-label", `${dialog.dataset.enlarge}: ${element.dataset.imageCaption ?? thumb.alt}`);
      links.push(link);
      for (const candidate of element.querySelectorAll<HTMLAnchorElement>("figcaption a[href]")) {
        if (candidate.href === link.href) links.push(candidate);
      }
    }
    for (const link of links) {
      link.setAttribute("aria-haspopup", "dialog");
      link.setAttribute("aria-controls", dialog.id);
      link.addEventListener("click", (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        open(link);
      }, { signal });
    }
  }

  image.addEventListener("load", () => {
    if (!dialog.open) return;
    loaded = true;
    image.hidden = false;
    status.textContent = "";
    fit();
  }, { signal });
  image.addEventListener("error", () => {
    if (!dialog.open) return;
    loaded = false;
    image.hidden = true;
    status.textContent = dialog.dataset.error!;
    original.hidden = false;
    render();
  }, { signal });
  closeButton.addEventListener("click", () => dialog.close(), { signal });
  dialog.addEventListener("close", () => unlock(true), { signal });
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = [...dialog.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]')]
      .filter((element) => element.getClientRects().length && !element.closest("[hidden]"));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }, { signal });
  zoomIn.addEventListener("click", () => setZoom(zoom * 1.5), { signal });
  zoomOut.addEventListener("click", () => setZoom(zoom / 1.5), { signal });
  fitButton.addEventListener("click", fit, { signal });
  viewport.addEventListener("dblclick", () => setZoom(zoom > 1 ? 1 : Math.min(maxZoom(), Math.max(2, 1 / fitScale))), { signal });
  viewport.addEventListener("wheel", (event) => {
    if (!loaded) return;
    event.preventDefault();
    const bounds = viewport.getBoundingClientRect();
    setZoom(zoom * Math.exp(-event.deltaY * 0.002), { x: event.clientX - bounds.left - bounds.width / 2, y: event.clientY - bounds.top - bounds.height / 2 });
  }, { passive: false, signal });
  viewport.addEventListener("keydown", (event) => {
    if (event.key === "+" || event.key === "=") setZoom(zoom * 1.5);
    else if (event.key === "-") setZoom(zoom / 1.5);
    else if (event.key === "0") fit();
    else if (event.key.startsWith("Arrow")) {
      if (event.key === "ArrowLeft") x += 40;
      if (event.key === "ArrowRight") x -= 40;
      if (event.key === "ArrowUp") y += 40;
      if (event.key === "ArrowDown") y -= 40;
      render();
    } else return;
    event.preventDefault();
  }, { signal });

  viewport.addEventListener("pointerdown", (event) => {
    if (!loaded || event.button !== 0 || pointers.size >= 2 || (event.target instanceof Element && event.target.closest("a"))) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    viewport.setPointerCapture(event.pointerId);
    viewport.setAttribute("data-dragging", "");
  }, { signal });
  viewport.addEventListener("pointermove", (event) => {
    const previous = pointers.get(event.pointerId);
    if (!previous) return;
    const before = [...pointers.values()];
    const current = { x: event.clientX, y: event.clientY };
    pointers.set(event.pointerId, current);
    if (pointers.size === 2) {
      const after = [...pointers.values()];
      const distance = (points: Point[]) => Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
      const midpoint = (points: Point[]) => ({ x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 });
      const oldMid = midpoint(before);
      const newMid = midpoint(after);
      const bounds = viewport.getBoundingClientRect();
      const oldDistance = distance(before);
      if (oldDistance > 0) setZoom(zoom * distance(after) / oldDistance, { x: oldMid.x - bounds.left - bounds.width / 2, y: oldMid.y - bounds.top - bounds.height / 2 });
      x += newMid.x - oldMid.x;
      y += newMid.y - oldMid.y;
    } else {
      x += current.x - previous.x;
      y += current.y - previous.y;
    }
    render();
  }, { signal });
  const endPointer = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    if (!pointers.size) viewport.removeAttribute("data-dragging");
  };
  viewport.addEventListener("pointerup", endPointer, { signal });
  viewport.addEventListener("pointercancel", endPointer, { signal });
  viewport.addEventListener("lostpointercapture", endPointer, { signal });

  const observer = new ResizeObserver(() => { if (dialog.open) fit(); });
  observer.observe(viewport);
  dispose = () => {
    if (dialog.open) dialog.close();
    unlock(false);
    observer.disconnect();
    controller.abort();
  };
  document.addEventListener("astro:before-swap", dispose, { once: true, signal });
}
