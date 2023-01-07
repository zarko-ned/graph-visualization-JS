/**
 * Creates an object representing a graph, with an array of nodes and an array of edges.
 * 
 * @returns {Object} The graph object.
 */
function createGraph() {
    // Create the graph object with the nodes and edges properties
    const graph = {
        nodes: [],
        links: []
    };
    // Create the graph object with the nodes and edges properties
    Object.seal(graph);
    return graph;
}



/**
 * Adds a node to the given graph.
 * 
 * @param {Object} graph - The graph object.
 * @param {string} nodeName - The name of the node to add.
 * @param {number} [nodeId] - The optional ID of the node. If not provided, the ID will be set to the maximum existing ID + 1.
 * @param {number} [size=3] - The optional size of the node. Default is 3.
 */
function addNode(graph, nodeName, nodeId, size = 3) {
    let newNode;
    if (typeof nodeId === 'undefined') {
        // Set the node ID to the maximum existing ID + 1 if no ID is provided
        const maxId = graph.nodes.length ? Math.max(...graph.nodes.map(node => node.id)) : 0;
        nodeId = maxId + 1;
        newNode = { id: nodeId, name: nodeName, size: size };
    } else {
        // Throw an error if a node with the same ID already exists
        if (graph.nodes.some(node => node.id === nodeId)) {
            throw new Error(`Node with id ${nodeId} already exists`);
        } else {
            newNode = { id: nodeId, name: nodeName, size: size };
        }
    }
    graph.nodes.push(newNode);
}

function addLink(graph, source, target) {
    let foundSource;
    let foundTarget;


    if (!graph.nodes.some(node => node.name === source))
        throw new Error(`Node with name ${source} does not exists!`);
    if (!graph.nodes.some(node => node.name === target))
        throw new Error(`Node with name ${target} does not exists!`);

    graph.nodes.forEach(function (e) {
        if (e.name === source)
            foundSource += 1;
        if (e.name === target)
            foundTarget += 1;
    })

    if (foundSource > 1 || foundTarget > 1) {
        throw new Error(`There are more nodes with same name!`);
    }
    let newLink = { source: source, target: target };
    graph.links.push(newLink);
}

function numberOfNodes(graph) {
    return graph.nodes.length;
}

function numberOfLinks(graph) {
    return graph.links.length;
}