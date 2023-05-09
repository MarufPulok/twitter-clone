/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org', 'images.unsplash.com', 'avatars.githubusercontent.com', 'encrypted-tbn0.gstatic.com'],
  },
}

module.exports = nextConfig
