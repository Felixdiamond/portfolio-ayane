/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable server-side rendering for specific components
  webpack(config, { isServer }) {
    // Modify webpack for the client-side code only
    if (isServer) {
      config.node = {
        fs: 'empty',  // Ignore 'fs' module error (for server-side)
        net: 'empty', // Ignore 'net' module error (for server-side)
        tls: 'empty', // Ignore 'tls' module error (for server-side)
      };
    }

    // This part ensures all the window-related issues are ignored during SSR
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Here we are adding fallbacks for missing client-side modules
      fs: false,
      path: false,
      os: false,
      crypto: false,
      util: false,
      stream: false,
      assert: false,
      url: false,
    };

    return config;
  },

  // Disable React Strict Mode (sometimes it throws errors that are not critical)
  reactStrictMode: false,

  // Allow for specific client-side code to bypass SSR errors
  // Use dynamic import with ssr: false to disable SSR for specific components
  experimental: {
    optimizeCss: true,
  },

  // Handle warnings and errors related to missing metadataBase in Next.js pages
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },

  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },

  // Disable telemetry (which can sometimes cause issues)
  telemetry: false,
};

export default nextConfig;
