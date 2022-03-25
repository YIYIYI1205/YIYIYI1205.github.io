function wideTraversal(node) {
  let nodes = [],
    i = 0;
  while (node != null) {
    nodes.push(node);
    node = nodes[i++];
    let childrens = node.children;
    for (let i = 0; i < childrens.length; i++) {
      nodes.push(childrens[i]);
    }
  }
  return nodes;
}
