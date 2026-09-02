// Ticket: PS-01-divide-page ("Divide page to subpages")
// AC under test: "Full versions of sections as a separate pages"
//   -> menu, events, and "about us" each get their own standalone HTML page
//      with the full version of that section's content (fuller than the
//      short/preview version left on index.html).
//
// Naming convention assumed (repo has no router/build step, so subpages are
// plain sibling files at the repo root, matching the existing flat layout of
// index.html): menu.html, events.html, about.html.
//
// Run with: node --test tests/unit/subpages-exist.test.js

const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const {
    readRepoFile,
    repoFileExists,
    extractElementById,
    extractBody,
    textLength,
} = require("../helpers/html");

const SUBPAGES = [
    { file: "menu.html", sectionId: "menu", headingPattern: /menu/i },
    { file: "events.html", sectionId: "events", headingPattern: /events/i },
    { file: "about.html", sectionId: "about", headingPattern: /about/i },
];

describe('Full section pages exist (AC: "Full versions of sections as a separate pages")', () => {
    for (const { file, sectionId, headingPattern } of SUBPAGES) {
        describe(file, () => {
            test(`${file} exists as a standalone page`, () => {
                assert.equal(
                    repoFileExists(file),
                    true,
                    `expected a full "${sectionId}" page at ${file}`
                );
            });

            test(`${file} is a well-formed HTML document with a relevant title`, () => {
                const html = readRepoFile(file);
                assert.match(html, /<!DOCTYPE html>/i);
                assert.match(html, /<title>[^<]*<\/title>/i);
                const titleMatch = /<title>([^<]*)<\/title>/i.exec(html);
                assert.match(
                    titleMatch[1],
                    headingPattern,
                    `expected <title> of ${file} to reference "${sectionId}"`
                );
            });

            test(`${file} reuses the site's shared stylesheet`, () => {
                const html = readRepoFile(file);
                assert.match(
                    html,
                    /href=["']css\/style\.css["']/i,
                    `expected ${file} to link css/style.css like index.html does`
                );
            });

            test(`${file} contains the full "${sectionId}" content, longer than the landing preview`, () => {
                const indexHtml = readRepoFile("index.html");
                const shortSection = extractElementById(indexHtml, sectionId, "section");
                assert.notEqual(
                    shortSection,
                    null,
                    `expected index.html to still have the short "${sectionId}" section to compare against`
                );
                const shortLength = textLength(shortSection);

                const fullHtml = readRepoFile(file);
                const fullBody = extractBody(fullHtml) || fullHtml;
                const fullLength = textLength(fullBody);

                assert.ok(
                    fullLength > 50,
                    `expected ${file} to contain non-trivial content (got ${fullLength} chars of text)`
                );
                assert.ok(
                    fullLength > shortLength,
                    `expected the full "${sectionId}" page (${fullLength} chars) to contain more content than the short landing section (${shortLength} chars)`
                );
            });
        });
    }
});
