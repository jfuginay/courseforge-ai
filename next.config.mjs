/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  eslint: {
    ignoreDuringBuilds: true,
  },
=======
  reactStrictMode: true,
>>>>>>> cf4f70af6b44ef4951d7faa232f62af133dc13be
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
<<<<<<< HEAD
    unoptimized: true,
  },
}

export default nextConfig
=======
    domains: ["assets.co.dev", "images.unsplash.com"],
  },
  webpack: (config, context) => {
    config.optimization.minimize = process.env.NEXT_PUBLIC_CO_DEV_ENV !== "preview";
    return config;
  }
};

export default nextConfig;
>>>>>>> cf4f70af6b44ef4951d7faa232f62af133dc13be
