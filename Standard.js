function createGraph() {
    const graph = {
        nodes: [],
        links: []
    };
    Object.seal(graph); //new properties cannot be added to it and existing properties cannot be deleted or reconfigured.
    return graph;
}

function addNode(graph, node) {
    let newNode = { name: node };
    graph.nodes.push(newNode);
}

function addLink(graph, source, target) {
    let newLink = { source: source, target: target };
    graph.links.push(newLink);
}

function numberOfNodes(graph) {
    return graph.nodes.length;
}

function numberOfLinks(graph) {
    return graph.links.length;
}