function createGraph() {
    const graph = {
        nodes: [],
        links: []
    };
    Object.seal(graph); //new properties cannot be added to it and existing properties cannot be deleted or reconfigured.
    return graph;
}

function addNode(graph, nodeName, nodeId, size = 3) {
    let newNode;
    if (typeof nodeId === 'undefined') {
        if (graph.nodes.length)
            nodeId = Math.max(...graph.nodes) + 1;
        else nodeId = 0

        newNode = { id: nodeId, name: nodeName, size:size };
    } else {
        if (graph.nodes.includes(nodeId)) {
            throw new Error('Node with id ${nodeId} already exists');
        } else
            newNode = { id: nodeId, name: nodeName, size:size };
    }

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