var request = require('request');

var client = process.env.jdoodle_client
var secret = process.env.jdoodle_secret

var postData = {
  script:'printf(\"hello world\")',
  language:'c',
  versionIndex:'0',
  clientId:client,
  clientSecret:secret
}
console.log(JSON.stringify({postData}))

var options = {
  method:'post',
  url: 'https://api.jdoodle.com/v1/execute',
  headers: {
    'Content-Type': 'application/json',
    'charset' : 'UTF-8'
  },
  body: JSON.stringify(postData)
};


request(options, function (err, res, body) {
  if (err) {
    console.error('error posting json: ', err)
    throw err
  }
  var headers = res.headers
  var statusCode = res.statusCode
  console.log('headers: ', headers)
  console.log('statusCode: ', statusCode)
  console.log('body: ', body)
})
