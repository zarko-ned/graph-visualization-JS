function getNodeDegree(graph, node) {
    let degree = 0;

    for (const link of graph.links) {
        if (link.source === node || link.target === node) {
            degree++;
        }
    }

    return degree;
}

function findNeighbors(graph, node) {
    const neighbors = [];

    for (const link of graph.links) {
        if (link.source === node) {
            neighbors.push(link.target);
        } else if (link.target === node) {
            neighbors.push(link.source);
        }
    }

    return neighbors;
}
