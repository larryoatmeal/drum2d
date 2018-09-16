let scratching = false;

$(document).mousemove(detectScratch);

function detectScratch(event) {
	// create an array of mouse coords over 100 ms
	let coords = [];

	$(document).mousemove(addCoords)

	function addCoords(e) {
		coords.push({x: e.pageX, y: e.pageY})
	}

	setTimeout(() => {
		let is_scratch = checkMotion(coords);
		if (is_scratch && !scratching) {
			scratching = true;
			createScratch();
		}
		if (!is_scratch) {
			scratching = false;
		}
	}, 100)
}

function checkMotion(coords) {
	// mouse should not have moved more than 100 px horzontally
	// mouse should have moved more than 150 px vertically
	let all_x = coords.map((coord) => coord.x);
	let all_y = coords.map((coord) => coord.y);

	let x_diff = Math.max(...all_x) - Math.min(...all_x);
	let y_diff = Math.max(...all_y) - Math.min(...all_y);

	if (y_diff > 150 && x_diff < 100) {
		return true;
	} else {
		return false;
	}
}

function createScratch() {
	// play random record scratch
	console.log("scratch scratch!");

	// call play_random_scratch for {filename, duration}

	let duration_of_wav = 5000; // random_scratch.duration 

	let timer = setTimeout(() => {
		scratching = false
	}, duration_of_wav);

	var audio = new Audio("random_scratch.wav");
	audio.play();

	while (true) {
		if (scratching == false) {
			fadeoutAudio(audio);
			clearTimeout(timer);
			return;
		}
	}
}

function fadeoutAudio(audio) {
	var vol = audio.volume;

	// fades out in 100ms
	var fadeout = setInterval(
		function() {
		    if (vol > 0) {
		      	vol -= vol/10;
		      	audio.volume = Math.max(0, vol);
		    }
		    else {
		      	// Stop the setInterval when 0 is reached
		      	clearInterval(fadeout);
		    }
		}, 10);
}