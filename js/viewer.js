var fontsize = 16;
var zoom = 1;
var springy;
var previoslySelectedTreeNode;

$("#CloudTextModel").on("input", function () {
  refreshCloud();
});

$("#btnConnect").on("click", function () {
  startConnect();
});

$("#btnFontSmaller").on("click", function () {
  fontsize--;
  refreshCloud();
});
$("#btnFontBigger").on("click", function () {
  fontsize++;
  refreshCloud();
});

$("#btnZoomIn").on("click", function () {
  zoom += 0.5;
  resizeCanvas();
});
$("#btnZoomOut").on("click", function () {
  zoom -= 0.5;
  resizeCanvas();
});
// $("#btnTest").on("click", function () {
//   graph.selectedNode = { node: graph.nodes[0] };
//   $("springy").selected = { node: graph.nodes[0] };

//   springy.renderer.start();
// });

const connectionMode = {
  Off: "Off",
  SelectStartPoint: "SelectStartPoint",
  SelectEndPoint: "SelectEndPoint",
};

Object.freeze(connectionMode);
var connMode = connectionMode.Off;
var connectionStartNode;

var graph = new Springy.Graph();
jQuery(function () {
  springy = jQuery("#cloudCanvas").springy({
    graph: graph,
    nodeSelected: selectedNode,
    stiffness: 100,
    repulsion: 800,
    minEnergyThreshold: 0.0001,
    damping: 0.7,
  });
});

(function () {
  window.addEventListener("resize", resizeCanvas, false);
  resizeCanvas();
})();

function resizeCanvas(width) {
  var canvas = document.getElementById("cloudCanvas");
  if (width == null) {
    canvas.width = $("#canvasDiv").width() * zoom; /* window.innerWidth or another container width */
  } else {
    canvas.width = window.innerWidth;
  }
  canvas.height = $("#canvasDiv").height() * zoom; /* window.innerHeight or another container height */

  console.log("Resized canvas to " + canvas.width + "x" + canvas.height);
}

function startConnect() {
  connMode = connectionMode.SelectStartPoint;
  document.getElementById("messageField").innerText = "Starting connection mode, please select start node";
}

function selectedNode(node) {
  console.log("Node " + node.data.label + " selected");
  if (connMode === connectionMode.SelectEndPoint) {
    document.getElementById("messageField").innerText = "Endpoint selected, drawing connection";
    connMode = connectionMode.Off;
    graph.newEdge(connectionStartNode, node, { color: "#00A0F0" });
    connectionStartNode.data.dataItem.references.push(node.data.dataItem.id);
    connectionStartNode.data.dataItem.slot = connectionStartNode.data.dataItem.references.toString();
  }

  if (connMode === connectionMode.SelectStartPoint) {
    document.getElementById("messageField").innerText = "Startpoint selected. Now select the endpoint";
    connectionStartNode = node;
    connMode = connectionMode.SelectEndPoint;
  }

  if (connMode == connectionMode.Off) {
    if (previoslySelectedTreeNode != null) {
      previoslySelectedTreeNode.style.backgroundColor = "rgb(240, 242, 255)";
    }
    const selectedTreeNode = document.getElementById(node.id);
    selectedTreeNode.style.backgroundColor = "#ffffe0";
    selectedTreeNode.scrollIntoView();
    previoslySelectedTreeNode = selectedTreeNode;
  }
}

refreshCloud();

function refreshCloud() {
  var data = $("#CloudTextModel").children()[0];
  graph.clear();
  renderRecursive(data, true);
  renderReferencesRecursive(data);
}

function renderRecursive(dataItem, isRoot, parent) {
  if (dataItem.children) {
    for (var i = 0; i < dataItem.children.length; i++) {
      var child = dataItem.children[i];
      if (child.nodeName == "LI") {
        if (isRoot) {
          var newNode = new Springy.Node(child.id, {
            label: child.firstChild.nodeValue.trim(),
            color: "#00A0B0",
            font: "32px Arial, sans-serif",
          });
          graph.addNode(newNode);
        } else {
          if (child.references == null) {
            child.references = [];
          }
          var newNode = new Springy.Node(child.id, {
            label: child.firstChild.nodeValue.trim(),
            font: fontsize + "px Arial, sans-serif",
            dataItem: child,
          });
          graph.addNode(newNode);
          // var parent = child.parentElement.previousSibling;
          // while (parent.nodeName != "LI" && parent.previousSibling != null) {
          //   parent = parent.previousSibling;
          // }
          graph.addEdges([parent.id, child.id, { color: "#00A0B0" }]);
        }
        renderRecursive(child, false, child);
      }
      if (child.nodeName == "UL") {
        renderRecursive(child, false, parent);
      }
    }
  }
}

function renderReferencesRecursive(dataItem) {
  if (dataItem.children) {
    for (var i = 0; i < dataItem.children.length; i++) {
      var child = dataItem.children[i];
      if (child.references != null) {
        child.references.forEach((element) => {
          graph.addEdges([child.id, element, { color: "#00A0F0" }]);
        });
      }
      renderReferencesRecursive(child);
    }
  }
}

(function () {
  var canvas = document.getElementById("cloudCanvas");
  window.addEventListener("resize", resizeCanvas, false);
  resizeCanvas();

  function resizeCanvas() {
    canvas.width = $("#canvasDiv").width(); /* window.innerWidth or another container width */
    canvas.height = $("#canvasDiv").height(); /* window.innerHeight or another container height */
  }
})();
