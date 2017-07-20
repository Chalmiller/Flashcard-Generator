var clozeCard = function(text, cloze) {
	this.fullText = text;
	this.cloze = cloze;
}

clozeCard.prototype.partial = function() {
	var matchedString = text.match(cloze);
	return matchedString[0];
};

clozeCard.prototype.lead = function() {
	return this.cloze;
}