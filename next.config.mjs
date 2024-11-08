/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // Inaktiverar ESLint under byggprocessen
  },
  experimental: {
    appDir: true,  // Aktiverar stöd för `app`-mappen
  },
};

export default nextConfig;
