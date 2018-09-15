const express = require('express');
var SerialPort = require('serialport');

const app = express();

const port = 9000;
app.listen(port, () => {
  console.log('Hello world ' + port);
});


const serialPortName = '/dev/ttyACM0';
const baudRate = 9600;

var serialPort = new SerialPort(serialPortName, {
	baudRate: baudRate,
}, () => {
	console.log("Could not open serial port");
	process.exit();
});		


setupSerial(serialPort);

function setupSerial(serialPort){
	// Switches the port into "flowing mode"
	serialPort.on('data', function (data) {
	    console.log('Data:', data);
	});
	// Read data that is available but keep the stream from entering //"flowing mode"
	serialPort.on('readable', function () {
	    console.log('Data:', port.read());
	});	
}



