let scratching = false;

$(document).mousemove(detectScratch);

function detectScratch(event) {
	let coords = [];

	$(document).mousemove(addCoords)

	function addCoords(e) {
		coords.push({x: e.pageX, y: e.pageY})
	}

	setTimeout(() => checkMotion(coords), 100)
}

function checkMotion(coords) {
	let all_x = coords.map((coord) => coord.x);
	let all_y = coords.map((coord) => coord.y);

	let x_diff = Math.max(...all_x) - Math.min(...all_x);
	let y_diff = Math.max(...all_y) - Math.min(...all_y);

	if (y_diff > 150 && x_diff < 100) {
		if (!scratching) {
			scratching = true;
			createScratch();
		}
	}
}

function createScratch() {
	setTimeout(() => {
		console.log("scratch scratch!");
		scratching = false
	}, 5000);
}

