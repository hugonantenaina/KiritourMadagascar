/* ══════════════════════════════════════════════════════════════
   PRERENDER v2 — timeout ambony + retry + nanampy /tsingy-3d
══════════════════════════════════════════════════════════════ */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const PORT = 45679;

const routes = [
  "/",
  "/home",
  "/tours",
  "/about",
  "/contact",
  "/faq",
  "/blog",
  "/blog/best-time-visit-avenue-baobabs-madagascar",
  "/blog/tsingy-de-bemaraha-travel-guide",
  "/blog/kirindy-forest-fossa-lemurs-guide",
  "/blog/tsiribihina-river-descent-complete-guide",
  "/blog/madagascar-itinerary-from-morondava",
  "/blog/what-to-pack-madagascar-safari",
  "/tours/tsiribihina-river-3-day-pirogue-descent-madagascar",
  "/tours/tsiribihina-river-kirindy-forest-4-day-tour",
  "/tours/western-madagascar-5-day-circuit-baobabs-kirindy",
  "/tours/tsiribihina-tsingy-bemaraha-6-day-tour-madagascar",
  "/tours/menabe-grand-tour-8-day-madagascar-adventure",
  "/tours/andasibe-rainforest-indri-lemurs-3-day-tour",
  "/tours/andasibe-lemurs-mantadia-4-day-wildlife-tour",
  "/tours/andasibe-rainforest-5-day-immersion-madagascar",
  "/tours/andasibe-palmarium-aye-aye-5-day-madagascar",
  "/tours/tsingy-de-bemaraha-4-day-unesco-kirindy-baobabs",
  "/tours/tsingy-de-bemaraha-3-day-express-circuit-madagascar",
  "/tours/kirindy-forest-fossa-lemurs-2-day-safari",
  "/tours/kirindy-forest-1-day-tour-from-morondava",
  "/tours/avenue-baobabs-betania-kimony-day-tour-morondava",
];

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".webp": "image/webp", ".woff": "font/woff", ".woff2": "font/woff2",
  ".txt": "text/plain", ".xml": "application/xml",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const filePath = path.join(DIST, urlPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(DIST, "index.html")).pipe(res);
  }
});

async function renderRoute(page, route) {
  await page.goto(`http://localhost:${PORT}${route}`, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  // Miandry React render ao anatin'ny #root
  await page.waitForFunction(
    () => {
      const r = document.getElementById("root");
      return r && r.children.length > 0;
    },
    { timeout: 30000 }
  ).catch(() => {});
  // Fotoana fanampiny ho an'ny SEO useEffect
  await new Promise((r) => setTimeout(r, 1000));
  return await page.content();
}

async function run() {
  await new Promise((r) => server.listen(PORT, r));
  console.log(`\n🌐 static server on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
    ],
  });

  let ok = 0;
  const failed = [];

  for (const route of routes) {
    const page = await browser.newPage();
    await page.setUserAgent("ReactSnap");
    // Sabotraka ny Firebase auth state listener
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });

    let html = null;
    // Andramo 2 mandeha raha misy olana
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        html = await renderRoute(page, route);
        break;
      } catch (e) {
        if (attempt === 2) {
          console.log(`✗ ${route} — ${e.message.slice(0, 60)}`);
          failed.push(route);
        } else {
          console.log(`  ↻ retry ${route}`);
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    }

    if (html) {
      const outDir = route === "/" ? DIST : path.join(DIST, route);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html);
      console.log(`✓ ${route}`);
      ok++;
    }

    await page.close();
  }

  await browser.close();
  server.close();

  console.log(`\n✅ Prerendered ${ok}/${routes.length} pages`);
  if (failed.length) {
    console.log(`⚠️  Failed (${failed.length}): ${failed.join(", ")}`);
  }
  console.log();
}

run().catch((e) => { console.error(e); process.exit(1); });