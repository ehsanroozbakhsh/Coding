require("../routes/admin");
require("../routes/shop");

const { getRoutes } = require("../routes/router");
require("../routes/web"); // فقط برای ثبت روت‌ها

// فیلترها: node bin/route-list.js --name=orders --method=GET --path=api
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")),
);

let routes = getRoutes();
if (args.name) routes = routes.filter((r) => r.name.includes(args.name));
if (args.method)
  routes = routes.filter((r) => r.method === args.method.toUpperCase());
if (args.path) routes = routes.filter((r) => r.uri.includes(args.path));

if (!routes.length) {
  console.log("No routes found.");
  process.exit(0);
}

const rows = routes.map((r) => ({
  Method: r.method,
  URI: r.uri,
  Name: r.name || "-",
  Action: r.action,
  Middleware: r.middleware.join(", ") || "-",
}));

const cols = Object.keys(rows[0]);
const widths = cols.map((c) =>
  Math.max(c.length, ...rows.map((r) => String(r[c]).length)),
);
const line = (row) =>
  "| " +
  cols.map((c, i) => String(row[c]).padEnd(widths[i])).join(" | ") +
  " |";
const sep = "+" + widths.map((w) => "-".repeat(w + 2)).join("+") + "+";

console.log(sep);
console.log(line(Object.fromEntries(cols.map((c) => [c, c]))));
console.log(sep);
rows.forEach((r) => console.log(line(r)));
console.log(sep);

process.exit(0);
