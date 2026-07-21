/**
 * i18n helpers for the bilingual content model.
 * Localized fields are stored as { en: ..., fr: ... }.
 * `pickLang` returns the requested language with EN fallback;
 * admin requests use lang="all" and receive the full object.
 */
export const SUPPORTED_LANGS = ['en', 'fr'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number] | 'all';

export function resolveLang(raw: unknown): Lang {
  if (raw === 'all') return 'all';
  return SUPPORTED_LANGS.includes(raw as never) ? (raw as Lang) : 'en';
}

export function pickLang(value: unknown, lang: Lang): unknown {
  if (lang === 'all') return value;
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const map = value as Record<string, unknown>;
    if ('en' in map || 'fr' in map) return map[lang] ?? map.en ?? map.fr ?? null;
  }
  return value;
}

/** Localize a set of Json fields on an entity (returns a shallow copy). */
export function localize<T extends object>(entity: T, fields: string[], lang: Lang): T {
  if (lang === 'all') return entity;
  const source = entity as Record<string, unknown>;
  const out: Record<string, unknown> = { ...source };
  for (const f of fields) out[f] = pickLang(source[f], lang);
  return out as T;
}

/** Validates a locale map coming from the admin panel: requires at least EN. */
export function isLocaleMap(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v) && 'en' in (v as object);
}
