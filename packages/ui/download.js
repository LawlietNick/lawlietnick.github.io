// downloadFile(content, filename, type): saves a string or Blob as a file through a temporary link.
// The object URL is released on the next task, not right after click(): some browsers start reading it late.

export function downloadFile(content, filename, type = "text/plain;charset=utf-8") {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
