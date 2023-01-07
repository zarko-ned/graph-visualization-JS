/**
 * Returns the degree (number of connections) of the given node in the given graph.
 * 
 * @param {Object} graph - The graph object.
 * @param {string|number} nodeName - The name or ID of the node.
 * @param {boolean} [byNodeId=false] - If true, the `nodeName` parameter is interpreted as the node ID.
 * @returns {number} The degree of the node.
 */
function getNodeDegree(graph, nodeName, byNodeId = false) {
    let degree = 0;
    for (const link of graph.links) {
        if (byNodeId) {
            const node = graph.nodes.find(node => node.id === nodeName);
            if (!node) throw new Error(`Node with id ${nodeName} does not exist!`);
            else if (link.source.id == nodeName || link.target.source == nodeName) {
                degree++;
            }
        } else {
            const node = graph.nodes.find(node => node.id === nodeName);
            if (!node) throw new Error(`Node with name ${nodeName} does not exist!`);
            else if (link.source === nodeName || link.target === nodeName) {
                degree++;
            }
        }
    }
    return degree;
}

/**
 * Returns an array of the neighbors (adjacent nodes) of the given node in the given graph.
 * 
 * @param {Object} graph - The graph object.
 * @param {string|number} nodeName - The name or ID of the node.
 * @param {boolean} [byNodeId=false] - If true, the `nodeName` parameter is interpreted as the node ID.
 * @returns {Nodes[]} The array of neighbor .
 */
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
