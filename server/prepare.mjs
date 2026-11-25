import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  linkSync,
  rmSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import {
  databasePath,
  openDatabase,
  projectRoot,
  sqliteAdapter,
} from "./local-db.mjs";
import { restoreEmpty } from "./registry.mjs";

export async function prepareRegister(path = databasePath()) {
  const initial = join(projectRoot, "initial-data", "register.json");
  const conventional = join(projectRoot, "db", "custom.db");
  if (
    !existsSync(path) &&
    resolve(path) !== resolve(conventional) &&
    existsSync(conventional)
  ) {
    throw Error(
      "DATABASE_URL points to a missing database while db/custom.db exists. Check the database path in .env.",
    );
  }
  if (!existsSync(path) && existsSync(initial)) {
    mkdirSync(dirname(path), { recursive: true });
    const stage = mkdtempSync(join(dirname(path), ".init-"));
    try {
      const temp = join(stage, "custom.db"),
        db = openDatabase(temp);
      try {
        await restoreEmpty(
          sqliteAdapter(db),
          JSON.parse(readFileSync(initial, "utf8")),
        );
      } finally {
        db.close();
      }
      try {
        linkSync(temp, path);
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
      }
    } finally {
      rmSync(stage, { recursive: true, force: true });
    }
  }
  const db = openDatabase(path);
  db.close();
  return path;
}
