import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), UnoCSS(),],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        cdn: 'https://esm.sh/',
      }),
    ],
  };
});
