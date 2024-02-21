/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REACT_APP_API_DOMAIN: "http://localhost:8000/api",
        REACT_APP_IMG_DOMAIN: "http://localhost:8000/img",
    },
};

export default nextConfig;
