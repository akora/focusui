import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
// import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import config from "./src/config/config.json";
import AutoImport from "astro-auto-import";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://astrotemplatesitey.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  vite: {
    // Simplified CSS config for Netlify compatibility
  },
  // Image optimization service disabled for Netlify compatibility
  // image: {
  //   service: sharpImageService(),
  // },
  integrations: [
    react(),
    // sitemap(), // Disabled due to build issues on Netlify
    tailwind(),
    AutoImport({
      // import react components to use in mdx
      imports: [
        "@/components/react/FeatherIcon.tsx",
        "@/components/CounterComponent.astro",
        "@/components/core/Section.astro",
        "@/components/react/Changelog.tsx",
        "@/components/Badge.astro",
      ],
    }),
    mdx()
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    }
  }
});
