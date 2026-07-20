import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const referenceExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".md",
  ".json",
]);

const protectedPublicPatterns = [
  /^favicon\.ico$/,
  /^site\.webmanifest$/,
  /^browserconfig\.xml$/,
  /^apple-touch-icon\.png$/,
  /^android-chrome-\d+x\d+\.png$/,
  /^favicon-\d+x\d+\.png$/,
];

const protectedAppBasenames = new Set([
  "page",
  "layout",
  "loading",
  "error",
  "not-found",
  "template",
  "default",
  "route",
]);

const protectedFilenames = new Set(["index.ts", "index.tsx", "index.js", "index.jsx"]);

const resolveExtensions = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"];

function normalizePath(filePath: string) {
  return filePath.split(path.sep).join("/");
}

function walk(dir: string, shouldInclude: (filePath: string, isDir: boolean) => boolean) {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (!shouldInclude(fullPath, entry.isDirectory())) continue;
    if (entry.isDirectory()) {
      results.push(...walk(fullPath, shouldInclude));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function resolveImport(spec: string, importerDir: string) {
  let basePath: string | null = null;

  if (spec.startsWith("@/")) {
    basePath = path.join(rootDir, spec.slice(2));
  } else if (spec.startsWith(".")) {
    basePath = path.resolve(importerDir, spec);
  } else {
    return null;
  }

  if (!basePath) return null;

  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) {
    return basePath;
  }

  for (const ext of resolveExtensions) {
    const withExt = basePath + ext;
    if (fs.existsSync(withExt) && fs.statSync(withExt).isFile()) {
      return withExt;
    }
  }

  for (const ext of resolveExtensions) {
    const withIndex = path.join(basePath, `index${ext}`);
    if (fs.existsSync(withIndex) && fs.statSync(withIndex).isFile()) {
      return withIndex;
    }
  }

  return null;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isProtectedPublic(relPath: string) {
  if (relPath.startsWith("fonts/")) return true;
  return protectedPublicPatterns.some((pattern) => pattern.test(relPath));
}

function isProtectedAppRoute(filePath: string) {
  const rel = normalizePath(path.relative(path.join(rootDir, "app"), filePath));
  if (rel.startsWith("..")) return false;
  const base = path.basename(rel, path.extname(rel));
  return protectedAppBasenames.has(base);
}

const sourceRoots = ["app", "components", "hooks", "context", "utils", "data"];
const sourceFiles = sourceRoots.flatMap((dir) =>
  walk(path.join(rootDir, dir), (filePath, isDir) => {
    if (isDir) return true;
    return referenceExtensions.has(path.extname(filePath));
  })
);

const importableFiles = sourceRoots.flatMap((dir) =>
  walk(path.join(rootDir, dir), (filePath, isDir) => {
    if (isDir) return true;
    return sourceExtensions.has(path.extname(filePath));
  })
);

const importSpecRegexes = [
  /from\s+["']([^"']+)["']/g,
  /import\(\s*["']([^"']+)["']\s*\)/g,
  /require\(\s*["']([^"']+)["']\s*\)/g,
  /export\s+.*from\s+["']([^"']+)["']/g,
];

const resolvedImports = new Set<string>();

for (const filePath of importableFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const importerDir = path.dirname(filePath);

  for (const regex of importSpecRegexes) {
    regex.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      const spec = match[1];
      const resolved = resolveImport(spec, importerDir);
      if (resolved) {
        resolvedImports.add(normalizePath(resolved));
      }
    }
  }
}

const componentCandidates = ["components", "app"].flatMap((dir) =>
  walk(path.join(rootDir, dir), (filePath, isDir) => {
    if (isDir) return true;
    const ext = path.extname(filePath);
    if (!sourceExtensions.has(ext)) return false;
    const baseName = path.basename(filePath);
    if (protectedFilenames.has(baseName)) return false;
    if (dir === "app" && isProtectedAppRoute(filePath)) return false;
    return true;
  })
);

const unusedComponents = componentCandidates.filter((filePath) => {
  const normalized = normalizePath(filePath);
  return !resolvedImports.has(normalized);
});

const publicDir = path.join(rootDir, "public");
const publicFiles = walk(publicDir, (filePath, isDir) => {
  if (isDir) return true;
  return true;
});

const referenceContent = sourceFiles
  .map((filePath) => fs.readFileSync(filePath, "utf8"))
  .join("\n");

const unusedPublicAssets = publicFiles.filter((filePath) => {
  const relPath = normalizePath(path.relative(publicDir, filePath));
  if (!relPath || relPath.startsWith("..")) return false;
  if (isProtectedPublic(relPath)) return false;

  const withSlash = `/${relPath}`;
  if (referenceContent.includes(withSlash)) return false;

  const urlRegex = new RegExp(`url\\((['\"])?${escapeRegExp(relPath)}\\1\\)`);
  if (urlRegex.test(referenceContent)) return false;

  const plainRegex = new RegExp(`\b${escapeRegExp(relPath)}\b`);
  if (plainRegex.test(referenceContent)) return false;

  return true;
});

const deleteEnabled = !process.argv.includes("--dry-run");

function safeDelete(filePath: string) {
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

const deletedComponents: string[] = [];
const deletedAssets: string[] = [];
const failedDeletes: string[] = [];

if (deleteEnabled) {
  for (const filePath of unusedComponents) {
    if (safeDelete(filePath)) {
      deletedComponents.push(filePath);
    } else {
      failedDeletes.push(filePath);
    }
  }

  for (const filePath of unusedPublicAssets) {
    if (safeDelete(filePath)) {
      deletedAssets.push(filePath);
    } else {
      failedDeletes.push(filePath);
    }
  }
}

const rel = (filePath: string) => normalizePath(path.relative(rootDir, filePath));

console.log("\nCleanup audit results\n--------------------");
console.log(`Unused components: ${unusedComponents.length}`);
unusedComponents.forEach((filePath) => console.log(`  - ${rel(filePath)}`));

console.log(`\nUnused public assets: ${unusedPublicAssets.length}`);
unusedPublicAssets.forEach((filePath) => console.log(`  - ${rel(filePath)}`));

if (deleteEnabled) {
  console.log(`\nDeleted components: ${deletedComponents.length}`);
  deletedComponents.forEach((filePath) => console.log(`  - ${rel(filePath)}`));

  console.log(`\nDeleted public assets: ${deletedAssets.length}`);
  deletedAssets.forEach((filePath) => console.log(`  - ${rel(filePath)}`));

  if (failedDeletes.length > 0) {
    console.log(`\nFailed deletes: ${failedDeletes.length}`);
    failedDeletes.forEach((filePath) => console.log(`  - ${rel(filePath)}`));
  }
} else {
  console.log("\nDry run: no files deleted.");
}
