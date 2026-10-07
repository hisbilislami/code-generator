#!/usr/bin/env node

import fs from "fs";
import path from "path";

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Tolong masukkan nama modul dalam format kebab-case!");
  console.error(
    "   Contoh: node generate-cirql-module.mjs cycle-salary-overtime",
  );
  process.exit(1);
}

const targetDir = path.join(
  process.cwd(),
  "app",
  "routes",
  "dashboard",
  moduleName,
);

// Daftar file yang akan dibuat dalam kondisi kosong murni
const filesToGenerate = [
  // Folder _index (Halaman Tabel / List Utama)
  { path: path.join(targetDir, "_index", "route.tsx"), content: "" },
  { path: path.join(targetDir, "_index", "loader.ts"), content: "" },

  // Folder components (Komponen UI internal modul)
  { path: path.join(targetDir, "components", "form.tsx"), content: "" },
  { path: path.join(targetDir, "components", "column.tsx"), content: "" },
  { path: path.join(targetDir, "components", "table-action.tsx"), content: "" },
  { path: path.join(targetDir, "components", "filter-modal.tsx"), content: "" },

  // Folder new (Halaman Tambah Data)
  { path: path.join(targetDir, "new", "route.tsx"), content: "" },
  { path: path.join(targetDir, "new", "action.ts"), content: "" },

  // Folder $id (Halaman Detail / Edit Data)
  { path: path.join(targetDir, "$id", "route.tsx"), content: "" },
  { path: path.join(targetDir, "$id", "loader.ts"), content: "" },
  { path: path.join(targetDir, "$id", "action.ts"), content: "" },

  // Folder schemas (Constants, Zod Schema & Types)
  { path: path.join(targetDir, "schemas", "constants.ts"), content: "" },
  { path: path.join(targetDir, "schemas", "types.ts"), content: "" },
];

function run() {
  console.log(`\n🚀 Generating module structure for: '${moduleName}'...\n`);

  filesToGenerate.forEach((file) => {
    const dir = path.dirname(file.path);

    // Buat direktori jika belum ada
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Buat file kosong jika belum ada
    if (!fs.existsSync(file.path)) {
      fs.writeFileSync(file.path, file.content, "utf8");
      console.log(`  [+] Created: ${path.relative(process.cwd(), file.path)}`);
    } else {
      console.log(
        `  [!] Skipped (already exists): ${path.relative(process.cwd(), file.path)}`,
      );
    }
  });

  console.log(`\n✨ Done! Module '${moduleName}' created successfully.\n`);
}

run();
