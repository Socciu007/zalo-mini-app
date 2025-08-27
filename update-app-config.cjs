#!/usr/bin/env node
/* scripts/update-app-config.cjs */
const fs = require('node:fs');
const path = require('node:path');

const cwd = process.cwd();
const distDir = path.join(cwd, 'dist');        // đổi nếu bạn build ra nơi khác
const appCfgPath = path.join(cwd, 'www/app-config.json');

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
const strip = (p) => p.replace(/^\/+/, '');

function findManifest() {
  const candidates = [
    path.join(distDir, 'manifest.json'),
    path.join(distDir, '.vite', 'manifest.json'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

try {
  const manifestPath = findManifest();
  if (!manifestPath) {
    console.error('❌ manifest.json not found. Checked:');
    console.error('   -', path.join(distDir, 'manifest.json'));
    console.error('   -', path.join(distDir, '.vite/manifest.json'));
    if (fs.existsSync(distDir)) {
      console.error('📁 dist content:', fs.readdirSync(distDir, { withFileTypes: true })
        .map(d => (d.isDirectory() ? d.name + '/' : d.name)).join(' '));
    } else {
      console.error('⚠️ dist folder does not exist. Did you run "vite build"?');
    }
    process.exit(1);
  }

  const manifest = readJSON(manifestPath);

  const entries = Object.values(manifest).filter((m) => m && m.isEntry);
  if (entries.length === 0) throw new Error('No entry found in manifest.json');
  const entry = entries[0];

  const cssSet = new Set(entry.css || []);
  (entry.imports || []).forEach((k) => {
    const im = manifest[k];
    (im?.css || []).forEach((c) => cssSet.add(c));
  });

  const listCSS = [...cssSet].map(strip);
  const listSyncJS = [strip(entry.file)];
  const listAsyncJS = (entry.imports || [])
    .map((k) => manifest[k]?.file)
    .filter(Boolean)
    .map(strip);

  const appCfg = readJSON(appCfgPath);
  appCfg.listCSS = listCSS;
  appCfg.listSyncJS = listSyncJS;
  appCfg.listAsyncJS = listAsyncJS;

  fs.writeFileSync(appCfgPath, JSON.stringify(appCfg, null, 2));
  console.log('✅ Updated app-config.json', { listCSS, listSyncJS, listAsyncJS });
} catch (err) {
  console.error('❌ Failed to update app-config.json:', err.message);
  process.exit(1);
}