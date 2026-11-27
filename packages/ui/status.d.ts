/** The text to show next so a repeat still differs from `previous`. */
export declare function nextMessage(previous: string, text: string | null | undefined): string;
/** Writes a message into a live region; a repeat of the same message is still read. "" clears it. */
export declare function announce(region: Element, text: string | null | undefined): void;
