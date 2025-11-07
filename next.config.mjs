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
    loader: "custom",
    loaderFile: "./image-loader.ts",
    remotePatterns: [
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
};

export default config;
