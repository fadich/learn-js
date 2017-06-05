$(function () {
    var socket = io();
    var gen = new Generator();
    var clientHash = gen.random.string(64);

    socket.emit('hello', clientHash);

    socket.on('log', function(log) {
        if (log.for === clientHash) {
            $('body').append($('<li class="r-log">').append(log.msg));
        }
    });

    $('.r-run button').on('click', function () {
        var runPanel = $(this).closest('.r-run');

        // Starting algorithm.
        runPanel.hide();
        $('.r-log').remove();
        socket.emit('start', clientHash);
        socket.on('start', function(res) {
            // On finish of algorithm.
            if (res.for === clientHash) {
                runPanel.show();
            }
        });
    });
});

function closeItem(listId) {
    var $list = $('#item-list-' + listId);
    $list.toggleClass('r-hidden');
}

/**
 * Generator class.
 *
 * @constructor
 */
function Generator() {
    /**
     * Random generator.
     *
     * @type {Random}
     */
    this.random = new (function Random() {
        this.string = function (len) {
            len = len || 10;

            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i = 0; i < len; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
    })();
}

