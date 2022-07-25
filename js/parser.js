export function parse(cloudData) {
    var inputrows = cloudData.split('\n');
    var rootnode = {id: 0, title: inputrows[0], childNodes: [], references: []};
    var result;
    
    if (inputrows.length > 1) {
        parseRecursion(rootnode, inputrows, 1, 1);
        result = rootnode;
    }
    else {
        result = rootnode;
    }
    return result;
}

function parseRecursion(element, inputrows, index, level) {
    var childnode;
    while (index < inputrows.length) {
        if (inputrows[index].startsWith(createIndentationString(level + 1))) {
            index = parseRecursion(childnode, inputrows, index, level + 1);
        }
        else if (inputrows[index].startsWith(createIndentationString(level))) {
            childnode = {id: createGUID(), title: inputrows[index].trim(), childNodes: [], references: []};
            element.childNodes.push(childnode);
            index++;
        }
        else {
            return index++;
        }
        //return parseRecursion(childnode, inputrows, index + 1);
    }
    return index++;
}

function createIndentationString(level) {
    var indentation = "";
    for (var i = 0; i < level; i++) {
        indentation += "  ";
    }
    return indentation;
}

export function createGUID() {
    function random() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return random() + random() + '-' + random() + '-' + random() + '-' +
      random() + '-' + random() + random() + random();
  }

// module.exports.parse = parse;