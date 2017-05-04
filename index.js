const chalk = require('chalk');
const fs = require('fs');
const readline = require('readline');
const yargs = require('yargs');

let argv = yargs
	.strict()
	.option('dictionary', {
		describe: '// dictionary file to use',
		alias: 'd',
		type: 'string',
		default: 'scowl-final/english-words.10'
	})
	.option('min', {
		describe: '// minimum number of words',
		type: 'number',
		default: 1
	})
	.option('max', {
		describe: '// maximum number of words',
		type: 'number',
		default: 3
	})
	.option('count', {
		describe: '// number of phrases to generate',
		type: 'number',
		default: 10
	})
	.usage(chalk.bold('$0') + ' [options]')
	.argv;

let words = [];

let reader = readline.createInterface({
	input: fs.createReadStream(argv.dictionary)
});

reader.on('line', function (line) {
	words.push(line.trim());
});

reader.on('close', function () {
	let output = [];
	for (let i = 0; i < argv.count; i++) {
		let phrase = [];
		let len = randomIntInclusive(argv.min, argv.max);
		for (let j = 0; j < len; j++) {
			phrase.push(pullRandomWord(words));
		}

		output.push({
			name: {
				value: phrase.join(' ')
			}
		});
	}

	console.log(JSON.stringify(output));
});


function pullRandomWord(words) {
	let i = randomIntInclusive(0, words.length - 1);
	let w = words.splice(i, 1);
	return w[0];
}

function randomIntInclusive(low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low);
}