
/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Ruta de tu aplicación
          destination: 'https://gestor-de-proyectos-api.vercel.app/api/:path*', // URL de tu API
        },
      ];
    },
  };

export default nextConfig;

