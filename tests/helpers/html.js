// Shared helpers for the plain-JS test suite (tests/).
//
// This repo has no build tooling and no package.json (see README.md /
// .claude/permissions.md adaptation notes), so these tests run on Node's
// built-in test runner (`node --test`, available Node >=18) and built-in
// `assert` module only — no dependency install required, and easy for a
// human to read and re-run directly:
//
//   node --test tests/unit tests/integration
//
// The helpers below do lightweight, regex-based HTML inspection. This is a
// deliberate trade-off (no jsdom/parser dependency is available in this
// project), and is precise enough for the flat, non-nested <section> markup
// this site currently uses.

const fs = require("node:fs");
const path = require("node:path");

const REPO_ROOT = path.resolve(__dirname, "..", "..");

/** Reads a file relative to the repo root. Throws if it does not exist. */
function readRepoFile(relativePath) {
    const fullPath = path.join(REPO_ROOT, relativePath);
    return fs.readFileSync(fullPath, "utf8");
}

/** True if a file exists relative to the repo root. */
function repoFileExists(relativePath) {
    return fs.existsSync(path.join(REPO_ROOT, relativePath));
}

/**
 * Extracts the inner markup of `<section id="...">...</section>` (or any
 * tag) with the given id, from the first opening tag through its first
 * matching closing tag of the same element name.
 *
 * Assumes sections are not nested inside one another, which matches the
 * current flat structure of index.html.
 */
function extractElementById(html, id, tagName = "section") {
    const openTagPattern = new RegExp(
        `<${tagName}\\b[^>]*\\bid=["']${id}["'][^>]*>`,
        "i"
    );
    const openMatch = openTagPattern.exec(html);
    if (!openMatch) return null;

    const contentStart = openMatch.index + openMatch[0].length;
    const closeTagPattern = new RegExp(`</${tagName}\\s*>`, "i");
    closeTagPattern.lastIndex = contentStart;
    const closeMatch = closeTagPattern.exec(html.slice(contentStart));
    if (!closeMatch) return null;

    return html.slice(contentStart, contentStart + closeMatch.index);
}

/** Extracts the inner markup of the first <body>...</body> found, or null. */
function extractBody(html) {
    const match = /<body[^>]*>([\s\S]*)<\/body>/i.exec(html);
    return match ? match[1] : null;
}

/** Strips tags/scripts/styles and collapses whitespace to approximate visible text length. */
function textLength(htmlFragment) {
    if (!htmlFragment) return 0;
    const withoutScripts = htmlFragment
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<!--[\s\S]*?-->/g, "");
    const text = withoutScripts.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return text.length;
}

/** Extracts all <nav>...</nav> blocks (there is normally exactly one per page). */
function extractNavBlocks(html) {
    const matches = html.match(/<nav\b[\s\S]*?<\/nav>/gi);
    return matches || [];
}

module.exports = {
    REPO_ROOT,
    readRepoFile,
    repoFileExists,
    extractElementById,
    extractBody,
    textLength,
    extractNavBlocks,
};
