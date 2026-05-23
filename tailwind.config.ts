import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Bridges your Next.js variable fonts and fallbacks over to Tailwind classes
        sans: ["Alan Sans", "Source Sans 3", "system-ui", "sans-serif"],
        mono: ["Source Code Pro", "ui-monospace", "monospace"],
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
};
export default config;
