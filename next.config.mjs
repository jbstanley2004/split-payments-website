/** @type {import("next").NextConfig} */
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    inlineCss: true,
    turbopackUseSystemTlsCerts: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "www.cardmachineoutlet.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/en/(.*)",
        destination: "/",
        permanent: true,
      },
    ];
  },
  turbopack: {
    resolveAlias: {
      '@midday/ui': './src/lib/stub.ts',
      '@midday/supabase': './src/lib/stub.ts',
      '@midday/jobs': './src/lib/stub.ts',
      '@midday/email': './src/lib/stub.ts',
    },
  },
  webpack: (config) => {
    // Enable importing SVG source via ?raw
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /raw/,    // only when you do `import x from 'file.svg?raw'`
      type: 'asset/source',
    });
    return config;
  },
};

export default config;
