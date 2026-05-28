import createMDX from "@next/mdx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  basePath: "",
  assetPrefix: "",
  images: {
    // External images (e.g. GitHub readme stats) are not optimised by default.
    // Remove this once all remote images are added to remotePatterns.
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

const withMDX = createMDX({})
export default withMDX(nextConfig)
