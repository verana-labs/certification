import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const errors = [];

function readJson(file) {
  try {
    return JSON.parse(readFileSync(resolve(root, file), "utf8"));
  } catch (e) {
    errors.push(`${file}: ${e.message}`);
    return null;
  }
}

function frontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) out[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return out;
}

const program = readJson("program.json");
const certificators = readJson("certificators.json");

if (program) {
  const codes = new Set();
  for (const mod of program.modules ?? []) {
    if (!mod.code || !mod.title || !mod.assessment) errors.push(`module ${mod.code ?? "?"}: code, title and assessment are required`);
    if (codes.has(mod.code)) errors.push(`module ${mod.code}: duplicate code`);
    codes.add(mod.code);
    const file = `modules/${mod.code}/README.md`;
    if (!existsSync(resolve(root, file))) {
      errors.push(`${file}: missing`);
      continue;
    }
    const fm = frontMatter(readFileSync(resolve(root, file), "utf8"));
    if (!fm) {
      errors.push(`${file}: no front matter`);
      continue;
    }
    for (const key of ["code", "title", "hours", "assessment", "version", "status", "summary"]) {
      if (!(key in fm)) errors.push(`${file}: front matter lacks ${key}`);
    }
    if (fm.code !== mod.code) errors.push(`${file}: code ${fm.code} differs from program.json`);
    if (fm.title !== mod.title) errors.push(`${file}: title differs from program.json`);
    if (String(fm.hours) !== String(mod.hours)) errors.push(`${file}: hours differ from program.json`);
    if (fm.assessment !== mod.assessment) errors.push(`${file}: assessment differs from program.json`);
    if (fm.status !== mod.status) errors.push(`${file}: status differs from program.json`);
    if (!["outline", "published"].includes(fm.status)) errors.push(`${file}: status must be outline or published`);
  }
  const slugs = new Set();
  for (const track of program.tracks ?? []) {
    if (!track.slug || !track.name) errors.push(`track ${track.slug ?? "?"}: slug and name are required`);
    if (slugs.has(track.slug)) errors.push(`track ${track.slug}: duplicate slug`);
    slugs.add(track.slug);
    const refs = [...(track.core ?? []), ...(track.modules ?? []), ...(track.reduced ?? []), ...(track.choice ?? []).flat()];
    for (const code of refs) if (!codes.has(code)) errors.push(`track ${track.slug}: unknown module ${code}`);
  }
  const trackSlugs = slugs;
  for (const d of program.designations ?? []) {
    for (const req of d.staff ?? []) {
      for (const slug of req.tracks ?? []) if (!trackSlugs.has(slug)) errors.push(`designation ${d.slug}: unknown track ${slug}`);
    }
  }
  if (certificators) {
    for (const c of certificators.certificators ?? []) {
      if (!c.slug || !c.name || !c.website) errors.push(`certificator ${c.slug ?? "?"}: slug, name and website are required`);
      for (const slug of c.tracks ?? []) if (!trackSlugs.has(slug)) errors.push(`certificator ${c.slug}: unknown track ${slug}`);
      if (!["launch", "accredited", "suspended"].includes(c.status)) errors.push(`certificator ${c.slug}: status must be launch, accredited or suspended`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((e) => `error: ${e}`).join("\n"));
  process.exit(1);
}
console.log("ok");
