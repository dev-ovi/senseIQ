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

// Define the replacements to make
const replacements = [
  {
    from: /theme\.colors\.text\.primary\.primary/g,
    to: "theme.colors.text.primary",
  },
  {
    from: /theme\.colors\.text\.primary\.secondary/g,
    to: "theme.colors.text.secondary",
  },
  {
    from: /theme\.colors\.background\.main\.main/g,
    to: "theme.colors.background.main",
  },
  {
    from: /theme\.colors\.background\.main\.light/g,
    to: "theme.colors.background.light",
  },
  {
    from: /theme\.colors\.border\.main\.main/g,
    to: "theme.colors.border.main",
  },
];

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

    // Apply each replacement
    for (const { from, to } of replacements) {
      if (from.test(content)) {
        content = content.replace(from, to);
        changed = true;
      }
    }

    if (changed) {
      await writeFileAsync(filePath, content, "utf8");
      console.log(`✅ Fixed theme properties in ${filePath}`);
      return true;
    } else {
      console.log(`No changes needed in ${filePath}`);
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
