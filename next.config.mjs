import createMDX from "@next/mdx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "export",
  basePath: "",
  assetPrefix: "",
  images: {
    unoptimized: true,
  },
  sassOptions: {
    // Tell Sass to look inside these folders by default
    includePaths: [path.join(__dirname, "src/styles")],

    // Use the simplified path here
    // Note: Do not use the underscore (_) or the (.scss) extension
    additionalData: `
      @use "@/styles/abstracts/tokens" as *;
    `,
  }
}

// Pass plugin as an absolute path string — Turbopack requires serializable (non-function) loader
// options, and mdx-js-loader resolves string entries via require.resolve at compile time.
const withMDX = createMDX({
  options: {
    remarkPlugins: [path.join(__dirname, "src/lib/remark-git-dates.mjs")],
  },
});
export default withMDX(nextConfig);
