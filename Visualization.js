/**
 * Returns a force simulation for the given graph.
 * 
 * @param {Object} graph - The graph object.
 * @returns {Object} The force simulation.
 */
function forceSimulation(graph, linkLength = 50) {
    // Create the force link and force many body forces
    const forceLink = d3
        .forceLink()
        .id(d => d.name)
        .links(graph.links)
        .distance(linkLength);
    const forceManyBody = d3.forceManyBody().strength(-30);

    // Create the force simulation and add the forces
    const simulation = d3
        .forceSimulation(graph.nodes)
        .force("link", forceLink)
        .force("charge", forceManyBody)
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Add a tick event to update the link and node positions
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        node.select("text")
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    return simulation;
}

/**
 * Appends a line element for each link in the given graph to the SVG.
 * 
 * @param {Object} graph - The graph object.
 * @param {string} cssColor - The CSS color of the lines.
 * @param {number} lineWidth - The width of the lines (optional).
 * @returns {Object} The line elements.
 */
function simulationLink(graph, cssColor = 'orange', lineWidth) {
    // Append the line elements to the SVG
    const line = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .style("stroke", cssColor)
        .attr("stroke-width", d => lineWidth === undefined ? getLineWidth(d.weight) : lineWidth)
        .attr("marker-end", "url(#arrow)");

    return line;

    function getLineWidth(weight) {
        if (weight < 10) {
            return 1;
        } else if (weight >= 10 && weight < 20) {
            return 5;
        } else if (weight >= 20 && weight < 30) {
            return 9;
        } else {
            return 12;
        }
    }
}


/**
 * Appends a circle element for each node in the given graph to the SVG.
 * 
 * @param {Object} graph - The graph object.
 * @param {string} cssColor - The CSS color of the circles.
 * @returns {Object} The circle elements.
 */
function simulationNode(graph, cssColor = 'red') {
    // Append the circle elements to the SVG
    const node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", d => d.size)
        .attr("fill", cssColor)
        .call(
            d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );


    graph.nodes.forEach(node => node.color = cssColor);

    node.on("click", function (d) {
       clickedNode(d);
    })

    return node;
}


/**
 * Appends a circle and a text element for each node in the given graph to the SVG.
 * 
 * @param {Object} graph - The graph object.
 * @returns {Object} The group elements containing the circle and text elements.
 */
function showNodeName(graph) {
    // Append the group elements to the SVG
    const nodeGroup = svg
        .selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(
            d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );

    // Append the circle elements to the group elements
    nodeGroup
        .append("circle")
        .attr("r", 5);

    // Append the text elements to the group elements
    const nodeLabel = nodeGroup
        .append("text")
        .attr("dy", -3)
        .text(d => d.name);

    return nodeGroup;
}
function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
} function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

/**
 * Changes the size of all nodes in the given graph.
 * 
 * @param {Object} graph - The graph object.
 * @param {number} size - The new size for the nodes.
 */
function changeNodesSize(graph, size) {
    // Iterate over the nodes in the graph
    for (const node of graph.nodes) {
        node.size = size;
    }
}

/**
 * Changes the size of a node in the given graph.
 *
 * @param {Object} graph - The graph object.
 * @param {(string|number)} nodeName - The name or ID of the node whose size should be changed.
 * @param {number} size - The new size for the node.
 * @param {boolean} [byNodeId=false] - If true, the `nodeName` parameter is interpreted as a node ID.
 * @throws {Error} If the node is not found, or if there are multiple nodes with the same name.
 */
function changeNodeSize(graph, nodeName, size, byNodeId = false) {
    if (byNodeId) {
        const node = graph.nodes.find(node => node.id === nodeName);
        if (!node) throw new Error(`Node with id ${nodeName} does not exist!`);
        else {
            node.size = size
        }
    } else {
        const node = graph.nodes.find(node => node.name === nodeName);
        if (!node) throw new Error(`Node with name ${nodeName} does not exist!`);
        else {
            node.size = size
        }
    }
}

/**
 * Changes the color of a node with a specific name or ID in the given graph.
 * @param {Object} graph - The graph object.
 * @param {string|number} nodeNameOrId - The name or ID of the node to change the color of.
 * @param {string} cssColor - The CSS color to set the node to.
 * @param {boolean} byNodeId - Whether to search for the node by its ID or name.
 */
function changeNodeColor(graph, nodeNameOrId, cssColor, byNodeId = false) {
    const node = byNodeId
        ? graph.nodes.find(node => node.id == nodeNameOrId)
        : graph.nodes.find(node => node.name == nodeNameOrId);
    if (!node) throw new Error(`Node with ${byNodeId ? 'id' : 'name'} ${nodeNameOrId} does not exist!`);

    // Select the node with the given name or ID and set its fill color
    svg.selectAll(".nodes")
        .selectAll("circle")
        .filter(d => d[byNodeId ? 'id' : 'name'] == nodeNameOrId)
        .attr("fill", cssColor);
    node.color = cssColor;
}

/**
 * Change the color of a node in a graph for a specified amount of time.
 * @param {Object} graph - The graph containing the node. The graph should be represented as an object with a `nodes` property which is an array of nodes.
 * @param {string|number} nodeNameOrId - The name or ID of the node to change the color of.
 * @param {string} cssColor - The new color to set the node to, in the format of a CSS color string.
 * @param {number} miliseconds - The amount of time to keep the node in the new color, in miliseconds.
 * @param {boolean} [byNodeId=false] - A flag to indicate whether to search for the node by its name or its ID.
 */
function changeNodeColorTime(graph, nodeNameOrId, cssColor, miliseconds, byNodeId = false) {
    setTimeout(() => {
        // Retrieve the node from the graph
        const node = byNodeId
            ? graph.nodes.find(node => node.id == nodeNameOrId)
            : graph.nodes.find(node => node.name == nodeNameOrId);
        node.color = cssColor;
        if (!node) throw new Error(`Node with ${byNodeId ? 'id' : 'name'} ${nodeNameOrId} does not exist!`);
        // record the original color
        let originalColor = svg.selectAll(".nodes")
            .selectAll("circle")
            .filter(d => d[byNodeId ? 'id' : 'name'] == nodeNameOrId)
            .attr("fill");
        // Select the node with the given name or ID and set its fill color
        svg.selectAll(".nodes")
            .selectAll("circle")
            .filter(d => d[byNodeId ? 'id' : 'name'] == nodeNameOrId)
            .attr("fill", cssColor);

        // Schedule the function to change the color back to the original color after 2 seconds
        setTimeout(() => {
            svg.selectAll(".nodes")
                .selectAll("circle")
                .filter(d => d[byNodeId ? 'id' : 'name'] == nodeNameOrId)
                .attr("fill", originalColor);
        }, miliseconds);
    }, miliseconds);
}

/**
 * Creates an arrow marker definition for an SVG element.
 * @param {Object} svg - The SVG element.
 */
function directedGraph(svg) {
    const defs = svg.append('defs');

    defs.append('marker')
        .attr('id', 'arrow')
        .attr('markerWidth', 10)
        .attr('markerHeight', 10)
        .attr('refX', 9)
        .attr('refY', 3)
        .attr('orient', 'auto')
        .attr('markerUnits', 'strokeWidth')
        .append('path')
        .attr('d', 'M0,0 L0,6 L9,3 z')
        .attr('fill', '#999');
}


function clickedNode(data){
  alert('Node name: '+data.name +'\n'+'Node ID: '+ data.id);
}