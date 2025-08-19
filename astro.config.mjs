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
    umami({
      id: "c7ab1eae-9cab-4e98-a355-c789877e07c2",
      endpointUrl: "https://righteous-terrier.pikapod.net",
    })
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