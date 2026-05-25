import { build as esbuild } from "esbuild";
import { readFile } from "fs/promises";
import path from "path";

const rootDir = import.meta.dirname.replace(/\/script$/, "");

/** Dependências empacotadas no bundle (resto fica external). */
const allowlist = [
  "express",
  "zod",
  "zod-validation-error",
];

export async function buildServerBundle() {
  const pkg = JSON.parse(
    await readFile(path.join(rootDir, "package.json"), "utf-8"),
  );
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: [path.join(rootDir, "server/index.ts")],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: path.join(rootDir, "dist/index.cjs"),
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    alias: {
      "@shared": path.join(rootDir, "shared"),
    },
    logLevel: "info",
  });
}

const isDirectRun = process.argv[1]?.includes("build-server");
if (isDirectRun) {
  buildServerBundle().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
