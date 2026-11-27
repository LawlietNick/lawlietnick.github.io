export interface StoredState<T> {
  /** The stored value, or `fallback` when missing, blocked or unreadable. */
  get<F = undefined>(fallback?: F): T | F;
  /** Stores the value as JSON; false when storage refused. */
  set(value: T): boolean;
  /** Deletes the entry; false when storage refused. */
  remove(): boolean;
}

/** One localStorage entry, JSON in and out, that never throws. */
export declare function storedState<T = unknown>(key: string): StoredState<T>;
