;(function () {
    "use strict";

    /**
     * Working with matrix (or vector).
     * Provides facilities for working with matrix n*m.
     *
     * @constructor
     */
    function Matrix() {
        var value = [];
        var dimension = {
            cols: 0,
            rows: 0
        };

        this.get = function () {
            return value;
        };

        this.addCol = function (column) {
            // TODO: Add column.
            dimension.cols++;
        };

        this.addRow = function (row) {
            if (!Matrix.isVector(row)) {
                throw new TypeError("The matrix row should be a vector");
            }
            if (dimension.cols && row.length !== dimension.cols) {
                throw new RangeError("The matrix row length should be  = " + dimension.cols);
            }

            dimension.rows++;
            if (!dimension.cols) {
                for (var j = 0; j < row.length; j++) {
                    value[j] = [row[j]];
                }
                dimension.cols = j;

                return this;
            }

            for (var i = 0; i < dimension.cols; i++) {
                value[i].push(row[i]);
            }

            return this;
        };

        this.getTransposed = function () {
            // TODO: transpose matrix;
        };

        this.getDimension = function () {
            return dimension;
        };

        this.getDimensionAsString = function () {
            return dimension.cols + "x" + dimension.rows;
        };
    }

    Matrix.create = function (val) {
        if (Matrix.isVector(val)) {
            val = [val];
        } else if (!Matrix.isMatrix(val)) {
            // val = [];
            throw new TypeError("The value is not valid N*M matrix");
        }

        var matrix = new Matrix();
        var cols = val.length;
        for (var i = 0; i < cols; i++) {
            matrix.addRow(val[i]);
        }
    };

    /**
     * Counting sum of matrix (matrix1 + matrix2).
     *
     * @param {Matrix} matrix1 Instances of Matrix.
     * @param {Matrix} matrix2
     *
     * @return {Array}
     *   Result matrix.
     */
    Matrix.sum = function (matrix1, matrix2) {
        // TODO: Count sum.
    };

    /**
     * Counting product of matrix (matrix1 * matrix2).
     *
     * @param {Matrix} matrix1 Instances of Matrix.
     * @param {Matrix} matrix2
     *
     * @return {Array}
     *   Result matrix.
     */
    Matrix.product = function (matrix1, matrix2) {
        // TODO: Count production.
    };

    /**
     * Validate value for valid matrix (Vector or Matrix n*m).
     *
     * @param val Checking value.
     * @returns {boolean}
     *   The validation result.
     */
    Matrix.isMatrix = function (val) {
        if (!Array.isArray(val)) {
            return false;
        }

        var first = val.shift();

        if (!Array.isArray(first)) {
            return Matrix.isVector(val);
        }

        if (!Matrix.isVector(first)) {
            return false;
        }

        var len = first.length;
        for (var i = 0; i < val.length; i++) {
            if (!Matrix.isVector(val[i]) || val[i].length !== len) {
                return false;
            }
        }

        return true;
    };

    /**
     * Validate value for valid Vector.
     *
     * @param val Checking value.
     * @returns {boolean}
     *   The validation result.
     */
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


    // Exporting class (rewrite module.exports);
    if (typeof window === 'undefined') {
        module.exports = Matrix;
    } else {
        window.Matrix = Matrix;
    }

})();
