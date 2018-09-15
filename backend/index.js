const rx = require('rxjs')
const op = require('rxjs/operators')
const express = require('express');
const Readline = require('@serialport/parser-readline')

var SerialPort = require('serialport');
const app = express();
// var server = require('http').createServer(app);  



app.use(express.static(__dirname));  

const port = 9000;
const server = app.listen(port, () => {
  console.log('Hello world ' + port);
});


const io = require('socket.io')(server);


// var io = require('socket.io')(http);

const serialPortName = '/dev/tty.usbmodem1411';
const baudRate = 9600;

var serialPort = new SerialPort(serialPortName, {
	baudRate: baudRate,
    // parser: SerialPort.parsers.readline("\n")
});		


app.get('/', (req, res)=>{
	console.log("HELLO WORlD");
	res.send(res.sendFile('index.html'));
})

var $serialPort = setupSerial(serialPort.pipe(new Readline()));

function setupSerial(serialPort){
	// Switches the port into "flowing mode"

	var subject = new rx.Subject();

	serialPort.on('data', function (data) {
	    // console.log('Data:', data);
	    subject.next(data);
	});

	return subject;

	// Read data that is available but keep the stream from entering //"flowing mode"
	// serialPort.on('readable', function () {
	//     console.log('Data:', port.read());
	//   	subject.next(data);

	// });	
}

$rawAudio = $serialPort.pipe(
	op.skip(5), //skip first few
	// op.tap(console.log),
	op.map(str =>  {
		split = str.split('\t');
		// console.log("SPLIT")
		// console.log(split)
		left = split[0]
		right = split[1]
		// left = left.substring(4, left.length);//number starts on 4th character
		// right = right.substring(4, right.length);
		return [parseInt(left), parseInt(right)]
	}),
)





$output = $rawAudio.pipe(
	// op.throttleTime(1),
	op.map(data => ({
		"key": "rawAudio",
		"value": data
	}))
);

// $serialPort.subscribe(console.log)
// $output = rx.interval(1000).pipe(
// 	op.map(i => ({
// 		"key": "rawAudio",
// 		"value": [i, i]
// 	}))
// );

// $output = $serialPort

// .pipe(
// 	op.map(data => ({
// 		"key": "rawAudio",
// 		"value": data
// 	}))
// );

var clients = {};

$status = rx.interval(5000).pipe().subscribe(() => {

	console.log("CLIENTS", Object.keys(clients));
});




io.on('connection', function(client) {  
	console.log('Client connected...');

	clients[client.id] = client;

	var $unsubscribe = new rx.Subject();
	client.on('disconnect', function() {
		console.log("DISCONNECTING");
		$unsubscribe.next('disconnect');
		// clients.set(client.id] = null;
		delete clients[client.id];
	})

	client.on('join', function(data) {
    	// console.log(data);
        client.emit('messages', 'Hello from server, streaming data now');

        $output.pipe(op.takeUntil($unsubscribe)).subscribe(data => {
        	if(data.key && data.value){
	        	client.emit(data.key, data.value);
        	}else{
        		console.log("Data not formatted correctly");
        	}
        });
	})
});







