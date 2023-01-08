/**
 * Returns a force simulation for the given graph.
 * 
 * @param {Object} graph - The graph object.
 * @returns {Object} The force simulation.
 */
function forceSimulation(graph) {
    // Create the force link and force many body forces
    const forceLink = d3
      .forceLink()
      .id(d => d.name)
      .links(graph.links);
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
 * @param {number} lineWidth - The width of the lines.
 * @returns {Object} The line elements.
 */
function simulationLink(graph, cssColor = 'orange', lineWidth = 3) {
    // Append the line elements to the SVG
    const line = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line")
      .style("stroke", cssColor)
      .attr("stroke-width", d => lineWidth);
  
    return line;
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

function changeNodeSize(graph, nodeName, size, byNodeId = false){
    if(byNodeId){
        const node = graph.nodes.find(node => node.id === nodeName);
        if (!node) throw new Error(`Node with id ${nodeName} does not exist!`);
        else{
            node.size = size
        }
    } else{
        const node = graph.nodes.find(node => node.name === nodeName);
        if (!node) throw new Error(`Node with name ${nodeName} does not exist!`);
        else{
            node.size = size
        }
    }
}
