// used the d3 library to plot a world map and highlight the country entered
// source 1: https://www.d3-graph-gallery.com/graph/backgroundmap_basic.html
// source 2: https://stackoverflow.com/questions/49340596/d3-js-maps-change-the-color-of-the-paths-one-after-another

// used the countdown library to create a countdown until the trip

import * as d3g from 'd3-geo-projection';
import * as d3 from 'd3v4';
import countdown from 'countdown';

// The svg
let svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
let projection = d3g.geoNaturalEarth2()
    .scale(width / 1.3 / Math.PI)
    .translate([width / 2, height / 2]);

const SubmitButton = document.getElementById("submit");

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA//world.geojson", function(data){

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#fff");

    // when user makes selections, highlight country on map
    SubmitButton.addEventListener("click", () => {
        let country = document.getElementById("country").value;
        d3.selectAll("path")
            .filter(function(d) { return country.indexOf(d.properties.name) > -1 })
            .attr("fill","#e14b4b");
    });
})


// function to calculate the time until the trip
function getTimeDiff() {
    const DateInput = document.getElementById("date");
    const TimeInput = document.getElementById("time");
    const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;

    const depDate = DateInput.valueAsNumber;
    const depTime = TimeInput.valueAsNumber;
    const fullDate = depDate + depTime + timezoneOffset;

    document.getElementById("countdown").textContent =  "Countdown to Departure: " + countdown(fullDate).toString();
}

// execute function when button is clicked & every 1 second thereafter
SubmitButton.addEventListener("click", getTimeDiff);
SubmitButton.addEventListener("click", () => {
    setInterval(getTimeDiff, 1000)});


