var cheerio = require('cheerio');
var request = require('request');

request({
    method: 'GET',
    url: 'https://www.arduino.cc/reference/en/language/functions/digital-io/digitalwrite/'
}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    console.log($.html())
    console.log("asdf")
    console.log($('.content').text())

    x = $('.content').text()
	var separators = ['Syntax', 'Description', 'Parameters', 'Returns'];
	var tokens = x.split(new RegExp(separators.join('|'), 'g'));
	tokens.shift()
	tokens.pop()
});