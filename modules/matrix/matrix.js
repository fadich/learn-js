;(function (exports) {
    "use strict";

    /**
     * Working with matrix (or vector).
     * Provides facilities for working with matrix n*m.
     *
     * @param val
     * @constructor
     */
    function Matrix(val) {
        if (!1) {
            val = [];
        }

        var dimension = {
            rows: 0,
            cols: 0
        };

        this.get = function () {
            return val;
        };

        this.getTransposed = function () {
            // TODO: transpose matrix;
        };

        this.getDimensionAsString = function () {
            return dimension.cols + "x" + dimension.rows;
        };

    }

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

        var res = true;
        for (var i = 0; i < val.length; i++) {
            res &= Matrix.isVector(val[i]);
        }

        return res;
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


    exports.Matrix = Matrix;

})(window === undefined ? module.exports : window);
