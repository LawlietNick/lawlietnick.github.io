import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { addCopyButton } from 'shiki-transformer-copy-button';
import umami from "@yeskunall/astro-umami";

export default defineConfig({
  site: "https://karppinen.one",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    umami({ id: "94db1cb1-74f4-4a40-ad6c-962362670409" })
  ],

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