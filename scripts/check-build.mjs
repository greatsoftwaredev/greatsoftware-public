import { readFileSync, existsSync } from "node:fs";

const failures = [];
let attempted = 0;
function check(name, cond) {
  attempted++;
  if (!cond) failures.push(name);
}
function html(path) {
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

const pages = {
  home: html("dist/index.html"),
  about: html("dist/about/index.html"),
  privacy: html("dist/privacy/index.html"),
  terms: html("dist/terms/index.html"),
  contact: html("dist/contact/index.html"),
};

// pages exist
for (const [name, content] of Object.entries(pages)) {
  check(`page:${name} built`, content.length > 0);
}

// home content
check("home: tagline", pages.home.includes("A whole range of software"));
check("home: Tenet", pages.home.includes("Tenet"));
check("home: Changesets", pages.home.includes("Changesets for VS Code"));
check("home: Meld", pages.home.includes("Meld"));
check("home: alpenglow island", pages.home.includes("data-alpenglow"));

// 10DLC compliance — Privacy
check("privacy: no-share clause", pages.privacy.includes("do not share or sell"));
check("privacy: STOP", pages.privacy.includes("STOP"));
check("privacy: HELP", pages.privacy.includes("HELP"));
check("privacy: Telnyx", pages.privacy.includes("Telnyx"));

// 10DLC compliance — Terms
check("terms: SMS Program", pages.terms.includes("SMS Program"));
check("terms: opt-out clause", pages.terms.includes("do not sell or share opt-in data"));

// contact config flows through (stub phone + email)
check("privacy: contact phone", pages.privacy.includes("(555) 555-5555"));
check("contact: email", pages.contact.includes("hello@greatsoftware.dev"));
check("contact: tel href", pages.contact.includes("tel:+15555555555"));

// no leftover React SPA artifacts
check("no old main.tsx", !existsSync("src/main.tsx"));
check("no index.html at root src", !existsSync("index.html"));

const total = attempted;
const passed = total - failures.length;
const summary = {
  timestamp: new Date().toISOString(),
  mode: "full",
  total,
  passed,
  failed: failures.length,
  skipped: 0,
  failures: failures.map((f) => ({ file: "dist", line: 0, test_name: f, error: "assertion failed" })),
};
import("node:fs").then(({ mkdirSync, writeFileSync }) => {
  mkdirSync("test_logs", { recursive: true });
  writeFileSync("test_logs/latest_summary.json", JSON.stringify(summary, null, 2));
});

if (failures.length) {
  console.error("FAILED:\n" + failures.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log(`OK — ${passed}/${total} build assertions passed`);
