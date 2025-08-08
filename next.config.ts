/** @type {import('next').NextConfig} */
const nextConfig = {
  // a partir do next.js 13, a propriedade de imagens deve ser configurada assim.
  // isso por causa da imagem
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },      
    ],
  },
};

module.exports = nextConfig;