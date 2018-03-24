//ignore this whole fucking thing and make it on front end
var request = require('request');
// const app = express()

var client = process.env.jdoodle_client
var secret = process.env.jdoodle_secret



function crequest(script, callback){
  var postData = {
    script:'printf(\"hello world\")',
    language:'c',
    versionIndex:'0',
    clientId:client,
    clientSecret:secret
  }

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
    callback(body)
  })
}
