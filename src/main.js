$(function () {
    var socket = io();
    $('form').submit(function(){
        socket.emit('message', $('input[name="message"]').val());
        $('input[name="message"]').val('');
        return false;
    });

    socket.on('message', function(msg){
        if (msg.for === "everyone") {
            $('body').append($('<li>').text(msg.msg));
        }
    });
});