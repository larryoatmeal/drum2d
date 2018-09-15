function main() {
	renderDrumPad(4);
}

function renderDrumPad(num_boxes) {
	const drumpad = document.getElementById('drumpad');
	const drumpadSpan = document.createElement('div');
	drumpadSpan.className = "row align-items-center";
	drumpad.appendChild(drumpadSpan);

	for (var i = 0; i < num_boxes; i++) { 
		const pad = document.createElement('div');
		pad.className = "col";
		drumpadSpan.appendChild(pad);

		const padBody = document.createElement('div');
		padBody.className = "card";
		padBody.innerHTML = 'HI';
		pad.appendChild(padBody);
	}
}



main();