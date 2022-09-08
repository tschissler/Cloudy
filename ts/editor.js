export default class Editor {
  constructor() {
    Editor.hasUnsavedChanges.set(false);
  }
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
      document
        .getElementById("CloudTextModel")
        .dispatchEvent(new Event("input"));
      e.preventDefault();
    }
    Editor.hasUnsavedChanges.set(true);
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
    Editor.hasUnsavedChanges.set(true);
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
    var saveModal = bootstrap.Modal.getInstance(
      document.getElementById("saveModal")
    );
    saveModal.hide();
    Editor.hasUnsavedChanges.set(false);
  }
  load(content, container) {
    console.log("Reading content from file");
    container.innerHTML = content;
    this.updateReferencesRecursive(container);
    document.getElementById("CloudTextModel").dispatchEvent(new Event("input"));
    var loadModal = bootstrap.Modal.getInstance(
      document.getElementById("loadModal")
    );
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
    return (
      random() +
      random() +
      "-" +
      random() +
      "-" +
      random() +
      "-" +
      random() +
      "-" +
      random() +
      random() +
      random()
    );
  }

  static changeIndention(document, nodeId, indent) {
    var anchoroffset = document.getSelection().anchorOffset;
    console.log("Changing indention of node " + nodeId);
    const node = document.getElementById(nodeId);
    var newList;
    //const parent = node.parentElement;
    if (indent) {
      const previousNode = node.previousSibling;
      if (previousNode != null) {
        if (previousNode.nodeName.toLowerCase() == "ul") {
          newList = previousNode;
          newList.appendChild(node);
        } else if (
          node.nextSibling != null &&
          node.nextSibling.nodeName.toLowerCase() == "ul"
        ) {
          newList = node.nextSibling;
          newList.prepend(node);
        } else {
          newList = document.createElement("ul");
          newList.appendChild(node);
          previousNode.after(newList);
        }
        nextSibling = node.parentNode.nextSibling;
        if (nextSibling != null && nextSibling.nodeName == "UL") {
          nextSibling.childNodes.forEach((element) => {
            newList.appendChild(element);
          });
          nextSibling.remove();
        }
      }
    } else {
      const parentNode = node.parentNode;
      const parentList = parentNode.parentNode;
      if (parentList.nodeName == "UL") {
        if (node.nextSibling != null && node.previousSibling != null) {
          var nextSibling = node.nextSibling;
          parentNode.after(node);
          newList = document.createElement("ul");
          while (nextSibling != null) {
            var temp = nextSibling;
            newList.appendChild(nextSibling);
            nextSibling = temp.nextSibling;
          }
          node.after(newList);
        } else {
          if (node.nextSibling != null) {
            const itemList = node.parentNode;
            const previousNode = itemList.previousSibling;
            previousNode.after(node);
            if (!itemList.hasChildNodes()) {
              parentList.removeChild(itemList);
            }
          }
          // Last node in list
          else {
            const itemList = node.parentNode;
            const nextNode = itemList.nextSibling;
            if (nextNode != null) {
              nextNode.before(node);
              //skipBackMove = true;
            } else {
              itemList.previousSibling.parentNode.appendChild(node);
            }
            if (!itemList.hasChildNodes()) {
              parentList.removeChild(itemList);
            }
          }
        }
      }
    }
    var selection = document.getSelection();
    if (selection.type == "Caret") {
    anchoroffset++;
    selection.modify("move", "backward", "character");
    if (anchoroffset > 0) {
      for (var i = 0; i < anchoroffset; i++) {
        selection.modify("move", "forward", "character");
      }
    } else {
      selection.modify("move", "backward", "character");
      selection.modify("move", "forward", "character");
    }
  }
  }
}
