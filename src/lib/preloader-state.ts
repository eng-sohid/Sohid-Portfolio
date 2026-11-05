/**
 * Tiny shared gate so intro animations (hero, navbar, masked headings)
 * only start once the preloader has lifted the curtain.
 *
 * A module-level flag keeps this dependency-free and synchronous,
 * while the `data-content-ready` attribute on <html> lets other
 * components check the state without subscribing.
 */

type Listener = () => void;

let loaded = false;
const listeners = new Set<Listener>();

/** True once the preloader has finished (or was skipped for reduced motion). */
export function isContentLoaded(): boolean {
  if (typeof document !== "undefined") {
    return loaded || document.documentElement.dataset.contentReady === "true";
  }

  return loaded;
}

/** Marks content as ready and notifies every subscriber. */
export function markContentLoaded(): void {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.contentReady = "true";
  }

  if (loaded) return;

  loaded = true;

  for (const listener of [...listeners]) {
    listener();
  }

  listeners.clear();
}

/**
 * Runs the callback immediately when content is already ready,
 * otherwise as soon as the preloader finishes.
 *
 * @returns an unsubscribe function.
 */
export function onContentLoaded(listener: Listener): () => void {
  if (isContentLoaded()) {
    listener();

    return () => {};
  }

  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}
