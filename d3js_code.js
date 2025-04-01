//graphe 1
const tooltip1 = d3.select("#graph1").append("div").attr("class", "tooltip");
const margin = { top: 40, right: 20, bottom: 200, left: 60 },
    width = 1400 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
const svg1 = d3
    .select("#graph1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
const x1 = d3
    .scaleBand()
    .domain(data.map((d) => d.NOM_IRIS))
    .range([0, width])
    .padding(0.1);
const y1 = d3
    .scaleLinear()
    .domain([0, 30])
    .nice()
    .range([height, 0]);
const color1 = d3.scaleOrdinal().domain(["veg_surface", "iris_surface_vg"]).range(["#00608f", "rgba(255, 255, 255, 0)"]);
const stack1 = d3.stack().keys(["veg_surface", "iris_surface_vg"]);
const stackedData1 = stack1(data);
svg1.selectAll(".layer")
    .data(stackedData1)
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
        tooltip1.transition().duration(50).style("opacity", 0.9); // Rendre le tooltip visible
        tooltip1.html(
                `${d.data.NOM_IRIS}<br>Pourcentage de survage végétalisée: ${d.data.veg_surface}%<br>Surface totale (en ha) : ${d.data.iris_surface}`
            )
            .style("left", event.pageX + 5 + "px") // Positionner à côté du curseur
            .style("top", event.pageY - 28 + "px");
    })
    // Ajouter un événement de sortie pour masquer le tooltip
    .on("mouseout", function () {
        tooltip1.transition().duration(500).style("opacity", 0); // Masquer le tooltip
    });
svg1.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

svg1.append("g").attr("class", "axis y-axis").call(d3.axisLeft(y));

//graphe 2
const tooltip2 = d3.select("#graph2").append("div").attr("class", "tooltip");
const svg2 = d3
    .select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
const x2 = d3
    .scaleBand()
    .domain(data.map((d) => d.NOM_IRIS).sort())
    .range([0, width])
    .padding(0.1);
const y2 = d3
    .scaleLinear()
    .domain([0, 30])
    .nice()
    .range([height, 0]);
const color2 = d3.scaleOrdinal().domain(["veg_surface", "iris_surface_vg"]).range(["#00608f", "rgba(255, 255, 255, 0)"]);
const stack2 = d3.stack().keys(["veg_surface", "iris_surface_vg"]);
const stackedData2 = stack2(data);
svg2.selectAll(".layer")
    .data(stackedData2)
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
    .attr("width", x2.bandwidth())
    .on("mouseover", function (event, d) {
        tooltip2.transition().duration(50).style("opacity", 0.9); // Rendre le tooltip visible
        tooltip2.html(
                `${d.data.NOM_IRIS}<br>Pourcentage de survage végétalisée: ${d.data.veg_surface}%<br>Surface totale (en ha) : ${d.data.iris_surface}`
            )
            .style("left", event.pageX + 5 + "px") // Positionner à côté du curseur
            .style("top", event.pageY - 28 + "px");
    })
    // Ajouter un événement de sortie pour masquer le tooltip
    .on("mouseout", function () {
        tooltip2.transition().duration(500).style("opacity", 0); // Masquer le tooltip
    });
svg2.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

svg2.append("g").attr("class", "axis y-axis").call(d3.axisLeft(y));
