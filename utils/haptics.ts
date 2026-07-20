/** Tiny haptic tap — Android Chrome only; a silent no-op everywhere else. */
export function buzz(pattern: number | number[] = 8) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* unsupported — fine */
  }
}
