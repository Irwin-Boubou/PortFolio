/** Tiny class-name combiner (avoids an extra dependency). */
export default function clsxLite(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}
