import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com', 'www.scm.co.id', ''], 
  },
  darkMode: 'class', 
  content: [
    './app/**/*.{js, ts, jsx, tsx }',
    './components/**/*.{js, ts, jsx, tsx }',
    './layout/**/*.{js, ts, jsx, tsx}'
  ],
  theme: {
    extend: {},
  },
};

export default nextConfig;
