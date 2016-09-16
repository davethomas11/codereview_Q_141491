//# Wed 24 Aug 09:01:50 2016 - author: Dave Thomas - dave.thomas@trader.ca 
//# Copyright (c) 2016 Trader Corporation.  All rights reserved.

// Creates a Vector path command for a circle based on based in circumfrence

var args = process.argv.slice(2);

if (args.length < 1) {
    console.log("Please supply a width for the vector circle path");
}

// The second and third argument can be used to offset the circle by X adn Y number of pixels
var offsetXBy = 0;
var offsetYBy = 0;
if (args.length >= 2) {
    offsetXBy = parseFloat(args[1]);
}

if (args.length >= 3) {
    offsetYBy = parseFloat(args[2]);
}


function Coord(x, y) {
    var self = this;

    this.x = parseFloat(x);
    this.y = parseFloat(y);

    this.offset = function(offsetX, offsetY) {
        self.x += offsetX;
        self.y += offsetY;
    }
}

Coord.prototype.toString = function () {
    return `${this.x} ${this.y}`
}

function BezierCurve(x, y, c1, c2) {
    var self = this;

    this.x = x;
    this.y = y;
    this.c1 = c1;
    this.c2 = c2;

    this.offset = function(offsetX, offsetY) {
        self.x += offsetX;
        self.y += offsetY;

        self.c1.offset(offsetX, offsetY);
        self.c2.offset(offsetX, offsetY);
    }
}

BezierCurve.prototype.toString = function () {
    return `${this.c1.toString()} ${this.c2.toString()} ${this.x} ${this.y}`
}

var BEZIER_CONTROL_POINT = 0.552284749831;

var dimension = parseFloat(args[0]); // Circles circumfrence
var halfDimen = dimension / 2;
var controlPointOffset = halfDimen * BEZIER_CONTROL_POINT;


// from Middle Left
var firstMove = new Coord(0, halfDimen);

// curve to Top Middle
var curve1 = new BezierCurve(halfDimen, 0, 
                    new Coord(0, halfDimen - controlPointOffset),
                    new Coord(halfDimen - controlPointOffset, 0));

// curve to Middle Right
var curve2 = new BezierCurve(dimension, halfDimen,
                    new Coord(halfDimen + controlPointOffset, 0),
                    new Coord(dimension, halfDimen - controlPointOffset));

// curve to Bottom Middle
var curve3 = new BezierCurve(halfDimen, dimension,
                    new Coord(dimension, halfDimen + controlPointOffset),
                    new Coord(halfDimen + controlPointOffset, dimension));

// curve back to Middle Left
var curve4 = new BezierCurve(0, halfDimen,
                    new Coord(halfDimen - controlPointOffset, dimension),
                    new Coord(0, halfDimen + controlPointOffset));

if (offsetXBy > 0) {

    firstMove.offset(offsetXBy, offsetYBy);
    curve1.offset(offsetXBy, offsetYBy);
    curve2.offset(offsetXBy, offsetYBy);
    curve3.offset(offsetXBy, offsetYBy);
    curve4.offset(offsetXBy, offsetYBy);
}


console.log(`M ${firstMove.toString()}`);
console.log(`C ${curve1.toString()}`);
console.log(`C ${curve2.toString()}`);
console.log(`C ${curve3.toString()}`);
console.log(`C ${curve4.toString()}`);
console.log("Z");