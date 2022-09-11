import { expect } from "chai";
import { JSDOM } from "jsdom";

import Editor from "../ts/editor.js";
describe("CleanupHtmlTests", () => {
  before(function () {
    return JSDOM.fromFile("./index.html").then((dom) => {
      globalThis.window = dom.window;
      globalThis.document = window.document;
    });
  });

  it("CleanupLineBreaks", function () {
    const startHTML = '\n<ul>\n<li id="1">Test1</li>\n<ul>\n<li id="1.1">Test1.1</li>\n<li id="1.2">Test1.2</li>\n<li id="1.3">Test1.3</li>\n</ul>\n</ul>\n';
    const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul></ul>';
    const actualHTML = Editor.cleanUpHtml(startHTML);
    expect(actualHTML).to.equal(expectedHTML);
  });

  it("CleanupLineBreaksAndWhitespaces", function () {
    const startHTML =
      '\n<ul>\n                        <li id="1">Test1</li>\n                        <ul>\n                            <li id="1.1">Test1.1</li>\n                            <li id="1.2">Test1.2</li>\n                            <li id="1.3">Test1.3</li>\n                        </ul>\n                    </ul>\n';
    const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul></ul>';
    document.getElementById("CloudTextModel").innerHTML = startHTML;
    const actualHTML = Editor.cleanUpHtml(startHTML);
    expect(actualHTML).to.equal(expectedHTML);
  });

  it("CleanupWhiteSpacesBeginningAndEnd", function () {
    const startHTML =
      '                    <ul>\n                        <li id="1">Test1</li>\n                        <ul>\n                            <li id="1.1">Test1.1</li>\n                            <li id="1.2">Test1.2</li>\n                            <li id="1.3">Test1.3</li>\n                        </ul>\n                    </ul>                ';
    const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul></ul>';
    document.getElementById("CloudTextModel").innerHTML = startHTML;
    const actualHTML = Editor.cleanUpHtml(startHTML);
    expect(actualHTML).to.equal(expectedHTML);
  });

  it("CleanupLineBreaksAndWhiteSpacesBeginningAndEnd", function () {
    const startHTML =
      '\n                    <ul>\n                        <li id="1">Test1</li>\n                        <ul>\n                            <li id="1.1">Test1.1</li>\n                            <li id="1.2">Test1.2</li>\n                            <li id="1.3">Test1.3</li>\n                        </ul>\n                    </ul>\n                ';
    const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul></ul>';
    document.getElementById("CloudTextModel").innerHTML = startHTML;
    const actualHTML = Editor.cleanUpHtml(startHTML);
    expect(actualHTML).to.equal(expectedHTML);
  });
});
