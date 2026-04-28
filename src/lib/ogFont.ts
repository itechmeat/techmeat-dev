import { readFile } from "node:fs/promises";
import { join } from "node:path";

let cached: ArrayBuffer[] | undefined;

const fontFiles = ["inter-latin-700-normal.woff", "inter-cyrillic-700-normal.woff"];

async function loadOne(file: string): Promise<ArrayBuffer> {
  const fontPath = join(process.cwd(), "node_modules/@fontsource/inter/files", file);
  const buf = await readFile(fontPath);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export async function loadOgFonts(): Promise<ArrayBuffer[]> {
  if (cached) return cached;
  cached = await Promise.all(fontFiles.map(loadOne));
  return cached;
}
