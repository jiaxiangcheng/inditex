/** @type {import('next').NextConfig} */

const nextConfig = {
    distDir: "build",
    reactStrictMode: true,
    images: {
        domains: ["is1-ssl.mzstatic.com"],
    },
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            // Production client: Minify the bundle
            config.optimization.minimize = true;
        } else {
            // Development client: Don't minify the bundle
            config.optimization.minimize = false;
        }
        return config;
    },
};
export default nextConfig;
