'use strict';

// Init GA.
// function objective(x, y) {
//     var z = 20 + Math.pow(x, 2) + Math.pow(y, 2) -
//         10 * Math.cos(2 * Math.PI * x) - 10 * Math.cos(2 * Math.PI * y);
//     return +z.toFixed(5);
// }
function objective(x, y) {
    var z = Math.pow(x, 2) + Math.pow(y, 2);
    return +z.toFixed(5);
}
objective.min = -5.12;
objective.max = 5.12;

var ga = new (require('./ga'))(objective, 100);

module.exports = run;


// Run the algorithm.
/**
 * Running GA.
 *
 * @param io
 * @param clientHash
 * @param {Object} stop Stopping condition (example, {iterations: 10, time: 10000, value: 15});
 */
function run(io, clientHash, stop) {
    var listId = 0;
    var startTime = +new Date();

    stop = typeof stop === 'Object'? stop : {};
    stop.iterations = stop.iterations || 100;
    stop.time = stop.time || null;
    stop.value = stop.value || null;

    io.emit('log', { msg: "Running the algorithm...", for: clientHash });

    ga.initPopulation();
    io.emit('log', {
        msg: getArrayList(ga.population, ++listId, "The initialized population: "),
        for: clientHash
    });

    for (var i = 0; i < stop.iterations; i++) {
        var fitness = ga.avgFitness();
        io.emit('log', {msg: "Average fitness: " + fitness, for: clientHash});
        io.emit('log', {
            msg: getArrayList(ga.population, ++listId, "Crossover... Population: "),
            for: clientHash
        });
        ga.crossover(fitness);
        ga.selection();
        io.emit('log', {
            msg: getArrayList(ga.population, ++listId, "Selected population: "),
            for: clientHash
        });
    }

    io.emit('start', { for: clientHash });
}


/*** Help functions ***/

function getArrayList(array, listId, title) {
    var res = title;
    res += "<span class='r-close-list' data-list-id='" + listId +
        "' onclick='closeItem(" + listId + ")'>&nbsp;~&nbsp;</span>";
    res += "<ul class='r-hidden' id='item-list-"+ listId +"'>";
    for (var i = 0; i < array.length; i++) {
        res += "<li>" + (i + 1) + ") " + array[i] + "</li>";
    }
    res += "</ul>";

    return res;
}
