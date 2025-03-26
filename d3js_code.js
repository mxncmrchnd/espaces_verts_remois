const tooltip = d3.select("#graph").append("div").attr("class", "tooltip");
const margin = { top: 10, right: 20, bottom: 200, left: 60 },
    width = 1400 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
const svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
const x = d3
    .scaleBand()
    .domain(data.map((d) => d.NOM_IRIS).sort())
    .range([0, width])
    .padding(0.1);
const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.veg_surface + d.iris_surface)])
    .nice()
    .range([height, 0]);
const color = d3.scaleOrdinal().domain(["veg_surface", "iris_surface_vg"]).range(["#005a32", "#00608f"]);
const stack = d3.stack().keys(["veg_surface", "iris_surface_vg"]);
const stackedData = stack(data);
svg.selectAll(".layer")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("class", "layer")
    .attr("fill", (d) => color(d.key))
    .selectAll("rect")
    .data((d) => d)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.data.NOM_IRIS))
    .attr("y", (d) => y(d[1]))
    .attr("height", (d) => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())
    .on("mouseover", function (event, d) {
        tooltip.transition().duration(50).style("opacity", 0.9); // Rendre le tooltip visible
        tooltip
            .html(
                `${d.data.NOM_IRIS}<br>Surface végétalisée (en ha): ${d.data.veg_surface}<br>Surface totale (en ha) : ${d.data.iris_surface}`
            )
            .style("left", event.pageX + 5 + "px") // Positionner à côté du curseur
            .style("top", event.pageY - 28 + "px");
    })
    // Ajouter un événement de sortie pour masquer le tooltip
    .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0); // Masquer le tooltip
    });
svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

svg.append("g").attr("class", "axis y-axis").call(d3.axisLeft(y));
console.log("d3js");
