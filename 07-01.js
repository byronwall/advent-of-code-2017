var input = document.getElementsByTagName("pre")[0].innerHTML.trim();

// get lines

var lines = input.split("\n"); //.slice(0, 10);

var nodes = {};

var child_nodes = [];
var parent_nodes = [];

lines.forEach(line => {
  var parts = line.split("-&gt;");

  // process the node
  var name_weight = parts[0].split(" ");

  var name = name_weight[0];

  var node = {};

  // this needs parsed
  var weigt = name_weight[1];

  if (parts.length > 1) {
    // has some children
    var children = parts[1].split(",").map(child => {
      return child.trim();
    });

    children.forEach(child => {
      child_nodes.push(child);
    });

    parent_nodes.push(name);

    node.children = children;
  }

  nodes[name] = node;
});

// find the possible root node

parent_nodes.forEach(parent => {
  if (child_nodes.indexOf(parent) == -1) {
    throw "answer? " + parent;
  }
});

console.log(nodes);
