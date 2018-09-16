window.onload = main;

function main() {
	navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );
	
	
	renderDrumPad(2);
	/*
	lightUpDrumPad(0, 0.25);
	lightUpDrumPad(1, 0.5);
	setTimeout(function(){darkenDrumPad(1)}, 1000);
	*/

	onHit(hit);
}


function hit(n){
	if (n.hand == "left"){
		lightUpDrumPad(0,n.strength);
		setTimeout(function(){darkenDrumPad(0)}, 100);
	}

	else{
		lightUpDrumPad(1,n.strength);
		setTimeout(function(){darkenDrumPad(1)}, 100);
	}
}

/*
function updateNumPads(numPads) {
	changeNumPads(numPads);
	socket.emit('updateNumPads', numPads);
}
*/

