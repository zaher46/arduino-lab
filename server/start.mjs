import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, resolve, sep, join } from "node:path";
import { Readable } from "node:stream";
import { localStorageAdapter, projectRoot } from "./local-db.mjs";
import { prepareRegister } from "./prepare.mjs";
import { registry } from "./registry.mjs";

await prepareRegister();
const root = join(projectRoot, "website");
if (!existsSync(join(root, "index.html")))
  throw Error("Build the website first with npm run build.");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css;charset=utf-8",
  ".js": "application/javascript",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".webp": "image/webp",
  ".json": "application/json",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain;charset=utf-8",
};
const loopbacks = new Set(["127.0.0.1", "localhost", "[::1]"]);
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://" + req.headers.host);
    if (!loopbacks.has(url.hostname)) {
      res.writeHead(403).end();
      return;
    }
    if (url.pathname.startsWith("/api/")) {
      const opt = { method: req.method, headers: req.headers };
      if (!["GET", "HEAD"].includes(req.method)) {
        opt.body = Readable.toWeb(req);
        opt.duplex = "half";
      }
      const response = await registry(
        new Request(url, opt),
        localStorageAdapter(),
      );
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405).end();
      return;
    }
    let target = resolve(root, "." + decodeURIComponent(url.pathname));
    if (target !== root && !target.startsWith(root + sep)) {
      res.writeHead(404).end();
      return;
    }
    if (existsSync(target) && statSync(target).isDirectory())
      target = join(target, "index.html");
    if (!existsSync(target) || !statSync(target).isFile()) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, {
      "content-type": types[extname(target)] || "application/octet-stream",
      "x-content-type-options": "nosniff",
    });
    if (req.method === "HEAD") res.end();
    else createReadStream(target).pipe(res);
  } catch {
    res.writeHead(500).end("Request failed");
  }
});
server.on("error", (err) => {
  console.error(
    err.code === "EADDRINUSE"
      ? "Port already in use. Stop the previous copy or select a different PORT."
      : err.message,
  );
  process.exit(1);
});
server.listen(port, "127.0.0.1", () =>
  console.log("Arduino Lab 0.3.0   http://localhost:" + port),
);
