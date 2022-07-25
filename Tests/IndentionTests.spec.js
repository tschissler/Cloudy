import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Editor from '../editor.js';
describe('ChangeListLevelsTests', () => {
    before(function () {
        return JSDOM.fromFile('index.html')
            .then((dom) => {
            globalThis.window = dom.window;
            globalThis.document = window.document;
        });
    });
    describe('IndentionTests', () => {
        it('Indent first node of one', function () {
            const editor = new Editor();
            const startHTML = '<div><ul><li id="1">Test 1</li></ul></div>';
            const expectedHTML = '<div><ul><li id="1">Test 1</li></ul></div>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "1", true);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Indent second node of two', function () {
            const editor = new Editor();
            const startHTML = '<div><ul><li id="1">Test 1</li><li id="2">Test 2</li></ul></div>';
            const expectedHTML = '<div><ul><li id="1">Test 1</li><ul><li id="2">Test 2</li></ul></ul></div>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "2", true);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Indent second node of three', function () {
            const editor = new Editor();
            const startHTML = '<div><ul><li id="1">Test 1</li><li id="2">Test 2</li><li id="3">Test 3</li></ul></div>';
            const expectedHTML = '<div><ul><li id="1">Test 1</li><ul><li id="2">Test 2</li></ul><li id="3">Test 3</li></ul></div>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "2", true);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Indent node on second level', function () {
            const editor = new Editor();
            const startHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul><li id="3">Test2</li></ul>';
            const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><ul><li id="1.2">Test1.2</li></ul><li id="1.3">Test1.3</li></ul><li id="3">Test2</li></ul>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "1.2", true);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Indent two nodes which are direct neighbours', function () {
            const editor = new Editor();
            const startHTML = '<ul><li id="1">Test1</li><li id="2">Test2</li><li id="3">Test3</li></ul>';
            const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="2">Test2</li><li id="3">Test3</li></ul></ul>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "2", true);
            editor.changeIndention(document, "3", true);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Indent two nodes which are direct neighbours second first', function () {
            const editor = new Editor();
            const startHTML = '<ul><li id="1">Test1</li><li id="2">Test2</li><li id="3">Test3</li></ul>';
            const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="2">Test2</li><li id="3">Test3</li></ul></ul>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "3", true);
            editor.changeIndention(document, "2", true);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Indent single node between subnodes', function () {
            const editor = new Editor();
            const startHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li></ul><li id="1.2">Test1.2</li><ul><li id="1.3">Test1.3</li></ul><li id="3">Test2</li></ul>';
            const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul><li id="3">Test2</li></ul>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "1.2", true);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Indent single node', function () {
            const editor = new Editor();
            const startHTML = '<ul><li id="1">Test1</li></ul>';
            const expectedHTML = '<ul><li id="1">Test1</li></ul>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "1", true);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
    });
    describe('UnindedentionTests', () => {
        it('Unindent second node of two', function () {
            const editor = new Editor();
            const startHTML = '<div><ul><li id="1">Test 1</li><ul><li id="2">Test 2</li></ul></ul></div>';
            const expectedHTML = '<div><ul><li id="1">Test 1</li><li id="2">Test 2</li></ul></div>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "2", false);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Unindent second node of three', function () {
            const editor = new Editor();
            const startHTML = '<div><ul><li id="1">Test 1</li><ul><li id="2">Test 2</li></ul><li id="3">Test 3</li></ul></div>';
            const expectedHTML = '<div><ul><li id="1">Test 1</li><li id="2">Test 2</li><li id="3">Test 3</li></ul></div>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "2", false);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Unindent node on top level', function () {
            const editor = new Editor();
            const startHTML = '<div><ul><li id="1">Test 1</li><li id="2">Test 2</li><li id="3">Test 3</li></ul></div>';
            const expectedHTML = '<div><ul><li id="1">Test 1</li><li id="2">Test 2</li><li id="3">Test 3</li></ul></div>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "2", false);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Unindent subnode twice', function () {
            const editor = new Editor();
            const startHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul><li id="3">Test2</li></ul>';
            const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li></ul><li id="1.2">Test1.2</li><ul><li id="1.3">Test1.3</li></ul><li id="3">Test2</li></ul>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "1.2", false);
            editor.changeIndention(document, "1.2", false);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Unindent last subnode', function () {
            const editor = new Editor();
            const startHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul><li id="3">Test2</li></ul>';
            const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li></ul><li id="1.3">Test1.3</li><li id="3">Test2</li></ul>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "1.3", false);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Unindent second subnode of three', function () {
            const editor = new Editor();
            const startHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li><li id="1.2">Test1.2</li><li id="1.3">Test1.3</li></ul><li id="3">Test2</li></ul>';
            const expectedHTML = '<ul><li id="1">Test1</li><ul><li id="1.1">Test1.1</li></ul><li id="1.2">Test1.2</li><ul><li id="1.3">Test1.3</li></ul><li id="3">Test2</li></ul>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "1.2", false);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
        it('Unindent single node', function () {
            const editor = new Editor();
            const startHTML = '<ul><li id="1">Test1</li></ul>';
            const expectedHTML = '<ul><li id="1">Test1</li></ul>';
            document.getElementById("editor").innerHTML = startHTML;
            editor.changeIndention(document, "1", false);
            expect(document.getElementById("editor").innerHTML).to.equal(expectedHTML);
        });
    });
});
//# sourceMappingURL=IndentionTests.spec.js.map