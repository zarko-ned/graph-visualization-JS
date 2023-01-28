/**
 * Perform a breadth-first search on a graph.
 * @param {Object} graph - The graph to search. The graph should be represented as an object with a nodes property which is an array of nodes and a links property which is an array of links.
 * @param {Object} startNode - The node to start the search from. The node should be represented as an object with a name or id property.
 * @param {Function} visitFn - A function that will be called on each node visited by the search. The function should take a single parameter, which will be the current node.
 */
function bfs(graph, startNode, visitFn) {
  function findNeighbors(graph, nodeName, byNodeId) {
    const neighbors = [];

    for (const link of graph.links) {
      if (byNodeId) {
        const node = graph.nodes.find(node => node.id === nodeName);
        if (!node) throw new Error(`Node with id ${nodeName} does not exist!`);
        else if (link.source.id === nodeName) {
          neighbors.push(link.target);
        }
        else if (link.target.id === nodeName) {
          neighbors.push(link.source);
        }
      } else {
        const node = graph.nodes.find(node => node.name === nodeName);
        if (!node) throw new Error(`Node with name ${nodeName} does not exist!`);
        else if (link.source.name === nodeName) {
          neighbors.push(link.target);
        }
        else if (link.target.name === nodeName) {
          neighbors.push(link.source);
        }
      }
    }

    return neighbors;
  }
  // Create a queue for storing the nodes to visit
  const queue = [];
  // Create a set for storing the visited nodes
  const visited = new Set();

  // Add the start node to the queue
  queue.push(startNode);
  visited.add(startNode);

  // While the queue is not empty
  while (queue.length > 0) {
    // Dequeue the first node from the queue
    let currentNode = queue.shift();

    // Call the visit function on the node
    visitFn(currentNode);

    // Get the neighbors of the current node

    if (typeof currentNode === 'object')
      currentNode = currentNode.name;
    const neighbors = findNeighbors(graph, currentNode);

    // For each neighbor of the current node
    for (const neighbor of neighbors) {
      // If the neighbor has not been visited
      if (!visited.has(neighbor)) {
        // Add the neighbor to the queue
        queue.push(neighbor);
        visited.add(neighbor);
      }
    }
  }
}

/**
 * Perform a depth-first search on a graph.
 * @param {Object} graph - The graph to search. The graph should be represented as an object with a nodes property which is an array of nodes and a links property which is an array of links.
 * @param {Object} startNode - The node to start the search from. The node should be represented as an object with a name or id property.
 * @param {Function} visitFn - A function that will be called on each node visited by the search. The function should take a single parameter, which will be the current node.
 */
function dfs(graph, startNode, visitFn) {
  function findNeighbors(graph, nodeName, byNodeId) {
    const neighbors = [];

    for (const link of graph.links) {
      if (byNodeId) {
        const node = graph.nodes.find(node => node.id === nodeName);
        if (!node) throw new Error(`Node with id ${nodeName} does not exist!`);
        else if (link.source.id === nodeName) {
          neighbors.push(link.target);
        }
        else if (link.target.id === nodeName) {
          neighbors.push(link.source);
        }
      } else {
        const node = graph.nodes.find(node => node.name === nodeName);
        if (!node) throw new Error(`Node with name ${nodeName} does not exist!`);
        else if (link.source.name === nodeName) {
          neighbors.push(link.target);
        }
        else if (link.target.name === nodeName) {
          neighbors.push(link.source);
        }
      }
    }

    return neighbors;
  }
  // Create a stack for storing the nodes to visit
  const stack = [];
  // Create a set for storing the visited nodes
  const visited = new Set();

  // Add the start node to the stack
  stack.push(startNode);
  visited.add(startNode);

  // While the stack is not empty
  while (stack.length > 0) {
    // Pop the top node from the stack
    let currentNode = stack.pop();

    // Call the visit function on the node
    visitFn(currentNode);

    // Get the neighbors of the current node
    if (typeof currentNode === 'object')
      currentNode = currentNode.name;
    const neighbors = findNeighbors(graph, currentNode);

    // For each neighbor of the current node
    for (const neighbor of neighbors) {
      // If the neighbor has not been visited
      if (!visited.has(neighbor)) {
        // Add the neighbor to the stack
        stack.push(neighbor);
        visited.add(neighbor);
      }
    }
  }
}

function findSimilarNodeGroups(graph, metric) {
  function findNeighbors(graph, nodeName, byNodeId) {
    const neighbors = [];

    for (const link of graph.links) {
      if (byNodeId) {
        const node = graph.nodes.find(node => node.id === nodeName);
        if (!node) throw new Error(`Node with id ${nodeName} does not exist!`);
        else if (link.source.id === nodeName) {
          neighbors.push(link.target);
        }
        else if (link.target.id === nodeName) {
          neighbors.push(link.source);
        }
      } else {
        const node = graph.nodes.find(node => node.name === nodeName);
        if (!node) throw new Error(`Node with name ${nodeName} does not exist!`);
        else if (link.source.name === nodeName) {
          neighbors.push(link.target);
        }
        else if (link.target.name === nodeName) {
          neighbors.push(link.source);
        }
      }
    }

    return neighbors;
  }
  const groups = [];
  const visited = new Set();

  for (const node of graph.nodes) {
    if (!visited.has(node)) {
      const group = [node];
      visited.add(node);
      const queue = [...findNeighbors(graph, node.name)];

      while (queue.length) {
        const currentNode = queue.shift();
        if (!visited.has(currentNode)) {
          visited.add(currentNode);
          if (metric(node, currentNode)) {
            group.push(currentNode);
            queue.push(...findNeighbors(graph, currentNode.name));
          }
        }
      }
      groups.push(group);
    }
  }
  return groups;
}
