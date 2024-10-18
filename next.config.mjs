/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          {key: "Access-Control-Allow-Credentials", value: "true"},
          {
            key: "Access-Control-Allow-Origin",
            value: "https://agroworld.vercel.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
    images: {
        domains: ['images.pexels.com', 'th.bing.com', 'thumbs.dreamstime.com', 'youtu.be', "res.cloudinary.com"],
      },
};

export default nextConfig;
