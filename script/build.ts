import { build as viteBuild } from "vite";
import { rm } from "fs/promises";
import path from "path";
import { buildServerBundle } from "./build-server";

const rootDir = import.meta.dirname.replace(/\/script$/, "");

async function buildAll() {
  await rm(path.join(rootDir, "dist"), { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  await buildServerBundle();

  console.log("build complete:");
  console.log("  dist/public/   — frontend estático");
  console.log("  dist/index.cjs — servidor Express (npm start)");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
