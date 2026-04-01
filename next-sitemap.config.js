/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://jyoshnainvisiblegrills.com",
  generateRobotsTxt: true,

  // 👇 important for SEO
  changefreq: "daily",
  priority: 0.7,

  sitemapSize: 5000,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://jyoshnainvisiblegrills.com/sitemap.xml",
    ],
  },

  // 🔥 exclude unwanted routes
  exclude: ["/admin/*", "/api/*", '/private/*', '/404'],

  // ✅ transform for custom priority
  transform: async (config, path) => {
    let priority = 0.7;

    if (path === "/") priority = 1.0;
    if (path.includes("/services")) priority = 0.9;

    return {
      loc: path,
      changefreq: "daily",
      priority,
      lastmod: new Date().toISOString(),
    };
  },
   trailingSlash: true,
  outDir: './out', 
};

module.exports = config;