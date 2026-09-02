// Ticket: PS-01-divide-page ("Divide page to subpages")
// AC under test: "Short versions of pages in main page"
//   -> The landing page (index.html) must keep a preview/short section for
//      each topic that is getting its own full subpage (menu, events, about
//      us), rather than having that content moved out of index.html
//      entirely.
//
// Run with: node --test tests/unit/index-landing-sections.test.js

const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { readRepoFile, extractElementById } = require("../helpers/html");

describe("index.html keeps short landing sections (AC: Short versions of pages in main page)", () => {
    const indexHtml = readRepoFile("index.html");

    // AC-1: the landing page file itself must still exist and be the site entry point.
    test("index.html exists and is a real HTML document", () => {
        assert.match(indexHtml, /<!DOCTYPE html>/i);
        assert.match(indexHtml, /<html[\s>]/i);
    });

    // AC-1: each subpage topic still has a short/preview section on the landing page.
    for (const { id, expectedHeadingPattern } of [
        { id: "menu", expectedHeadingPattern: /menu/i },
        { id: "events", expectedHeadingPattern: /events/i },
        { id: "about", expectedHeadingPattern: /about/i },
    ]) {
        test(`index.html still contains a short "${id}" section with a heading`, () => {
            const section = extractElementById(indexHtml, id, "section");
            assert.notEqual(
                section,
                null,
                `expected <section id="${id}"> to remain in index.html as the short/landing version`
            );
            assert.match(
                section,
                expectedHeadingPattern,
                `expected the "${id}" landing section to still contain heading text about "${id}"`
            );
        });
    }

    // AC-1: the hero/home content is the landing page itself, not a subpage teaser.
    test('index.html still contains the "home" hero section', () => {
        const homeSection = extractElementById(indexHtml, "home", "section");
        assert.notEqual(
            homeSection,
            null,
            'expected <section id="home"> (the hero) to remain in index.html'
        );
    });
});
