var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
d3.select("h1")
    .style("color", "red");
d3.json(dataUrl, function (json) {
            console.log (json.errors);

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
    
    var svg = d3.select ('svg'),
        chart = {
        width: +svg.attr ('width') - (margin.right + margin.left),
        height: +svg.attr ('height') - (margin.top + margin.bottom)
    },
        barWidth = chart.width / data.length,
        yScale = d3.scaleLinear ()
            .domain([0, d3.max(data)])
            .rangeRound ([chart.height, 0]);
    
    var yAxis = d3.axisLeft (yScale)
    var c = svg
        .append ('g')
        .attr ('class', 'chart')
        .attr ('width', chart.width)
        .attr ('height', chart.height)
        .attr ('transform', 'translate (' + margin.left + ',' + margin.top + ')')
        .append ('g')
        .attr ('transform', 'translate (' + margin.left * 2 + ',0)')
        .call (yAxis);
    
    var bars = c
        .selectAll ('.bar')
        .data (data)
        .enter ().append ('rect')
        .attr ('width', barWidth)
        .attr ('height', function (d) {
            return chart.height - yScale (d); })
        .attr ('class', 'bar')
//        .attr ('transform', function (d, i) { return 'translate(' + (i * barWidth + margin.left) + ',' + chart.height + ') scale(1,' + '-1)'});
        .attr ('x', function (d, i) { return i * barWidth; })
        .attr ('y', function (d) { return yScale (d)});
        
}