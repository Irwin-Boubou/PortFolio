/**
 * Standalone schema.org Person JSON-LD script. Not wired into any page —
 * drop `<PersonJsonLd name={...} url={...} />` into the homepage (or elsewhere)
 * to emit it.
 */
export function PersonJsonLd({ name, url }: { name: string; url: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
