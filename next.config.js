/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization with AVIF/WebP
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "alpinevisa.com.np",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },

  // Advanced performance optimizations
  // experimental: {
  //   optimizeCss: true,
  //   optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  // },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // PWA and service worker support
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // HTTP/3 and modern protocols
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Performance headers
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          // Edge caching
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },
      {
        source: "/service-worker.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      // API routes caching
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=600",
          },
        ],
      },
    ];
  },

  // SEO redirects and rewrites
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/study-abroad",
        destination: "/study-destinations",
        permanent: true,
      },
      {
        source: "/ielts",
        destination: "/test-preparation/ielts",
        permanent: true,
      },
      {
        source: "/pte",
        destination: "/test-preparation/pte",
        permanent: true,
      },
      {
        source: "/toefl",
        destination: "/test-preparation/toefl",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      // Edge config for personalization
      {
        source: "/api/personalize/:path*",
        destination: "/api/edge-config/:path*",
      },
    ];
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    EDGE_CONFIG: process.env.EDGE_CONFIG,
  },

  // Advanced webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          // Separate React and Next.js chunks
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react",
            chunks: "all",
          },
          // Separate UI components
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: "ui",
            chunks: "all",
          },
        },
      };
    }

    return config;
  },

  // Trailing slash configuration
  trailingSlash: false,

  // Enable experimental features
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig; 