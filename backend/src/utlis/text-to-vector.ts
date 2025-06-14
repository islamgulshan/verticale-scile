export function textToVector(txt: string, dim = 6): number[] {
  const vals = Array.from(
    { length: dim },
    (_, i) => (txt.charCodeAt(i % txt.length) * 17 + i) % 97,
  );
  const len = Math.hypot(...vals);
  return vals.map((v) => v / len);
}
