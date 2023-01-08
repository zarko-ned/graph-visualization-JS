/**
 * Returns an array of connected components in the given graph.
 * A connected component is a group of nodes that are all connected to each other.
 *
 * @param {Object} graph - The graph object.
 * @returns {Object[][]} An array of connected components, where each connected component
 *                      is an array of node objects.
 */
function connectedComponents(graph) {
  // Create adjacency list representation of the graph
  let adjList = {};
  for (let node of graph.nodes) {
    adjList[node.id] = [];
  }
  for (let link of graph.links) {
    adjList[link.source.id].push(link.target.id);
    adjList[link.target.id].push(link.source.id);
  }

  // Keep track of visited nodes
  let visited = {};
  for (let node of graph.nodes) {
    visited[node.id] = false;
  }

  let cc = [];
  for (let node of graph.nodes) {
    if (!visited[node.id]) {
      let component = [];
      dfs(node.id, component);
      cc.push(component);
    }
  }

  return cc;

  function dfs(node, component) {
    visited[node] = true;
    let nodeObject = getNodeById(graph, node);
    component.push(nodeObject);
    for (let neighbor of adjList[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor, component);
      }
    }
  }
}

/**
 * Returns the number of connected components in the given graph.
 *
 * @param {Object} graph - The graph object.
 * @returns {number} The number of connected components.
 */
function numberOfConnectedComponents(graph) {
  // Create an adjacency list representation of the graph.
  let adjList = {};
  for (let node of graph.nodes) {
    adjList[node.id] = [];
  }
  for (let link of graph.links) {
    adjList[link.source.id].push(link.target.id);
    adjList[link.target.id].push(link.source.id);
  }

  // Keep track of visited nodes
  let visited = {};
  for (let node of graph.nodes) {
    visited[node.id] = false;
  }

  let componentCount = 0;
  for (let node of graph.nodes) {
    if (!visited[node.id]) {
      componentCount++;
      dfs(node.id);
    }
  }

  return componentCount;

  function dfs(node) {
    visited[node] = true;
    for (let neighbor of adjList[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }
}

function getNodeById(graph, id) {
  const node = graph.nodes.find(node => node.id == id);
  if (!node) throw new Error(`Node with id ${id} does not exist!`);
  return node;
}
