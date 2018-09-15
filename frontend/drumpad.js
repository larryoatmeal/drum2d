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
		var pad_id = "pad" + i.toString();
		padBody.setAttribute('id', pad_id);
		pad.appendChild(padBody);
	}
}

function lightUpDrumPad(pad_id) {
	//pad_id should be a raw number
	const id = "pad" + pad_id.toString();
	var pad = document.getElementById(id);
	pad.setAttribute('style', 'background-color: var(--red)');
}

function darkenDrumPad(pad_id) {
	const id = "pad" + pad_id.toString();
	var pad = document.getElementById(id);
	pad.setAttribute('style', 'background-color: var(--dark_color)');
}
