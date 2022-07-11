const assert = require('assert').strict;
const { title } = require('process');
var parser = require('../parser.js');

describe ('ParserTests', function () {
    it ('Parse single node', function () {
        var input = "Node A";
        var actual = parser.parse(input);
        assert.strictEqual(actual.title, "Node A");
        assert.strictEqual(actual.childNodes.length, 0);
    });

    it ('Parse node with one child', function () {
        var input = "Node A\n  ChildNode A.1";
        var actual = parser.parse(input);
        assert.strictEqual(actual.title, "Node A");
        assert.strictEqual(actual.childNodes[0].title, "ChildNode A.1");
        assert.strictEqual(actual.childNodes[0].childNodes.length, 0);
    });

    it ('Parse node with two childs', function () {
        var input = "Node A\n  ChildNode A.1\n  ChildNode A.2";
        var actual = parser.parse(input);
        assert.strictEqual(actual.title, "Node A");
        assert.strictEqual(actual.childNodes[0].title, "ChildNode A.1");
        assert.strictEqual(actual.childNodes[0].childNodes.length, 0);
        assert.strictEqual(actual.childNodes[1].title, "ChildNode A.2");
        assert.strictEqual(actual.childNodes[1].childNodes.length, 0);
    });

    it ('Parse node with one child and one subchild', function () {
        var input = "Node A\n  ChildNode A.1\n    SubChildNode A.1.1";
        var actual = parser.parse(input);
        assert.strictEqual(actual.title, "Node A");
        assert.strictEqual(actual.childNodes[0].title, "ChildNode A.1");
        assert.strictEqual(actual.childNodes[0].childNodes.length, 1);
        assert.strictEqual(actual.childNodes[0].childNodes[0].title, "SubChildNode A.1.1");
        assert.strictEqual(actual.childNodes[0].childNodes[0].childNodes.length, 0);
    });

    it ('Parse node with one child and two subchild', function () {
        var input = "Node A\n  ChildNode A.1\n    SubChildNode A.1.1\n    SubChildNode A.1.2";
        var actual = parser.parse(input);
        assert.strictEqual(actual.title, "Node A");
        assert.strictEqual(actual.childNodes[0].title, "ChildNode A.1");
        assert.strictEqual(actual.childNodes[0].childNodes.length, 2);
        assert.strictEqual(actual.childNodes[0].childNodes[0].title, "SubChildNode A.1.1");
        assert.strictEqual(actual.childNodes[0].childNodes[0].childNodes.length, 0);
        assert.strictEqual(actual.childNodes[0].childNodes[1].title, "SubChildNode A.1.2");
        assert.strictEqual(actual.childNodes[0].childNodes[1].childNodes.length, 0);
    });

    it ('Parse node with two child and two subchild each', function () {
        var input = "Node A\n  ChildNode A.1\n    SubChildNode A.1.1\n    SubChildNode A.1.2\n  ChildNode A.2\n    SubChildNode A.2.1\n    SubChildNode A.2.2";
        var actual = parser.parse(input);
        assert.strictEqual(actual.title, "Node A");
        assert.strictEqual(actual.childNodes[0].title, "ChildNode A.1");
        assert.strictEqual(actual.childNodes[0].childNodes.length, 2);
        assert.strictEqual(actual.childNodes[0].childNodes[0].title, "SubChildNode A.1.1");
        assert.strictEqual(actual.childNodes[0].childNodes[0].childNodes.length, 0);
        assert.strictEqual(actual.childNodes[0].childNodes[1].title, "SubChildNode A.1.2");
        assert.strictEqual(actual.childNodes[0].childNodes[1].childNodes.length, 0);
        assert.strictEqual(actual.childNodes[1].title, "ChildNode A.2");
        assert.strictEqual(actual.childNodes[1].childNodes.length, 2);
        assert.strictEqual(actual.childNodes[1].childNodes[0].title, "SubChildNode A.2.1");
        assert.strictEqual(actual.childNodes[1].childNodes[0].childNodes.length, 0);
        assert.strictEqual(actual.childNodes[1].childNodes[1].title, "SubChildNode A.2.2");
        assert.strictEqual(actual.childNodes[1].childNodes[1].childNodes.length, 0);
    });

    it ('Going back two levels', function () {
        var input = "Node A\n" +
                    "  ChildNode A.1\n" +
                    "    SubChildNode A.1.1\n" +
                    "      SubSubChildNode A.1.1.1\n" +
                    "  ChildNode A.2\n" +
                    "    SubChildNode A.2.1\n" +
                    "      SubSubChildNode A.2.1.1";
        var actual = parser.parse(input);
        assert.strictEqual(actual.title, "Node A");
        assert.strictEqual(actual.childNodes[0].title, "ChildNode A.1");
        assert.strictEqual(actual.childNodes[0].childNodes.length, 1);
        assert.strictEqual(actual.childNodes[0].childNodes[0].title, "SubChildNode A.1.1");
        assert.strictEqual(actual.childNodes[0].childNodes[0].childNodes.length, 1);
        assert.strictEqual(actual.childNodes[0].childNodes[0].childNodes[0].title, "SubSubChildNode A.1.1.1");
        assert.strictEqual(actual.childNodes[0].childNodes[0].childNodes[0].childNodes.length, 0);
        assert.strictEqual(actual.childNodes[1].title, "ChildNode A.2");
        assert.strictEqual(actual.childNodes[1].childNodes.length, 1);
        assert.strictEqual(actual.childNodes[1].childNodes[0].title, "SubChildNode A.2.1");
        assert.strictEqual(actual.childNodes[1].childNodes[0].childNodes.length, 1);
        assert.strictEqual(actual.childNodes[1].childNodes[0].childNodes[0].title, "SubSubChildNode A.2.1.1");
        assert.strictEqual(actual.childNodes[1].childNodes[0].childNodes[0].childNodes.length, 0);
    });
});