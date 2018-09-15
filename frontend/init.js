window.onload = main;

var socket = io.connect("http://fffe2f02.ngrok.io/");

function main() {
	

	socket.on('connect', function(data) {
		socket.emit('join', 'Hello World from client');
	});

	socket.on('messages', function(data) {
                alert(data);
        });

	socket.on(/*this is the event for which pad to light up*/'padnum', function(data) {
		lightUpDrumPad(data);
		setTimeout(function(){darkenDrumPad(data)}, 200);
	});

	
	renderDrumPad(4);
	lightUpDrumPad(1);
	lightUpDrumPad(2);
	setTimeout(function(){darkenDrumPad(1)}, 200);
	setTimeout(function(){changeNumPads(3)}, 1000);

}

function updateNumPads(numPads) {
	changeNumPads(numPads);
	socket.emit('updateNumPads', numPads);
}


function startCalibration() {

}


function calibrate

