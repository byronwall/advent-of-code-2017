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

  node.name = name;
  node.weight = parseFloat(name_weight[1].trim().replace(/[()]/, ""));

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

var root_node = "";

parent_nodes.forEach(parent => {
  if (child_nodes.indexOf(parent) == -1) {
    root_node = parent;
  }
});

// that gives the root, now traverse the tree

console.log(nodes[root_node]);

// go depth first to determine weight of all children

var targetWeight = weightOfChildren(root_node);

function weightOfChildren(nodeName) {
  // get the node
  var node = nodes[nodeName];

  if (node.children !== undefined) {
    var sum = 0;
    var weights = [];

    node.children.forEach(child => {
      var childWeight = weightOfChildren(child);

      sum += childWeight;
      weights.push(childWeight);
    });

    for (let i = 0; i < weights.length; i++) {
      const element = weights[i];

      // this log will give the info needed to spot the error

      if (element != weights[0]) {
        console.log(
          nodeName,
          "mismatch",
          weights,
          node.children,
          node.children.map(chile => nodes[chile].weight)
        );
        break;
      }
    }

    return sum + node.weight;
  } else {
    return node.weight;
  }
}
