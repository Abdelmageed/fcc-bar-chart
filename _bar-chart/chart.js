var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
d3.select("h1")
    .style("color", "red");
d3.json(dataUrl, function (json) {

    if (!json.data || json.data.length === 0) {
        showError();
        return;
    }
    var vals = json.data.map(function (point) {
        return point[1];
    })
    drawSvgBarChart(json.data);
})

function showError() {
    d3.select('body').append('div')
        .text('Data could not be loaded from server');
}

function drawSvgBarChart(data) {

    var timeRange = {
        start: parseDate(data[0][0]),
        end: parseDate(data[data.length - 1][0])
    };
    console.log (timeRange);
    
    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }

    var svg = d3.select('svg'),
        chart = {
            width: +svg.attr('width') - (margin.right + margin.left),
            height: +svg.attr('height') - (margin.top + margin.bottom)
        };
    var barWidth = chart.width / data.length;
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d[1];
        })])
        .rangeRound([chart.height, 0]),
        xScale = d3.scaleTime()
        .domain([timeRange.start, timeRange.end])
//        .timeYears (timeRange.start, timeRange.end)
        .rangeRound([0, chart.width]);
//        .ticks (d3.timeYear.every(1));

    var yAxis = d3.axisLeft(yScale),
        xAxis = d3.axisBottom(xScale)
                .ticks (d3.timeYear.every (4));

    var tip = d3.tip().html(function (d) {
        var date = parseDate (d[0]);
        var dateStr = `${monthNames[date.getMonth()]},  ${date.getFullYear()}`
        return `<div class="tooltip">
                    <p><strong>GDP: </strong>${d[1]}</p>
                    <p><strong>${dateStr}</strong></p>
                </div>`
    })
    var c = svg
        .append('g')
        .attr('class', 'chart')
        .attr('width', chart.width)
        .attr('height', chart.height)
        .attr('transform', 'translate (' + margin.left + ',' + margin.top + ')');
    c
        .append('g')
        .attr('class', 'axis y--axis')
        .call(yAxis);
    c
        .append('g')
        .attr ('transform', 'translate (0,' + chart.height + ')')
        .attr ('class', 'axis x--axis')
        .call(xAxis);

    c
        .append('g')
        .attr('opacity', '1')
        .append('text')
        .attr('class', 'text title')
        .text('USA Quarterly GDP in USD Billion')
        .style('fill', 'black')
        .attr('x', chart.width / 2)
        .attr('text-anchor', 'middle');
    c
        .call (tip);
    
    var bars = c
        .selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('width', barWidth)
        .attr('height', function (d) {
            return chart.height - yScale(d[1]);
        })
        .attr('class', 'bar')
        .attr('x', function (d, i) {
            return i * barWidth;
        })
        .attr('y', function (d) {
            return yScale(d[1])
        })
        .on ('mouseover', function (data, target) {
            d3.select(this).classed('hovered', true);
            tip.show(data, target);
        })
        .on ('mouseout', function (data, target) {
            d3.select(this).classed('hovered', false);
            tip.hide(data, target);
        })

}

function parseDate(dateString) {
    var date = dateString.split('-');
    return new Date(date[0], date[1], date[2]);
}