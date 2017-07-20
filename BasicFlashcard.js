var front = process.argv[2];
var back = process.argv[3];

var basicFlashcard = function(front, back) {
	this.front = front;
	this.back = back;
	this.guessCount = 0;
}

basicFlashcard.prototype.question = function(argument1) {
	return this.back;
}

basicFlashcard.prototype.answer = function(argument2) {
	return this.front;
}

module.exports = basicFlashcard;