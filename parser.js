export function parse(cloudData) {
    var inputrows = cloudData.split('\n');
    var rootnode = {title: inputrows[0], childNodes: []};
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
            childnode = {title: inputrows[index].trim(), childNodes: []};
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

// module.exports.parse = parse;