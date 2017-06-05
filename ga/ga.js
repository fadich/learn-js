'use strict';

module.exports = GA;

function GA(func, popSize) {
    popSize = popSize || 100;

    this.population = [];

    this.initPopulation = function() {
        // Getting min/max range.
        var min = func.min || 0;
        var max = func.max || 1;
        var i = 0;

        while (i < popSize) {
            // Generating random x/y (x1/x2) values.
            var x = +(Math.random() * (max - min) + min).toFixed(5);
            var y = +(Math.random() * (max - min) + min).toFixed(5);
            var individ = {
                x: x,
                y: y,
                z: null,
                toString: function () {
                    return "X: " + this.x + "; Y: " + this.y + "; Z: " + this.z;
                }
            };

            individ.z = func(x, y);
            this.population[i] = individ;
            i++;
        }
    };
};
