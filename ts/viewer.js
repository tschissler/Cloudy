// import * as Springy from '../js/springy.js';
// import * as SpringyUi from '../js/springyui.js';
// declare global {
//   namespace NodeJS {
//     interface Global {
//        document: Document;
//        window: Window;
//        navigator: Navigator;
//     } 
//   }
// }
// export default class Viewer {
//     private graph = new Springy.Graph();
//     constructor() {
//         globalThis.document.getElementById('cloudCanvas').springy({
//             graph: this.graph,
//             //nodeSelected: this.nodeSelected.bind(this),
//         })
//     }
// public renderCloud(data: HTMLElement){
//     console.log("Rerendering Cloud");
//     this.graph.clear();
//     new Viewer().renderRecursive(data, true);
//     //addReferencesRecursive(data);
// }
// public renderRecursive(dataItem: ChildNode, isRoot: boolean){
//     if (isRoot) {
//         var newNode = new Springy.Node(dataItem.id, {label:dataItem.textContent, color: '#00A0B0', font: "32px Arial, sans-serif"});
//         this.graph.addNode(newNode);        
//     }
//     else {
//         var newNode = new Springy.Node(dataItem.id, {label:dataItem.textContent, dataItem: dataItem});
//         this.graph.addNode(newNode);
//     }
//     if (dataItem.childNodes){
//     dataItem.childNodes.forEach(element => {
//         this.renderRecursive(element, false);
//         this.graph.addEdges([dataItem.id, element.id, {color: '#00A0B0'}]);
//         });
//     }
// }
//}
//# sourceMappingURL=viewer.js.map