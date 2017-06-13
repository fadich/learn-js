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

        this.get = function (row, col) {
            var gettingRow = row !== undefined && row !== null;
            var gettingCol = col !== undefined && col !== null;

            if (gettingRow && gettingCol) {
                return value[col][row];
            }

            if (gettingRow) {
                return this.getRow(row);
            }

            if (gettingCol) {
                return this.getCol(col);
            }

            return value;
        };

        this.addCol = function (column) {
            if (!Matrix.isVector(column)) {
                throw new TypeError("The matrix column should be a vector");
            }
            if (dimension.rows && column.length !== dimension.rows) {
                throw new RangeError("The matrix column length should be = " + dimension.rows);
            }

            dimension.cols++;
            if (!dimension.rows) {
                for (var j = 0; j < column.length; j++) {
                    value[j] = [column[j]];
                }
                dimension.rows = j;

                return this;
            }

            for (var i = 0; i < dimension.rows; i++) {
                value[i].push(column[i]);
            }

            return this;
        };

        this.addRow = function (row) {
            if (!Matrix.isVector(row)) {
                throw new TypeError("The matrix row should be a vector");
            }
            if (dimension.cols && row.length !== dimension.cols) {
                throw new RangeError("The matrix row length should be = " + dimension.cols);
            }

            value.push(row);
            dimension.rows++;
            dimension.cols = row.length;

            return this;
        };

        this.getCol = function (num) {
            // Default number of getting column is 0;
            num = num || 0;
            if (num >= dimension.cols) {
                return undefined;
            }

            var col = [];
            for (var i = 0; i < dimension.rows; i++) {
                col.push(value[i][num]);
            }

            return col;
        };

        this.getRow = function (num) {
            // Default number of getting row is 0;
            num = num || 0;

            return value[num];
        };

        this.getTransposed = function () {
            var transposed = [];

            for (var i = 0; i < dimension.cols; i++) {
                transposed.push(this.getCol(i));
            }

            // if (dimension.rows === 1) {
            //     transposed = [transposed];
            // }

            return transposed;
        };

        this.getDimension = function () {
            return dimension;
        };

        this.getDimensionAsString = function () {
            return dimension.cols + "x" + dimension.rows;
        };

        this.clear = function () {
            value = [];
            dimension.rows = 0;
            dimension.cols = 0;

            return this;
        };

        this.toString = function () {
            var str = [];

            for (var i = 0; i < value.length; i++) {
                str.push(value[i].join(' '));
            }

            return "| " + str.join(" |\n| ") + " |";
        };
    }

    Matrix.create = function (val) {
        if (!arguments.length) {
            val = [];
        }
        if (Matrix.isVector(val)) {
            val = [val];
        } else if (!Matrix.isMatrix(val)) {
            // val = [];
            // throw new TypeError("The value is not valid N*M matrix");
            return undefined;
        }

        var matrix = new Matrix();
        var cols = val.length;
        for (var i = 0; i < cols; i++) {
            if (val[i].length) {
                matrix.addRow(val[i]);
            }
        }

        return matrix;
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

        var first = val[0];

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
