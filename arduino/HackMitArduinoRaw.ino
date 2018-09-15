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

// These constants won't change. They're used to give names to the pins used:
const int analogInPinR = A0;  // Analog input pin that Right mic is attached to
const int analogInPinL = A1;  // Analog input pin that light mic is attached to

int micRValue = 0;        // value read from right mic
int micLValue = 0;        // value read from right mic
int i = millis();
char stringToPrint[20]; //to string to print
char tempStr[5];

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(250000);
}

void loop() {
  micRValue = analogRead(analogInPinR);
  micLValue = analogRead(analogInPinL);

  // print the results to the Serial Monitor:
    //Serial.print("R = ");
    snprintf(tempStr, 5, "%d", micLValue); //convert value to str
    strcpy(stringToPrint, tempStr);
    strcat(stringToPrint, "\t");
    snprintf(tempStr, 5, "%d", micRValue);
    strcpy(stringToPrint, tempStr);
    strcat(stringToPrint, "\n");
    
    Serial.print(stringToPrint); // print the newly constructed string
    
    //Serial.print(micRValue);
    //Serial.print("\t");
    //Serial.print(micLValue);
    //Serial.print("\n"); 
    //Serial.print(millis());
    //Serial.print("\n");
    //f(millis() - i > 0) {Serial.print(millis()); i = millis();} 

  // wait 2 milliseconds before the next loop for the analog-to-digital
  // converter to settle after the last reading:
  delayMicroseconds(50);
}
