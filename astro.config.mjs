import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { addCopyButton } from 'shiki-transformer-copy-button';

export default defineConfig({
  site: "https://karppinen.one",
  integrations: [mdx(), sitemap(), tailwind()],

  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: "dracula",
        dark: "dracula"
      },
      wrap: true,
      transformers: [addCopyButton({ toggle: 5000 })]
    }
  },
});