var midi = null;  // global MIDIAccess object

function onMIDISuccess( midiAccess ) {
  console.log( "MIDI ready!" );
  midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

//navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );



function sendMidiMessage( midiAccess, portID, note, velocity, releaseVelocity = 64) {
    var noteOnMessage = [0x90, note, velocity];    //[0x90, 60, 0x7f] = note on, middle C, full velocity 
    var output = midiAccess.outputs.get(portID);
    output.send( noteOnMessage );  //omitting the timestamp means send immediately.
    output.send( [0x80, 60, releaseVelocity], window.performance.now() + 1000.0 ); // Inlined array creation- note off, middle C,  
                                                                        // release velocity = 64 (0x40), timestamp = now + 1000ms.
  }