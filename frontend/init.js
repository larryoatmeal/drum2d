window.onload = main;

// var socket = io.connect("http://fffe2f02.ngrok.io/");

function main() {
	navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );
	
	renderDrumPad(2);
	lightUpDrumPad(0, 0.25);
	lightUpDrumPad(1, 0.5);
	setTimeout(function(){darkenDrumPad(1)}, 1000);
}

/*
function updateNumPads(numPads) {
	changeNumPads(numPads);
	socket.emit('updateNumPads', numPads);
}
*/

