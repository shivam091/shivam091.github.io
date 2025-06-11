import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

const isWatch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: {
    app: "assets/js/main.js"
    // style: "assets/css/main.scss"
  },
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: "dist",
  plugins: [sassPlugin()],
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
