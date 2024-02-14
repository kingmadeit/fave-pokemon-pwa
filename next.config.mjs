/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
    INTERNAL_POKEMON_LIST_ENDPOINT: process.env.INTERNAL_POKEMON_LIST_ENDPOINT,
    INTERNAL_POKEMON_DETAIL_ENDPOINT: process.env.INTERNAL_POKEMON_DETAIL_ENDPOINT,
    EXTERNAL_POKEMON_LIST_ENDPOINT: process.env.EXTERNAL_POKEMON_LIST_ENDPOINT
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
  },
};

export default nextConfig;
