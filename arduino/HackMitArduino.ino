/*
  Analog input, analog output, serial output

  Reads an analog input pin, maps the result to a range from 0 to 255 and uses
  the result to set the pulse width modulation (PWM) of an output pin.
  Also prints the results to the Serial Monitor.

  The circuit:
  - potentiometer connected to analog pin 0.
    Center pin of the potentiometer goes to the analog pin.
    side pins of the potentiometer go to +5V and ground
  - LED connected from digital pin 9 to ground

  created 29 Dec. 2008
  modified 9 Apr 2012
  by Tom Igoe

  This example code is in the public domain.

  http://www.arduino.cc/en/Tutorial/AnalogInOutSerial
*/

//#include <math.h>

// These constants won't change. They're used to give names to the pins used:
const int analogInPinR = A0;  // Analog input pin that Right mic is attached to
const int analogInPinL = A1;  // Analog input pin that light mic is attached to

int micRValue = 0;        // value read from right mic
int micLValue = 0;        // value read from right mic
int micRValues[100];     // array of values from right mic, with plenty of extra space if needed
int micLValues[100];     // array of values from left mic
int arrayIndex = 0;
int i = 0;
float rAmp = 0;
float lAmp = 0;


void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
}

void loop() {
  // read the analog in value and  store them in the array:
  
  ++arrayIndex; //increment arrayIndex
  micRValues[arrayIndex] = analogRead(analogInPinR);
  micLValues[arrayIndex] = analogRead(analogInPinL);

  if (arrayIndex > 100) //check there is no overflow
    {Serial.print("Input Overflow (ArrayIndex > 100)");}

  // print the results to the Serial Monitor:
  

  if (micros() % 1000 == 0) //every ms, compute RMS amplitude and send it
  {
    for(i = 0; i <= arrayIndex; i++){
      rAmp += micRValues[arrayIndex]*micRValues[arrayIndex];
      lAmp += micLValues[arrayIndex]*micLValues[arrayIndex];  
   }
    rAmp /= arrayIndex;
    lAmp /= arrayIndex;

    rAmp = sqrt(rAmp);
    lAmp = sqrt(lAmp);
    
    Serial.print("R = ");
    Serial.print(rAmp);
    Serial.print("\tL = ");
    Serial.print(lAmp);
    Serial.print("\n");   

    //reset the index
    arrayIndex = 0;
  }
  
 

  // wait 1 milliseconds before the next loop for the analog-to-digital
  // converter to settle after the last reading:
  delay(1);
}
