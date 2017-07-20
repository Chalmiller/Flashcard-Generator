var inquirer = require('inquirer');
var fs = require('fs');

var basicFlashcard = require('./BasicFlashcard');
var clozeCard = require('./ClozeCard');

var regCardArray = [];
var clozeCardArray = [];

beginConstruction = function() {
	inquirer.prompt([{
		type: 'list',
		name: 'action',
		message: '\nWhat shall we do today?',
		choices: ['create-new-card', 'practice-cards', 'end']
	}]).then(function(answer) {
		if (answer.action === 'create-new-card') {
			createCard();
		} else if (answer.action === 'practice-cards') {
			practiceCards();
		} else if (answer.action === 'end') {
			return;
		}
	});
}

createCard = function() {
	inquirer.prompt([{
		type: 'list',
		name: 'type',
		message: "\nCloze Card or a Regular Card?",
		choices: ['regular', 'cloze', 'Return']
	}]).then(function(answer) {
		switch (answer.type) {
			case 'regular':
				createRegularCard();
				break;
			case 'cloze':
				createClozeCard();
				break;
			case 'Return':
				return;
		}
	}
}

iterateCardCreation = function() {
	inquirer.prompt ({
		type: 'confirm',
		name: 'iterate',
		message: '\nWould you like to create a new card? (y/n)'
		default: true
	}).then(function(answer) {
		if (answer.more == true) {
			createCard();
		} else {
			console.log("\nPlease type end to terminate the program.")
			beginConstruction();
		}
	})
}

createRegularCard = function() {
	inquirer.prompt([{
		type: 'input',
		name: 'front',
		message: '\nPlease enter text for the front of the card.'
		},
		{
			type: 'input',
			name: 'back',
			message: '\nPlease enter the text for the back of your card.'
		}
	}]).then(function(answer) {
		var cardConstructor1 = new basicFlashcard(answer.front, answer.back);
		regCardArray.push(cardConstructor1);
		fs.readFile('basicCardBank.json', 'utf8', function(err, iterable) {
			if (err) {
				console.log('Error Reported: ' + err)
			}
			var jsonParsed = JSON.parse(content);
			jsonParsed.push(cardConstructor1);
			fs.writeFile('basicCardBank.json', JSON.stringify(jsonParsed), function(err) {
				if (err) throw err;
			})
			iterateCardCreation();
		})
	})
}

createClozeCard = function() {
	inquirer.prompt([{
		type: 'input',
		name: 'cloze',
		message: '\nPlease type the lead text subject of your card.'
		},
		{
			type: 'input',
			name: 'text',
			message: '\nPlease enter the initial question you would like associated with your cloze.'
		}
	}]).then(function(answer) {
		var clozeConstructor = new clozeCard(answer.text, answer.cloze);
		clozeCardArray.push(clozeConstructor);
		fs.readFile('clozeCardBank.json', 'utf8', function(err, iterable) {
			if (err) {
				console.log('Error Reported: ' + err);
			}
			var jsonParsed = JSON.parse(iterable);
			jsonParsed.push(clozeConstructor);
			fs.writeFile('clozeCardBank.json', JSON.stringify(jsonParsed), function(err) {
				if (err) throw err;
			})
			iterateCardCreation();
		})
	})
}

practiceCards = function() {
	inquirer.prompt([{
		type: 'list',
		name: 'type',
		message: '\nWhich cards would you like to practice - cloze or regular?',
		choices: ['cloze', 'regular', 'Return']
	}]).then(function(answer) {
		switch (answer.type) {
			case 'cloze':
				practiceClozeCard();
				break;
			case 'regular':
				practiceRegularCard();
				break;
			case 'Return':
				return;

		}
	});
}

iteratePractice = function() {
	inquirer.prompt({
		type: 'confirm',
		name: 'iterate',
		message: '\nWould you like to practice another card? (y/n)',
		default: true
	}).then(function(answer) {
		if (answer.iterate === true) {
			practiceCards();
		} else {
			console.log('\nPlease type end in the main screen.');
			beginConstruction();
		}
	});
}

practiceRegularCard = function() {
	fs.readFile('clozeCardBank.json', 'utf8', function(err, iterable) {
		var contentBody = JSON.parse(iterable);
		var randNumber = Math.floor(Math.random() * contentBody.length);
		console.log(contentBody[randNumber].front);
		inquirer.prompt([{
			type: 'input',
			name: 'guess'
			message: '\nWhat is your guess?'
		}]).then(function(ans) {
			if (ans.guess.loLowerCase() === contentBody[randNumber].back.toLowerCase()) {
				console.log('\nYou got it! Nice!');
			} else {
				console.log('\nSorry, that was the wrong answer!\nTry Again!')
			}
			iteratePractice()
		})
	})
}

practiceRegularCard = function() {
	fs.readFile('basicCardBank.json', 'utf8', function(err, iterable) {
		var contentBody = JSON.parse(iterable);
		var randNumber = Math.floor(Math.random() * contentBody.length);
		console.log(contentBody[randNumber].front);
		inquirer.prompt([{
			type: 'input',
			name: 'guess'
			message: '\nWhat is your guess?'
		}]).then(function(ans) {
			if (ans.guess.loLowerCase() === contentBody[randNumber].back.toLowerCase()) {
				console.log('\nYou got it! Nice!');
			} else {
				console.log('\nSorry, that was the wrong answer!\nTry Again!')
			}
			iteratePractice()
		})
	})
}

var front = process.argv[2];
var back = process.argv[3];

var basicFlashcard = require("./basicFlashcard")

var newBasicFlashcard = new basicFlashcard(front, back);