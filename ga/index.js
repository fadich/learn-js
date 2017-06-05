'use strict';

// Init GA.
function objective(x, y) {
    var z = 20 + Math.pow(x, 2) + Math.pow(y, 2) -
        10 * Math.cos(2 * Math.PI * x) - 10 * Math.cos(2 * Math.PI * y);
    return +z.toFixed(5);
}
objective.min = -5.12;
objective.max = 5.12;

var ga = new (require('./ga'))(objective, 100);

module.exports = run;


// Run the algorithm.
function run(io, clientHash) {
    var listId = 0;

    io.emit('log', { msg: "Running the algorithm...", for: clientHash });

    ga.initPopulation();
    io.emit('log', {
        msg: getPopulationList(ga.population, listId++, "The initialized population: "),
        for: clientHash
    });

    io.emit('log', { msg: "Running the algorithm...", for: clientHash });

    io.emit('start', { for: clientHash });
}


/*** Help functions ***/

function getPopulationList(population, listId, title) {
    var res = title;
    res += "<span class='r-close-list' data-list-id='" + listId + "' onclick='closeItem()'>&nbsp;~&nbsp;</span>";
    res += "<ul class='r-hidden' id='item-list-"+ listId +"'>";
    for (var i = 0; i < population.length; i++) {
        res += "<li>" + (i + 1) + ") " + population[i] + "</li>";
    }
    res += "</ul>";

    return res;
}
