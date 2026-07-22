import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'dummyimage.com' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
    // Simple Icons / placehold.co serve SVG, which Next's optimizer either
    // rejects outright or fails to process through sharp/squoosh (intermittent
    // 400/500s). These are already-small external logos that don't benefit
    // from resizing/format conversion, so skip the optimizer entirely — this
    // also removes a real per-image round trip that was adding to page load time.
    unoptimized: true,
  },
  // three.js ships large ESM — transpile for consistent builds
  transpilePackages: ['three'],
};

export default withNextIntl(nextConfig);
