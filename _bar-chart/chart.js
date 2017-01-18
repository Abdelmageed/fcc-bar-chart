var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
d3.select ("h1")
    .style ("color", "red");
d3.json (dataUrl, function (json) {
            console.log (json.errors)

//    if (json.errors.getOwnPropertyNames ().length !== 1) {
//        showError ();
//        console.log (json.errors)
//        return;
//    }
    var vals = json.data.map (function (point) {
        return point[1];
    })
    drawBarChart (vals);
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
