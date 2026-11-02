// Vibe Test Demo Shop — a tiny static web shop used to demo Vibe Test.
// No real products, no real payments, no data leaves the browser.
// Zero dependencies: `npm start` serves ./public on $PORT (3000 by default).

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = path.join(__dirname, "public");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
};

http
  .createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    let rel = decodeURIComponent(url.pathname);
    if (rel === "/") rel = "/index.html";
    if (!path.extname(rel)) rel += ".html";
    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    fs.readFile(file, (err, body) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
        res.end('<!doctype html><title>Not found</title><p>Page not found. <a href="/">Back to the shop</a></p>');
        return;
      }
      res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
      res.end(body);
    });
  })
  .listen(PORT, "0.0.0.0", () => console.log(`Demo shop on http://0.0.0.0:${PORT}`));
