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

    
    d3.csv('/D3-Challenge/data/data.csv').then(function(healthdata){
        healthdata.forEach(function(data) {
            data.income = +data.income;
            data.obesity = +data.obesity;
            console.log(data.obesity)
        });
        
        var xScale = d3.scaleLinear()
            .domain(d3.extent(healthdata, d => d.income))
            .range([0, width]);
        
        var yScale = d3.scaleLinear()
            .domain(d3.extent(healthdata, d => d.obesity))
            .range([height, 0]);

        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale)

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
        
        chartGroup.append("g")
            .call(yAxis)
   
    })
    
};

makeResponsive();
d3.select(window).on("resize", makeResponsive);