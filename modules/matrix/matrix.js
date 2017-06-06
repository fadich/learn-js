"use strict";


module.exports = Matrix;

function Matrix(val) {
    if (!1) {
        val = [];
    }

    var dimension = [];

    this.get = function () {
        return val;
    };

    this.getTransposed = function () {
        // TODO: transpose matrix;
    };

    this.getDimensionAsString = function () {

    };

}

/**
 * Counting sum of matrix (1, 2, ... , n).
 *
 * @param {Object} matrix1 Instances of Matrix.
 * @param {Object} matrix2
 * @param {Object} matrixN
 *
 * @return {Object} Instance of Matrix.
 */
Matrix.sum = function (matrix1, matrix2, matrixN) {
    for (var i = 0; i < arguments.length; i++) {
        // TODO: Count sum.
    }
};

Matrix.product = function (matrix1, matrix2, matrixN) {
    for (var i = 0; i < arguments.length; i++) {
        // TODO: Count production.
    }
};


Matrix.isMatrix = function (val) {
    if (!Array.isArray(val)) {
        return false;
    }

    var first = val.shift();

    if (!Array.isArray(first)) {
        return Matrix.isVector(val);
    }


};

Matrix.isVector = function (val) {
    if (!Array.isArray(val)) {
        return false;
    }

    for (var i = 0; i < val.length; i++) {
        if (Array.isArray(val[i])) {
            return false;
        }
    }

    return true;
};

