const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const DOCTYPE = "<!DOCTYPE html>";
const DOCTYPE_BYTES = Buffer.from(DOCTYPE + "\n", "utf8");

function ensureDoctype(res) {
  let firstChunk = true;
  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);

  function maybePrependDoctype(chunk) {
    if (!chunk || firstChunk === false) return false;
    const str = Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk);
    const trimmed = str.trimStart();
    if (trimmed.length === 0) return false;
    const hasDoctype = /^\s*<!\s*doctype\s+/i.test(str) || trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<!doctype");
    const looksLikeHtml = trimmed.startsWith("<html") || trimmed.startsWith("<!") || (res.getHeader && String(res.getHeader("content-type") || "").includes("text/html"));
    if (!looksLikeHtml || hasDoctype) return false;
    firstChunk = false;
    return true;
  }

  res.write = function (chunk, encoding, callback) {
    if (maybePrependDoctype(chunk)) {
      originalWrite(DOCTYPE_BYTES);
    }
    return originalWrite(chunk, encoding, callback);
  };

  res.end = function (chunk, encoding, callback) {
    if (chunk && maybePrependDoctype(chunk)) {
      originalWrite(DOCTYPE_BYTES);
    }
    return originalEnd(chunk, encoding, callback);
  };
}

app.prepare().then(() => {
  createServer((req, res) => {
    ensureDoctype(res);
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log("> Ready on http://" + hostname + ":" + port);
  });
});
