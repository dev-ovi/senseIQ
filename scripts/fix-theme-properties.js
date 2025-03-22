const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

// Paths to search for components
const componentPaths = [
  path.join(__dirname, "../client/src/components"),
  path.join(__dirname, "../client/src/pages"),
];

// Theme property mappings
const propertyMappings = {
  // Colors with incorrect nesting
  "theme.colors.text.primary.secondary": "theme.colors.text.secondary",
  "theme.colors.text.primary.primary": "theme.colors.text.primary",
  "theme.colors.background.main.light": "theme.colors.background.light",
  "theme.colors.background.main.main": "theme.colors.background.main",
  "theme.colors.border.main.main": "theme.colors.border.main",

  // Original mappings
  "theme.colors.textLight": "theme.colors.text.secondary",
  "theme.colors.text": "theme.colors.text.primary",
  "theme.colors.backgroundAlt": "theme.colors.background.light",
  "theme.colors.background": "theme.colors.background.main",
  "theme.colors.border": "theme.colors.border.main",

  // Shadows
  "theme.shadows.small": "theme.shadows.sm",
  "theme.shadows.medium": "theme.shadows.md",
  "theme.shadows.large": "theme.shadows.lg",
  "theme.shadows.xlarge": "theme.shadows.xl",
};

// File extensions to process
const extensions = [".tsx", ".ts", ".jsx", ".js"];

/**
 * Recursively find all files in a directory
 */
async function findFiles(dir, fileList = []) {
  const files = await readdirAsync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await statAsync(filePath);

    if (stat.isDirectory()) {
      fileList = await findFiles(filePath, fileList);
    } else if (extensions.includes(path.extname(file))) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Fix theme property references in a file
 */
async function fixFile(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    let content = await readFileAsync(filePath, "utf8");
    let changed = false;

    // Apply each mapping
    for (const [oldProp, newProp] of Object.entries(propertyMappings)) {
      const regex = new RegExp(oldProp.replace(/\./g, "\\."), "g");
      if (regex.test(content)) {
        content = content.replace(regex, newProp);
        changed = true;
      }
    }

    if (changed) {
      await writeFileAsync(filePath, content, "utf8");
      console.log(`✅ Fixed theme properties in ${filePath}`);
      return true;
    } else {
      console.log(`✓ No changes needed in ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🔍 Finding component files...");

  let allFiles = [];
  for (const dir of componentPaths) {
    const files = await findFiles(dir);
    allFiles = [...allFiles, ...files];
  }

  console.log(`Found ${allFiles.length} files to process`);

  let changedCount = 0;
  for (const file of allFiles) {
    const changed = await fixFile(file);
    if (changed) changedCount++;
  }

  console.log(`\n✨ Done! Fixed theme properties in ${changedCount} files`);
}

main().catch(console.error);
