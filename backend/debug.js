
window.onload = () => {
	//debug graphing
	var smoothie = new SmoothieChart();
	smoothie.streamTo(document.getElementById("audiocanvas"));
	var leftSeries = new TimeSeries();
	var rightSeries = new TimeSeries();
	smoothie.addTimeSeries(leftSeries, { strokeStyle:'rgb(255, 0, 0)', fillStyle:'rgba(0, 0, 0, 0)', lineWidth:3 });
	smoothie.addTimeSeries(rightSeries,{ strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 0, 0, 0)', lineWidth:3 });


	var socket = io.connect();

	socket.on('connect', function(data) {
		socket.emit('join', 'Hello World from client');

		socket.on('rawAudio', (data)=>{
			console.log(data);
			leftSeries.append(new Date().getTime(), data[0]);
			rightSeries.append(new Date().getTime(), data[1])

		})
	});

}

