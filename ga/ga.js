'use strict';

module.exports = GA;

/**
 * GenAlg.
 *
 * @param {Object} func Objective function (is a callback with min/max range properties).
 * @param {Number} popSize Population size.
 * @constructor
 */
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

    this.avgFitness = function () {
        var avg = 0;
        var popSize = this.population.length;

        for (var i = 0; i < popSize; i++) {
            avg += this.population[i].z;
        }

        return +(avg / popSize).toFixed(5);
    };

    this.crossover = function (avgFitness) {
        avgFitness = avgFitness || Infinity;

        for (var i = +(Math.random() * (this.population.length - 1)).toFixed(); i > 0; i--) {
            // Getting parents numbers.
            var parents = {father: 0, mother: 0};
            while (!parents.father) {
                var father = +(Math.random() * (this.population.length - 1)).toFixed();
                if (this.population[father].z <= avgFitness) {
                    parents.father = father;
                }
            }
            while (!parents.mother) {
                var mother = +(Math.random() * (this.population.length - 1)).toFixed();
                if (this.population[mother].z <= avgFitness && mother != parents.father) {
                    parents.mother = mother;
                }
            }
            var child = {
                x: this.population[parents.father].x,
                y: this.population[parents.mother].y,
                z: null,
                toString: function () {
                    return "X: " + this.x + "; Y: " + this.y + "; Z: " + this.z;
                }
            };
            child.z = func(child.x, child.y);
        }

        this.population.push(child)
    };

    this.selection = function() {
        var selected = [];
        // Sorting population bu fitness.
        this.sortPopulation();

        for (var i = 0; i < popSize; i++) {
            selected[i] = this.population[i];
        }
        this.population = selected;
    }

    this.sortPopulation = function() {
        // Using selection sort.
        var len = this.population.length;
        for (var i = 0; i < len - 1; i++) {
            var min = i;
            for (var j = i + 1; j < len; j++) {
                if (this.population[j].z < this.population[i].z) {
                    min = j;
                }
            }
            // Swap the elements.
            var tmp = this.population[i];
            this.population[i] = this.population[min];
            this.population[min] = tmp;
        }
    }
};
