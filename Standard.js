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

/**
 * Adds a link between two nodes in the given graph.
 *
 * @param {Object} graph - The graph object.
 * @param {(string|number)} source - The name or ID of the source node.
 * @param {(string|number)} target - The name or ID of the target node.
 * @param {boolean} [byNodeId=false] - If true, the `source` and `target` parameters are interpreted as node IDs.
 * @param {number} [weight=0] - Cost of weight, default is 0. 
* @throws {Error} If the source or target node is not found, or if there are multiple nodes with the same name.
 */
function addLink(graph, source, target, weight = 0, byNodeId = false,) {
    // Find the source and target nodes in the graph
    let sourceNode, targetNode;
    if (byNodeId) {
        sourceNode = graph.nodes.find(node => node.id === source);
        targetNode = graph.nodes.find(node => node.id === target);
        if (!sourceNode) throw new Error(`Node with id ${source} does not exist!`);
        if (!targetNode) throw new Error(`Node with id ${target} does not exist!`);
    } else {
        sourceNode = graph.nodes.find(node => node.name === source);
        targetNode = graph.nodes.find(node => node.name === target);

        // Throw an error if the source or target node is not found
        if (!sourceNode) throw new Error(`Node with name ${source} does not exist!`);
        if (!targetNode) throw new Error(`Node with name ${target} does not exist!`);

        // Throw an error if there are multiple nodes with the same name
        const sourceNodes = graph.nodes.filter(node => node.name === source);
        const targetNodes = graph.nodes.filter(node => node.name === target);
        if (sourceNodes.length > 1 || targetNodes.length > 1) {
            throw new Error(`There are multiple nodes with name ${source} or ${target}!`);
        }
    }
    // Create the new link object and add it to the graph
    const newLink = { source: sourceNode, target: targetNode, weight: weight };
    graph.links.push(newLink);
}

/**
 * Returns the number of nodes in the given graph.
 * 
 * @param {Object} graph - The graph object.
 * @returns {number} The number of nodes in the graph.
 */
function numberOfNodes(graph) {
    return graph.nodes.length;
}

/**
 * Returns the number of links in the given graph.
 * 
 * @param {Object} graph - The graph object.
 * @returns {number} The number of links in the graph.
 */
function numberOfLinks(graph) {
    return graph.links.length;
}

/**
 * Creates a deep copy of a graph object.
 * @param {Object} graph - The graph object to copy.
 * @returns {Object} A deep copy of the input graph object.
 */
function copyGraph(graph) {
    // Create a new object to hold the copied properties
    const copy = {};

    // Recursively copy the properties of the graph object
    function copyProperties(obj, copy) {
        for (const key in obj) {
            // Check if the property is an object
            if (typeof obj[key] === 'object') {
                // Create a new object for the property
                copy[key] = Array.isArray(obj[key]) ? [] : {};
                // Recursively copy the properties of the object
                copyProperties(obj[key], copy[key]);
            } else {
                // Copy the property
                copy[key] = obj[key];
            }
        }
    }
    copyProperties(graph, copy);

    return copy;
}


