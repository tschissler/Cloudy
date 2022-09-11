export default class Editor {
  static previousTreeContent = "";
  static _hasUnsavedChanges = false;
  static hasUnsavedChanges = {
    get: function () {
      return this._hasUnsavedChanges;
    },
    set: function (value) {
      this._hasUnsavedChanges = value;
      console.log("hasUnsavedChanges: " + value);
      if (value) {
        $("#hasChangesIndicator").show();
      } else {
        $("#hasChangesIndicator").hide();
      }
    },
  };

  constructor() {
    Editor.hasUnsavedChanges.set(false);
    Editor.previousTreeContent = document.getElementById("CloudTextModel").innerHTML;
  }

  static updateHasUnsavedChanges() {
    if (Editor.previousTreeContent != document.getElementById("CloudTextModel").innerHTML) {
      Editor.hasUnsavedChanges.set(true);
      Editor.previousTreeContent = document.getElementById("CloudTextModel").innerHTML;
    }
  }

  clickEventHandler(e) {
    var currentListItem = Editor.GetListItemFromSelection();
  }
  beforeUnloadEventHandler(e) {
    if (Editor.hasUnsavedChanges.get()) {
      return "You have unsaved changes. Are you sure you want to leave?";
    }
  }
  keyPressEventHandler(e) {
    if (e.key.toLowerCase() == "tab") {
      var currentListItem = Editor.GetListItemFromSelection();
      Editor.changeIndention(document, currentListItem.id, !e.shiftKey);
      document.getElementById("CloudTextModel").dispatchEvent(new Event("input"));
      e.preventDefault();

      Editor.updateHasUnsavedChanges();
    }
  }

  keyUpEventHandler(e) {
    if (e.key.toLowerCase() == "enter") {
      var selection = document.getSelection();
      var range = selection.getRangeAt(0);
      var currentListItem = range.startContainer;
      if (currentListItem.nodeName.toLowerCase() == "#text") {
        currentListItem = currentListItem.parentNode;
      }
      currentListItem.id = Editor.createGUID();
    }
    Editor.updateHasUnsavedChanges();
  }

  static GetListItemFromSelection() {
    var selection = document.getSelection();

    var range = selection.getRangeAt(0);

    var currentListItem = range.startContainer;
    if (currentListItem.nodeName.toLowerCase() == "#text") {
      currentListItem = currentListItem.parentNode;
    }
    return currentListItem;
  }

  save(doc) {
    const a = globalThis.document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + doc;
    var fileName = "Cloud.html";
    var fileNameInputFiled = document.getElementById("fileName");
    if (fileNameInputFiled.value != "") {
      fileName = fileNameInputFiled.value;
    }
    a.download = fileName;
    globalThis.document.body.appendChild(a);
    a.click();
    globalThis.document.body.removeChild(a);
    var saveModal = bootstrap.Modal.getInstance(document.getElementById("saveModal"));
    saveModal.hide();
    Editor.hasUnsavedChanges.set(false);
  }
  load(content, container) {
    console.log("Reading content from file");
    container.innerHTML = content;
    this.updateReferencesRecursive(container);
    document.getElementById("CloudTextModel").dispatchEvent(new Event("input"));
    var loadModal = bootstrap.Modal.getInstance(document.getElementById("loadModal"));
    loadModal.hide();
    Editor.hasUnsavedChanges.set(false);
  }
  updateReferencesRecursive(node) {
    if (node.children != null) {
      Array.from(node.children).forEach((element) => {
        if (element.slot != "") {
          element.references = element.slot.split(",");
        }
        this.updateReferencesRecursive(element);
      });
    }
  }
  static createGUID() {
    function random() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return random() + random() + "-" + random() + "-" + random() + "-" + random() + "-" + random() + random() + random();
  }

  static cleanUpHtml(html) {
    return html.replace(/\n/g, "").replace(/\s*</gm, "<").replace(/>\s*/gm, ">");
  }

  static changeIndention(document, nodeId, indent) {
    var anchoroffset = document.getSelection().anchorOffset;
    document.getElementById("CloudTextModel").innerHTML = this.cleanUpHtml(document.getElementById("CloudTextModel").innerHTML);
    console.log("Changing indention of node " + nodeId);
    const node = document.getElementById(nodeId);

    if (indent) {
      Editor.indentText(document, node);
    } else {
      Editor.unindentText(document, node);
    }

    var selection = document.getSelection();
    selection.setPosition(node, 0);
    for (var i = 0; i < anchoroffset; i++) {
      selection.modify("move", "forward", "character");
    }
  }

  static indentText(document, node) {
    const previousNode = node.previousElementSibling;
    if (previousNode != null) {
      if (previousNode.nodeName.toLowerCase() == "ul") {
        previousNode.appendChild(node);
      } else if (previousNode.nodeName.toLowerCase() == "li" && previousNode.children.length > 0 && previousNode.children[0].nodeName.toLowerCase() == "ul") {
        previousNode.children[0].appendChild(node);
      } else {
        const newList = document.createElement("ul");
        previousNode.appendChild(newList);
        newList.appendChild(node);
      }
    }
  }

  static unindentText(document, node) {
    const parent = node.parentElement;
    if (parent.parentElement.parentElement.parentElement.nodeName.toLowerCase() != "div") {
      const grandParent = parent.parentElement;
      if (grandParent.nodeName.toLowerCase() == "li") {
        grandParent.after(node);
        if (parent.children.length == 0) {
          parent.remove();
        }
      } else if (grandParent.nodeName.toLowerCase() == "ul") {
        grandParent.after(node);
        parent.remove();
      }
    }
  }
}
