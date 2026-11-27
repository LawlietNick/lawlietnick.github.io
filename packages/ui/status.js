// announce(region, text): puts a message in a live region (role="status" or aria-live) so screen readers
// read it, also when it repeats: VoiceOver skips a message identical to the previous one, so a repeat gets a
// trailing space. announce(region, "") clears it. The region must already be in the page when the message
// arrives; render it empty and announce into it.
// nextMessage(previous, text): the same rule for state-driven UI (React), where an identical string would
// not even re-render: `setStatus((previous) => nextMessage(previous, text))`.
// No text of its own, so no FI/EN strings.

export function nextMessage(previous, text) {
  const message = String(text ?? "");
  return message && previous === message ? `${message} ` : message;
}

export function announce(region, text) {
  region.textContent = nextMessage(region.textContent, text);
}
