// Ticket: PS-01-divide-page ("Divide page to subpages")
// AC under test: "Navigation"
//   -> Users must be able to get from the landing page's short sections to
//      each full subpage, and back again, via consistent site navigation.
//      This is an integration concern: it spans index.html plus every full
//      subpage (menu.html, events.html, about.html) collaborating together,
//      not any single file in isolation.
//
// Run with: node --test tests/integration/navigation.test.js

const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const {
    readRepoFile,
    extractElementById,
    extractNavBlocks,
} = require("../helpers/html");

const SUBPAGES = [
    { file: "menu.html", sectionId: "menu", label: /menu/i },
    { file: "events.html", sectionId: "events", label: /events/i },
    { file: "about.html", sectionId: "about", label: /about/i },
];

const ALL_PAGES = ["index.html", ...SUBPAGES.map((p) => p.file)];

describe('Site-wide navigation connects landing sections to full pages (AC: "Navigation")', () => {
    // AC-3: every landing preview section links out to its corresponding full page.
    for (const { sectionId, file } of SUBPAGES) {
        test(`index.html's short "${sectionId}" section links to ${file}`, () => {
            const indexHtml = readRepoFile("index.html");
            const section = extractElementById(indexHtml, sectionId, "section");
            assert.notEqual(
                section,
                null,
                `expected <section id="${sectionId}"> to exist in index.html`
            );
            const hrefPattern = new RegExp(
                `href=["'][^"']*${file.replace(".", "\\.")}[^"']*["']`,
                "i"
            );
            assert.match(
                section,
                hrefPattern,
                `expected the short "${sectionId}" section in index.html to contain a link to ${file}`
            );
        });
    }

    // AC-3: every page in the site (landing + subpages) carries the same primary nav.
    for (const page of ALL_PAGES) {
        test(`${page} has a <nav> with links to Home, Menu, Events and About us`, () => {
            const html = readRepoFile(page);
            const navBlocks = extractNavBlocks(html);
            assert.ok(navBlocks.length > 0, `expected ${page} to contain a <nav> element`);
            const nav = navBlocks[0];

            for (const label of [/home/i, /menu/i, /events/i, /about/i]) {
                assert.match(
                    nav,
                    label,
                    `expected the nav on ${page} to include a link labelled like ${label}`
                );
            }
        });
    }

    // AC-3: from each full subpage, the nav's Home link must lead back to the landing page.
    for (const { file } of SUBPAGES) {
        test(`${file}'s nav "Home" link points back to index.html`, () => {
            const html = readRepoFile(file);
            const navBlocks = extractNavBlocks(html);
            assert.ok(navBlocks.length > 0, `expected ${file} to contain a <nav> element`);
            const nav = navBlocks[0];

            const homeLinkPattern = /<a\b[^>]*href=["']([^"']*)["'][^>]*>\s*Home\s*<\/a>/i;
            const match = homeLinkPattern.exec(nav);
            assert.notEqual(
                match,
                null,
                `expected the nav on ${file} to have an anchor labelled "Home"`
            );
            assert.match(
                match[1],
                /(^|\/)index\.html($|#)/i,
                `expected the "Home" link on ${file} (href="${match[1]}") to point back to index.html`
            );
        });
    }
});
