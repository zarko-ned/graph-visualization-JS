/**
 * Finds a link between two nodes in the given graph.
 *
 * @param {Object} graph - The graph object.
 * @param {(string|number)} source - The name or ID of the source node.
 * @param {(string|number)} target - The name or ID of the target node.
 * @param {boolean} [byNodeId=false] - If true, the `source` and `target` parameters are interpreted as node IDs.
 * @returns {(Object|undefined)} The link object if it is found, or `undefined` if it is not found.
 * @throws {Error} If the source or target node is not found.
 */
function findLink(graph, source, target, byNodeId = false) {
    let sourceNode, targetNode;
    if (byNodeId) {
        sourceNode = graph.nodes.find(node => node.id === source);
        targetNode = graph.nodes.find(node => node.id === target);
    } else {
        sourceNode = graph.nodes.find(node => node.name === source);
        targetNode = graph.nodes.find(node => node.name === target);
    }
    if (!sourceNode) throw new Error(`Node with id or name ${source} does not exist!`);
    if (!targetNode) throw new Error(`Node with id or name ${target} does not exist!`);

    return graph.links.find(
        link => link.source === sourceNode && link.target === targetNode
    );
}
