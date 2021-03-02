// @TODO: YOUR CODE HERE!
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    
    var yLabelWidth = 20;
    var yLabelHeight = svgHeight / 2;

    var xLabelWidth = svgWidth / 2;
    var xLabelHeight = svgHeight -10;
    
    d3.csv('/D3-Challenge/data/data.csv').then(function(healthdata){
        healthdata.forEach(function(data) {
            data.income = +data.income;
            data.obesity = +data.obesity;
            console.log(data.obesity)
        });
        
        var xScale = d3.scaleLinear()
            .domain([d3.min(healthdata, d => d.income)-1000, d3.max(healthdata, d => d.income)])
            .range([0, width]);
        
        var yScale = d3.scaleLinear()
            .domain([d3.min(healthdata, d => d.obesity)-1, d3.max(healthdata, d => d.obesity)])
            .range([height, 0]);

        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale)

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
        
        chartGroup.append("g")
            .call(yAxis)
        
        var circlesGroup = chartGroup.selectAll("circle")
            .data(healthdata)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.income))
            .attr("cy", d => yScale(d.obesity))
            .attr("r", "15")
            .classed("stateCircle", true);
            
        var textgroup =chartGroup.selectAll()
            .data(healthdata)
            .enter()
            .append("text")
            .text(d=>d.abbr)
            .attr("x", d => xScale(d.income))
            .attr("y", d=> yScale(d.obesity) +4)
            .attr("font-size", "10px")
            .classed("stateText", true);
  
        svg.append('g')
            .attr("transform", `translate(${yLabelWidth}, ${yLabelHeight} )`)
            .append("text")
            .attr('text-anchor', 'middle')
            .attr("transform", 'rotate(-90)')
            .attr("font-size", "20px")
            .classed("active", true)
            .text("Obesity (%)");
        
            svg.append('g')
            .attr("transform", `translate(${xLabelWidth}, ${xLabelHeight} )`)
            .append("text")
            .attr('text-anchor', 'middle')
            .attr("font-size", "20px")
            .classed("active", true)
            .text("Income (K)");
    
          // Create toolTip
          var toolTip = d3.tip()
            .attr("class", "d3-tip")
            .offset([40,-80])
            .html(function(d) {
              return (`<strong>${d.state}<hr>Obesity: ${d.obesity}%<br>Healthcare: $${d.income}<strong>`);
            });
           
          chartGroup.call(toolTip);
    
          
          circlesGroup.on("mouseover", function(d) {
            toolTip.show(d, this);
            d3.select(this).style("stroke", "black");
           
          })
            .on("mouseout", function(d) {
              toolTip.hide(d);
              d3.select(this).style("stroke", "white");
            });
  
          textgroup.on("mouseover", function(d) {
            tooltip.show(d, this);
            d3.select(this).style("stroke", "black");
          })
            .on("mouseout", function(d) {
              tooltip.hide(d);
              d3.select(this).style("stroke", "white");
        });
    });
    
};

makeResponsive();
d3.select(window).on("resize", makeResponsive);