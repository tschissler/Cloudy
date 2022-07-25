declare global {
  namespace NodeJS {
    interface Global {
       document: Document;
       window: Window;
       navigator: Navigator;
    } 
  }
}

export default class Editor
{       
    public keyPressEventHandler(e: KeyboardEvent) {
        if (e.key.toLowerCase() == "tab" )
        {
            var selection = document.getSelection();
            var range = selection.getRangeAt(0);
            var currentListItem = range.startContainer as HTMLElement;
            if (currentListItem.nodeName.toLowerCase() == '#text') {
                currentListItem = currentListItem.parentNode as HTMLElement;
            }

            new Editor().changeIndention(document, currentListItem.id, !e.shiftKey);
            e.preventDefault();
        }
    }

    public keyUpEventHandler(e: KeyboardEvent) {
        if (e.key.toLowerCase() == "enter") {
            var selection = document.getSelection();
            var range = selection.getRangeAt(0);
            var currentListItem = range.startContainer as HTMLElement;
            if (currentListItem.nodeName.toLowerCase() == '#text') {
                currentListItem = currentListItem.parentNode as HTMLElement;
            }

            currentListItem.id = new Editor().createGUID();
        }
    }

    public save(doc: string) {
        const a = globalThis.document.createElement("a");
        a.href = "data:text/plain;charset=utf-8," + doc;
        a.download = "cloud.html";
        globalThis.document.body.appendChild(a);
        a.click();
    }

    public load(content: string, container: HTMLElement) {
        console.log("Writing content");
        container.innerHTML = content;
    }

    public createGUID() {
        function random() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
    return random() + random() + '-' + random() + '-' + random() + '-' +
      random() + '-' + random() + random() + random();
  }

    public changeIndention(document: Document, nodeId: string, indent: boolean) {
        const node = document.getElementById(nodeId);
        var newList;
        //const parent = node.parentElement;
        
        if (indent) {
            const previousNode = node.previousSibling;
            if (previousNode != null) {
                if (previousNode.nodeName.toLowerCase() == 'ul') {
                    newList = previousNode;
                    newList.appendChild(node);
                }
                else if (node.nextSibling != null && node.nextSibling.nodeName.toLowerCase() == 'ul') {
                    newList = node.nextSibling;
                    newList.prepend(node);
                }
                else {
                    newList = document.createElement("ul");
                    newList.appendChild(node);
                    previousNode.after(newList)
                }
                
                nextSibling = node.parentNode.nextSibling as HTMLElement;
                if (nextSibling != null && nextSibling.nodeName == 'UL') {
                    nextSibling.childNodes.forEach(element => {
                        newList.appendChild(element);
                    });
                    nextSibling.remove();
                }
            }
        }
        else {
            const parentNode = node.parentNode as HTMLElement;
            const parentList = parentNode.parentNode;
            
            if (parentList.nodeName == "UL")  {
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
                }
                else {
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
                        }
                        else {
                            itemList.previousSibling.after(node);
                        }
                        if (!itemList.hasChildNodes()) {
                            parentList.removeChild(itemList);
                        }
                    }
                }
            }
        }
    }
}