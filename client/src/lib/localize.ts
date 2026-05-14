export function localize(obj: object, field: string, lang: string): string {
  const rec = obj as Record<string, unknown>;
  const key = lang === "hr" ? `${field}Hr` : `${field}En`;
  return String(rec[key] ?? "");
}
