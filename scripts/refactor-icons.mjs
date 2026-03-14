import fs from 'fs';
import path from 'path';

const dirsToScan = [
  path.join(process.cwd(), 'app'),
  path.join(process.cwd(), 'components')
];

function processFile(filePath) {
  // Skip the Icon wrapper definition and non-component files
  if (filePath.replace(/\\/g, '/').includes('components/d365/atoms/icon.tsx')) return;
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to find lucide-react imports cleanly
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+["']lucide-react["']/g;
  let match;
  let importedIcons = [];
  
  while ((match = importRegex.exec(content)) !== null) {
    const rawItems = match[1].split(',').map(s => s.trim());
    for (const item of rawItems) {
      if (!item || item.startsWith('type ')) continue;
      // Filter out utility names or type names
      if (['LucideIcon', 'LucideProps', 'Icon'].includes(item)) continue;
      // also handle 'as' aliases e.g., 'Image as ImageIcon', we extract 'ImageIcon'
      let cleanIconName = item;
      if (item.includes(' as ')) {
        cleanIconName = item.split(' as ')[1].trim();
      }
      importedIcons.push(cleanIconName);
    }
  }

  if (importedIcons.length === 0) return;

  let changed = false;

  // Add Icon wrapper import if missing
  if (!content.includes('@/components/d365/atoms/icon')) {
    content = content.replace(
      /import\s+\{[^}]+\}\s+from\s+["']lucide-react["']/,
      `$&\nimport { Icon } from "@/components/d365/atoms/icon"`
    );
  }

  // Refactor `<IconName ...>` into `<Icon icon={IconName} ...>`
  for (const icon of importedIcons) {
    // Regex for opening tags: e.g. <Search className="w-4 h-4" />
    // Needs to match the tag name exactly, without matching other words.
    const openTagRegex = new RegExp(`<\\s*(${icon})\\b([^>]*)>`, 'g');
    if (openTagRegex.test(content)) {
      changed = true;
      content = content.replace(openTagRegex, (m, p1, p2) => {
        return `<Icon icon={${icon}}${p2}>`;
      });
    }

    // Regex for closing tags: e.g. </Search>
    const closeTagRegex = new RegExp(`</\\s*(${icon})\\s*>`, 'g');
    if (closeTagRegex.test(content)) {
      changed = true;
      content = content.replace(closeTagRegex, `</Icon>`);
    }
  }

  if (changed) {
    // Basic cleanup logic on lines that have the new `<Icon `
    let lines = content.split('\n');
    lines = lines.map(line => {
      if (line.includes('<Icon ')) {
        return line
          // Clear h-4 w-4 or w-4 h-4 (and variants like h-3, h-5)
          .replace(/\b[wh]-\d+(\.\d+(rem)?)?\s*/g, '')
          // Clear strokeWidth={...}
          .replace(/strokeWidth=\{[\d.]+\}\s*/g, '')
          // Clean empty classNames left behind
          .replace(/className=["']\s+/, 'className="')
          .replace(/\s+["'](\s|>|})/, '"$1')
          .replace(/className=["']\s*["']/g, '');
      }
      return line;
    });

    content = lines.join('\n');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refactored: ${filePath}`);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

dirsToScan.forEach(d => {
  if (fs.existsSync(d)) scanDir(d);
});
console.log('Icon refactor complete.');
