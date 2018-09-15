function detectScratch() {
	console.log(event.pageX + ", " + event.pageY);
}

$(document).mousemove(detectScratch);