/**
 * Replace CTA elements with <SplitCTA />:
 *  - Text: "Get Started" (any case/spacing/punctuation)
 *  - Text: "Get a cost review." (with or without trailing period)
 *
 * Skips anything inside a <nav> and files whose path looks like a navbar/header.
 *
 * Usage (dry run first):
 *   npx jscodeshift --parser=tsx -t scripts/codemods/replace-ctas.js "src" \
 *     --importPath="@/components/ui/SplitCTA" --keepInFiles="nav|navbar|header" --dry
 *
 * Then run for real (remove --dry):
 *   npx jscodeshift --parser=tsx -t scripts/codemods/replace-ctas.js "src" \
 *     --importPath="@/components/ui/SplitCTA" --keepInFiles="nav|navbar|header" --verbose=2
 */

const TARGET_TEXTS = new Set([
  "get started",
  "get a cost review",
  "get a cost review."
]);

const getName = (n) =>
  n && n.type === "JSXIdentifier"
    ? n.name
    : n && n.type === "JSXMemberExpression"
    ? n.property && n.property.name
    : "";

function normalizeText(s) {
  return s.replace(/\s+/g, " ")
    .replace(/[^\w\s.]/g, "")
    .trim()
    .toLowerCase();
}

// Recursively gather all visible text from a node's children
function collectText(node, j) {
  let out = "";
  if (!node) return out;
  const t = node.type;
  if (t === "JSXText") out += node.value;
  else if (t === "Literal" || t === "StringLiteral") out += String(node.value);
  else if (t === "JSXExpressionContainer") {
    const e = node.expression;
    if (e && (e.type === "Literal" || e.type === "StringLiteral")) out += String(e.value);
  } else if (t === "JSXElement") {
    node.children && node.children.forEach((c) => { out += collectText(c, j); });
  }
  return out;
}

function isInsideNav(path) {
  let p = path;
  while (p) {
    if (p.value && p.value.type === "JSXElement") {
      const nm = getName(p.value.openingElement.name).toLowerCase();
      if (nm === "nav") return true;
    }
    p = p.parentPath;
  }
  return false;
}

function ensureImport(j, root, importPath) {
  const has = root.find(j.ImportDeclaration, { source: { value: importPath } }).size() > 0;
  if (!has) {
    const firstImport = root.find(j.ImportDeclaration).at(0);
    const imp = j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier("SplitCTA"))],
      j.literal(importPath)
    );
    if (firstImport.size()) firstImport.insertBefore(imp);
    else root.get().node.program.body.unshift(imp);
  }
}

module.exports = function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const keepRE = new RegExp(options.keepInFiles || "nav|navbar|header", "i");
  const importPath = options.importPath || "@/components/ui/SplitCTA";

  const looksLikeNavFile = keepRE.test(file.path);

  const candidates = root.find(j.JSXElement).filter((p) => {
    const el = p.value;
    const name = getName(el.openingElement.name);
    if (name === "SplitCTA") return false; // already converted
    if (!["Link", "a", "button"].includes(name)) return false;

    const text = normalizeText(collectText(el, j));
    if (!TARGET_TEXTS.has(text)) return false;

    if (isInsideNav(p)) return false;        // skip <nav> content
    if (looksLikeNavFile) return false;      // skip navbar/header files entirely
    return true;
  });

  if (!candidates.size()) return null;

  candidates.forEach((p) => {
    const el = p.value;

    // Copy ALL existing attributes to <SplitCTA />
    // (href, onClick, className, target, rel, aria-*, data-*, etc.)
    const attrs = (el.openingElement.attributes || []).map((a) => a);

    const newEl = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier("SplitCTA"), attrs, true),
      null,
      [],
      true
    );

    p.replace(newEl);
  });

  ensureImport(j, root, importPath);
  return root.toSource({ quote: "double" });
};
