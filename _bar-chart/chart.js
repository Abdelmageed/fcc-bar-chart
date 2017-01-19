var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
d3.select ("h1")
    .style ("color", "red");
d3.json (dataUrl, function (json) {
            console.log (json.errors)

    if (!json.data || json.data.length === 0) {
        showError ();
        return;
    }
    var vals = json.data.map (function (point) {
        return point[1];
    })
    drawSvgBarChart (vals);
})

function drawBarChart (data) {
    var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 420]);
    
    d3.select ("body").append ('div')
        .attr ('id', 'chart');
    console.log (document.getElementById ('chart'))
    d3.select ('#chart')
        .selectAll ('div')
        .data (data)
        .enter ().append ('div')
            .attr ('class', 'bar')
            .style ("width", function(d) { return x (d) + "px"; })
            .text(function(d) { return d; });
}

function showError () {    
        d3.select ('body').append ('div')
            .text ('Data could not be loaded from server');
}

function drawSvgBarChart (data) {
   
    
    var chart = {
        width: 800,
        height: 500
    },
        barWidth = chart.width / data.length,
        x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, chart.height]);
    
    d3.select ('body')
        .append ('svg')
        .attr ('class', 'chart')
        .attr ('width', chart.width)
        .attr ('height', chart.height);
    
    var bars = d3.select ('.chart')
        .selectAll ('g')
        .data (data)
        .enter ().append ('g')
        .attr ('class', 'bar')
        .attr ('transform', function (d, i) { return 'translate(' + i * barWidth + ',' + chart.height + ') scale(1,' + '-1)'});
        
    bars.append ('rect')
        .attr ('width', barWidth)
        .attr ('height', x);
}