import createMDX from "@next/mdx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("next").NextConfig} */
const nextConfig = {
  // React Strict Mode causes the App Router to fire two RSC fetches per
  // navigation in development (mount → unmount → remount cycle).  Disabling it
  // gives clean single-GET logs during local dev; it has no effect on the
  // production build output.
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

const withMDX = createMDX({})
export default withMDX(nextConfig)
