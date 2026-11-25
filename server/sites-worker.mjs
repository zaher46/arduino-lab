import { registry, snapshot, restoreEmpty } from "./registry.mjs";

function d1Adapter(binding) {
  const statement = (sql, args = []) => args.length ? binding.prepare(sql).bind(...args) : binding.prepare(sql);
  return {
    async query(sql, args) {
      return (await statement(sql, args).all()).results;
    },
    async batch(queries) {
      return (await binding.batch(queries.map(([sql, args]) => statement(sql, args)))).map(result => result.results);
    },
  };
}

const noCache = { "Cache-Control": "private, no-store" };
const ownerSession = (request, env) =>
  Boolean(env.LAB_OWNER_EMAIL && request.headers.get("oai-authenticated-user-id") &&
    request.headers.get("oai-authenticated-user-email")?.toLowerCase() === env.LAB_OWNER_EMAIL.toLowerCase());

async function receipt(db) {
  const backup = await snapshot(db);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(backup)));
  return {
    sha256: Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join(""),
    counts: Object.fromEntries(Object.entries(backup.tables).map(([table, rows]) => [table, rows.length])),
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) {
      if (url.pathname === "/legacy") return Response.redirect(new URL("/legacy/", url), 308);
      return env.ASSETS.fetch(request);
    }
    if (!env.DB) return Response.json({ error: "Storage unavailable" }, { status: 503, headers: noCache });
    const db = d1Adapter(env.DB);
    if (url.pathname === "/api/service/restore" || url.pathname === "/api/service/receipt") {
      // Dispatch restricts the site to its owner. The short-lived setup credential
      // restricts service clients further and gives them no read access to records.
      if (!env.LAB_RESTORE_KEY || request.headers.get("x-lab-restore-key") !== env.LAB_RESTORE_KEY) {
        return Response.json({ error: "Forbidden" }, { status: 403, headers: noCache });
      }
      try {
        if (url.pathname.endsWith("/restore")) {
          if (request.method !== "POST") return new Response(null, { status: 405 });
          const body = await request.text();
          if (body.length > 6_000_000) return new Response(null, { status: 413 });
          await restoreEmpty(db, JSON.parse(body));
        } else if (request.method !== "GET") return new Response(null, { status: 405 });
        return Response.json(await receipt(db), { headers: noCache });
      } catch (error) {
        return Response.json({ error: "Registry operation failed" }, { status: error.status || 500, headers: noCache });
      }
    }
    if (!ownerSession(request, env)) {
      return Response.json({ error: "Owner access required" }, { status: 403, headers: noCache });
    }
    return registry(request, db);
  },
};
