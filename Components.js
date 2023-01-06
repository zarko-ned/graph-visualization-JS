
function connectedComponents(graph) {
  // Create adjacency list representation of the graph
  let adjList = {};
  for (let node of graph.nodes) {
    adjList[node.name] = [];
  }
  for (let link of graph.links) {
    adjList[link.source].push(link.target);
    adjList[link.target].push(link.source);
  }

  // Keep track of visited nodes
  let visited = {};
  for (let node of graph.nodes) {
    visited[node.name] = false;
  }

  let cc = [];
  for (let node of graph.nodes) {
    if (!visited[node.name]) {
      let component = [];
      dfs(node.name, component);
      cc.push(component);
    }
  }

  return cc;

  function dfs(node, component) {
    visited[node] = true;
    component.push(node);
    for (let neighbor of adjList[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor, component);
      }
    }
  }
}

function numberOfConnectedComponents(graph) {
  // Create adjacency list representation of the graph
  let adjList = {};
  for (let node of graph.nodes) {
    adjList[node.name] = [];
  }
  for (let link of graph.links) {
    adjList[link.source].push(link.target);
    adjList[link.target].push(link.source);
  }

  // Keep track of visited nodes
  let visited = {};
  for (let node of graph.nodes) {
    visited[node.name] = false;
  }

  let cc = 0;
  for (let node of graph.nodes) {
    if (!visited[node.name]) {
      cc++;
      dfs(node.name);
    }
  }

  return cc;

  function dfs(node) {
    visited[node] = true;
    for (let neighbor of adjList[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }
}


function simulation(){
 
}