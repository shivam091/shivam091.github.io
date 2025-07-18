import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const isWatch = process.argv.includes("--watch");

async function optimizeImages() {
  const inputDir = "./assets/img";
  const outputDir = "./dist/images";
  fs.mkdirSync(outputDir, { recursive: true });

  for (const file of fs.readdirSync(inputDir)) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(png|jpg|jpeg)$/, ".webp"));

    try {
      await sharp(inputPath)
        .resize({ width: 1200 })
        .toFormat("webp")
        .webp({ quality: 80 })
        .toFile(outputPath);

      console.log(`🖼️ Optimized: ${file}`);
    } catch (err) {
      console.error(`❌ Failed to optimize ${file}:`, err);
    }
  }
}

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
    ".png": "file",
    ".jpg": "file",
    ".jpeg": "file",
    ".webp": "file",
    ".svg": "file"
  },
  plugins: [
    sassPlugin({
      loadPaths: ["_sass"],
      type: "css"
    })
  ],
};

async function runBuild() {
  await optimizeImages();
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
