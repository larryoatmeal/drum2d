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

function lightUpDrumPad(pad_id, hitKeysRatio) {
	const id = "pad" + pad_id.toString();
	var pad = document.getElementById(id);

	var red;
	var green;

	if (hitKeysRatio > 0.25){
		red = (255).toString(16);
		green  = Math.floor((1-hitKeysRatio)*(4/3)*(255)).toString(16);
	}

	else{
		red = Math.floor((hitKeysRatio)*(4)*(255)).toString(16);
		green = (255).toString(16);
	}

	var backgroundAttribute = 'background-color: ' + '#' + red + green + '00';


	pad.setAttribute('style', backgroundAttribute);
}

function darkenDrumPad(pad_id) {
	const id = "pad" + pad_id.toString();
	var pad = document.getElementById(id);
	pad.setAttribute('style', 'background-color: var(--dark_color)');
}


function changeNumPads(numPads) {
	//at some point, add setting active in dropdown menu
	const drumpad = document.getElementById('drumpad');
	drumpad.innerHTML = "";
	renderDrumPad(numPads);
}