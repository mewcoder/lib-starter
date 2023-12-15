import { defineConfig } from "vitepress";

export default defineConfig({
  title: "VitePress",
  description: "Vite & Vue powered static site generator.",

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API", link: "/api/index" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
