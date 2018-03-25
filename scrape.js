var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs')

// scrape functions
const general_data = (callback) => {
	const base = 'https://www.arduino.cc/reference/en'
	request({
	    method: 'GET',
	    url: base
	}, function(err, response, body) {
		var function_data = []
	    if (err) return console.error(err);
	    $ = cheerio.load(body);
	    $('#functions').find('a').each(function(i, elm) {
		    // console.log($(this).attr('href').slice(2))
		    request({
			    method: 'GET',
			    url: 'http://' + $(this).attr('href').slice(2)
			}, function(err, response, body) {
			    if (err) return console.error(err);
			    $ = cheerio.load(body);

			    x = $('.content').text()
				var separators = ['Syntax', 'Description', 'Parameters', 'Returns'];
				var tokens = x.split(new RegExp(separators.join('|'), 'g'));
				tokens.shift()
				tokens.pop()

				function_data.push(tokens)
				var data = {
					name: tokens[0],
					description: tokens[1],
					syntax: tokens[2]
				}
				// callback(function_data)
				callback(data)
			});
		});
	});
}

// scrape for servo functions
const servo_data = (callback) => {

	var function_data = []
	const servo_function_links = ['https://www.arduino.cc/en/Reference/ServoAttach',
								  'https://www.arduino.cc/en/Reference/ServoWrite',
								  'https://www.arduino.cc/en/Reference/ServoWriteMicroseconds',
								  'https://www.arduino.cc/en/Reference/ServoRead',
								  'https://www.arduino.cc/en/Reference/ServoAttached',
								  'https://www.arduino.cc/en/Reference/ServoDetach']
	for (link of servo_function_links) {
	    request({
		    method: 'GET',
		    url: link
		}, function(err, response, body) {
		    if (err) return console.error(err);
		    $ = cheerio.load(body);

		    x = $('#wikitext').text()
		    // console.log(x)
			var separators = ['Syntax', 'Description', 'Parameters', 'Returns'];
			var tokens = x.split(new RegExp(separators.join('|'), 'g'));
			tokens.shift()
			tokens.pop()

			// console.log(tokens)
			function_data.push(tokens)
			var data = {
				name: tokens[0],
				description: tokens[1],
				syntax: tokens[2]
			}
			// callback(function_data)
			callback(data)
		});
	}
}

// dump general functions to file general_func.txt
general_data((data) => {
	fs.appendFile('general_func.txt', JSON.stringify(data), function (err) {
	   if (err) return console.log(err);
	});
})

// dump servo functions to file servo_func.txt
servo_data((data) => {
	fs.appendFile('servo_func.txt', JSON.stringify(data), function (err) {
	   if (err) return console.log(err);
	});
})
