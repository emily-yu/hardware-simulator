var cheerio = require('cheerio');
var request = require('request');

const base = 'https://www.arduino.cc/reference/en'
request({
    method: 'GET',
    url: base
}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    $('#functions').find('a').each(function(i, elm) {
	    console.log($(this).attr('href').slice(2))
	});
    console.log('----')
});

// request({
//     method: 'GET',
//     url: base + '/language/functions/digital-io/digitalwrite/'
// }, function(err, response, body) {
//     if (err) return console.error(err);
//     $ = cheerio.load(body);

//     x = $('.content').text()
// 	var separators = ['Syntax', 'Description', 'Parameters', 'Returns'];
// 	var tokens = x.split(new RegExp(separators.join('|'), 'g'));
// 	tokens.shift()
// 	tokens.pop()

// 	console.log(tokens)
// 	// arr.push(tokens.toString())
// });
