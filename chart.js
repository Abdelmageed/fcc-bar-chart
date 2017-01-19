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

function showError () {    
        d3.select ('body').append ('div')
            .text ('Data could not be loaded from server');
}

function drawSvgBarChart (data) {
   
    var margin = {
        top: 20, right: 20, bottom: 30, left: 20
    }
    
    var chart = {
        width: 800 - (margin.right + margin.left),
        height: 500 - (margin.top + margin.bottom)
    },
        barWidth = chart.width / data.length,
        yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .rangeRound ([0, chart.height]),
    
        yScaleInv = d3.scaleLinear()
            .domain ([0, d3.max(data)])
            .rangeRound ([chart.height, 0]);
    
    var yAxis = d3.axisLeft (yScaleInv)
    
    d3.select ('body')
        .append ('svg')
        .attr ('class', 'chart')
        .attr ('width', chart.width)
        .attr ('height', chart.height)
        .attr ('transform', 'translate (' + margin.left + ',' + margin.top + ')')
        .append ('g')
        .attr ('transform', 'translate (' + margin.left * 2 + ',0)')
        .call (yAxis);
    
    var bars = d3.select ('.chart')
        .selectAll ('g')
        .data (data)
        .enter ().append ('g')
        .attr ('class', 'bar')
        .attr ('transform', function (d, i) { return 'translate(' + (i * barWidth + margin.left) + ',' + chart.height + ') scale(1,' + '-1)'});
        
    bars.append ('rect')
        .attr ('width', barWidth)
        .attr ('height', yScale);
}