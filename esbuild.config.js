import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import { readFileSync } from "fs";

// 👇 Optional SVG plugin (inline SVG as string)
const svgPlugin = {
  name: "svg-inline",
  setup(build) {
    build.onLoad({ filter: /\.svg$/ }, async (args) => {
      const svg = readFileSync(args.path, "utf8");
      const escaped = svg.replace(/`/g, "\\`").replace(/\${/g, "\\${");
      return {
        contents: `export default \`${escaped}\`;`,
        loader: "js",
      };
    });
  },
};

const isWatch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: {
    app: "_javascript/main.js",
    style: "_sass/main.sass",
  },
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: "dist",
  loader: {
    ".sass": "file",
    ".png": "file",
    ".svg": "file", // 👈 Ensures esbuild watches SVGs (or change to "dataurl" or "text" or use plugin)
  },
  plugins: [
    sassPlugin({
      loadPaths: ["_sass"],
    }),
    svgPlugin, // 👈 Add custom plugin for inline SVG imports (optional)
  ],
};

async function runBuild() {
  const ctx = await esbuild.context(buildOptions);

  if (isWatch) {
    await ctx.watch();
    console.log("👀 Watching for changes...");
  } else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log("✅ Build complete");
  }
}

runBuild().catch((e) => {
  console.error("❌ Build failed", e);
  process.exit(1);
});
