import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Adicionando Cloudinary como domínio permitido
  },
};

export default nextConfig;
