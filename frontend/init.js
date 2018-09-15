window.onload = main;

function main() {
	var socket = io.connect("http://fffe2f02.ngrok.io/");

	socket.on('connect', function(data) {
		socket.emit('join', 'Hello World from client');
	});

	socket.on('messages', function(data) {
                alert(data);
        });

	
	renderDrumPad(4);
	lightUpDrumPad(1);
	lightUpDrumPad(2);
	setTimeout(function(){darkenDrumPad(1)}, 1000);

}

