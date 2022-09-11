import { expect } from "chai";
import { Console } from "console";
import { JSDOM } from "jsdom";

import Editor from "../ts/editor.js";
describe("ChangeListLevelsTests", () => {
  before(function () {
    return JSDOM.fromFile("./index.html").then((dom) => {
      globalThis.window = dom.window;
      globalThis.document = window.document;
    });
  });
  describe("IndentionTests", () => {
    it("Indent first node of one", function () {
      const startHTML = '<ul><li id="1">Test 1</li></ul>';
      const expectedHTML = '<ul><li id="1">Test 1</li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Indent second node of two", function () {
      const startHTML = '<ul><li id="1">Test 1</li><li id="2">Test 2</li></ul>';
      const expectedHTML = '<ul><li id="1">Test 1<ul><li id="2">Test 2</li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "2", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Indent second node of three", function () {
      const startHTML = '<ul><li id="1">Test 1</li><li id="2">Test 2</li><li id="3">Test 3</li></ul>';
      const expectedHTML = '<ul><li id="1">Test 1<ul><li id="2">Test 2</li></ul></li><li id="3">Test 3</li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "2", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Indent node on second level", function () {
      const startHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul></li><li id="3">Test2</li></ul>';
      const expectedHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.2">Test1.2</li></ul></li><li id="1.3">Test1.3</li></ul></li><li id="3">Test2</li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.2", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Indent two nodes which are direct neighbours", function () {
      const startHTML = '<ul><li id="1">Test1</li><li id="2">Test2</li><li id="3">Test3</li></ul>';
      const expectedHTML = '<ul><li id="1">Test1<ul><li id="2">Test2</li><li id="3">Test3</li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "2", true);
      Editor.changeIndention(document, "3", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Indent two nodes which are direct neighbours second first", function () {
      const startHTML = '<ul><li id="1">Test1</li><li id="2">Test2</li><li id="3">Test3</li></ul>';
      const expectedHTML = '<ul><li id="1">Test1<ul><li id="2">Test2<ul><li id="3">Test3</li></ul></li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "3", true);
      Editor.changeIndention(document, "2", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Indent single node between subnodes", function () {
      const startHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1</li></ul></li><li id="2">Test2<ul><li id="2.1">Test2.1</li></ul></li><li id="3">Test3</li></ul>';
      const expectedHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1</li><li id="2">Test2<ul><li id="2.1">Test2.1</li></ul></li></ul></li><li id="3">Test3</li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "2", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Indent node with children", function () {
      const startHTML =
        '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2</li></ul></li><li id="1.2">Test1.2<ul><li id="1.2.1">Test1.2.1</li><li id="1.2.2">Test1.2.2</li></ul></li></ul></li></ul>';
      const expectedHTML =
        '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2</li><li id="1.2">Test1.2<ul><li id="1.2.1">Test1.2.1</li><li id="1.2.2">Test1.2.2</li></ul></li></ul></li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.2", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Indent node with children using whitespaces and line breaks", function () {
      const startHTML =
        '\n<ul>\n    <li id="1">Test1\n    <ul>\n        <li id="1.1">Test1.1\n        <ul>\n            <li id="1.1.1">Test1.1.1</li>\n            <li id="1.1.2">Test1.1.2</li>\n        </ul>\n        </li>\n        <li id="1.1.3">Test1.1.3\n        <ul>\n            <li id="1.1.3.1">Test1.1.3.1</li>\n            <li id="1.1.3.2">Test1.1.3.2</li>\n        </ul>\n            </li>\n    </ul>\n     </li>\n</ul>';
      const expectedHTML =
        '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2</li><li id="1.1.3">Test1.1.3<ul><li id="1.1.3.1">Test1.1.3.1</li><li id="1.1.3.2">Test1.1.3.2</li></ul></li></ul></li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.1.3", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Not Indent single node", function () {
      const startHTML = '<ul><li id="1">Test1</li></ul>';
      const expectedHTML = '<ul><li id="1">Test1</li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Not Indent root node", function () {
      const startHTML = '<ul><li id="1">Test1<ul><li id="2">Test2</li><li id="3">Test3</li></ul></li></ul>';
      const expectedHTML = '<ul><li id="1">Test1<ul><li id="2">Test2</li><li id="3">Test3</li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1", true);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
  });
  describe("UnindedentionTests", () => {
    it("Unindent second node of two", function () {
      const startHTML    = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2</li></ul></li></ul></li></ul>';
      const expectedHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li></ul></li><li id="1.1.2">Test1.1.2</li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.1.2", false);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Unindent second node of three", function () {
      const startHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2</li><li id="1.1.3">Test1.1.3</li></ul></li></ul></li></ul>';
      const expectedHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.3">Test1.1.3</li></ul></li><li id="1.1.2">Test1.1.2</li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.1.2", false);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Unindent node on top level", function () {
      const startHTML = '<ul><li id="1">Test 1<ul><li id="1.1">Test 1.1</li><li id="1.2">Test 1.2</li></ul></li></ul>';
      const expectedHTML = '<ul><li id="1">Test 1<ul><li id="1.1">Test 1.1</li><li id="1.2">Test 1.2</li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1", false);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Unindent subnode twice", function () {
      const startHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2</li><li id="1.1.3">Test1.1.3</li></ul></li></ul></li></ul>';
      const expectedHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.3">Test1.1.3</li></ul></li><li id="1.1.2">Test1.1.2</li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.1.2", false);
      Editor.changeIndention(document, "1.1.2", false);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Unindent last subnode with sibling", function () {
      const startHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2</li><li id="1.1.3">Test1.1.3<ul><li id="1.1.3.1">Test1.1.3.1</li><li id="1.1.3.2">Test1.1.3.2</li></ul></li></ul></li></ul></li></ul>';
      const expectedHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2</li></ul></li><li id="1.1.3">Test1.1.3<ul><li id="1.1.3.1">Test1.1.3.1</li><li id="1.1.3.2">Test1.1.3.2</li></ul></li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.1.3", false);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Unindent last subnode without sibling", function () {
      const startHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li></ul></li></ul></li></ul>';
      const expectedHTML = '<ul><li id="1">Test1<ul><li id="1.1">Test1.1</li><li id="1.1.1">Test1.1.1</li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.1.1", false);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Unindent last subnode with childnodes", function () {
      const startHTML =
        '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2</li><li id="1.1.3">Test1.1.3<ul><li id="1.1.3.1">Test1.1.3.1</li><li id="1.1.3.2">Test1.1.3.2</li></ul></li></ul></li></ul></li></ul>';
      const expectedHTML =
        '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2</li></ul></li><li id="1.1.3">Test1.1.3<ul><li id="1.1.3.1">Test1.1.3.1</li><li id="1.1.3.2">Test1.1.3.2</li></ul></li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.1.3", false);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Unindent second subnode of three with children", function () {
      const startHTML =
        '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.2">Test1.1.2<ul><li id="1.1.2.1">Test1.1.2.1</li><li id="1.1.2.2">Test1.1.2.2</li></ul></li><li id="1.1.3">Test1.1.3<ul><li id="1.1.3.1">Test1.1.3.1</li><li id="1.1.3.2">Test1.1.3.2</li></ul></li></ul></li></ul></li></ul>';
      const expectedHTML =
        '<ul><li id="1">Test1<ul><li id="1.1">Test1.1<ul><li id="1.1.1">Test1.1.1</li><li id="1.1.3">Test1.1.3<ul><li id="1.1.3.1">Test1.1.3.1</li><li id="1.1.3.2">Test1.1.3.2</li></ul></li></ul></li><li id="1.1.2">Test1.1.2<ul><li id="1.1.2.1">Test1.1.2.1</li><li id="1.1.2.2">Test1.1.2.2</li></ul></li></ul></li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.1.2", false);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Unindent with line breaks", function () {
      const startHTML =
        '\n                    <ul>\n                        <li id="1">Test1</li>\n                        <ul>\n                            <li id="1.1">Test1.1</li>\n                            <li id="1.2">Test1.2</li>\n                            <li id="1.3">Test1.3</li>\n                        </ul>\n                    </ul>\n                ';
      const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1.2", false);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
    it("Unindent single node", function () {
      const startHTML = '<ul><li id="1">Test1</li></ul>';
      const expectedHTML = '<ul><li id="1">Test1</li></ul>';
      document.getElementById("CloudTextModel").innerHTML = startHTML;
      Editor.changeIndention(document, "1", false);
      expect(document.getElementById("CloudTextModel").innerHTML).to.equal(expectedHTML);
    });
  });

  describe("Indention with different list structures", () => {
    it("create list with DOM", function () {
      document.getElementById("CloudTextModel").innerHTML = "";
      const list1 = document.createElement("ul");
      const listElement1 = document.createElement("li");
      listElement1.id = "1";
      listElement1.innerHTML = "Test1";
      const listElement2 = document.createElement("li");
      listElement2.id = "2";
      listElement2.innerHTML = "Test2";
      const list2 = document.createElement("ul");
      const listElement3 = document.createElement("li");
      listElement3.id = "1.1";
      listElement3.innerHTML = "Test1.1";
      const list3 = document.createElement("ul");
      const listElement4 = document.createElement("li");
      listElement4.id = "1.1.1";
      listElement4.innerHTML = "Test1.1.1";

      list1.appendChild(listElement1);
      list1.appendChild(listElement2);
      list2.appendChild(listElement3);
      listElement1.appendChild(list2);
      list3.appendChild(listElement4);
      listElement3.appendChild(list3);

      document.getElementById("CloudTextModel").appendChild(list1);
      console.log(document.getElementById("CloudTextModel").innerHTML);

      listElement2.appendChild(list2);

      console.log(document.getElementById("CloudTextModel").innerHTML);
    });
  });
});
