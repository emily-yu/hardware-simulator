var tokenize = require('../array')
var src = process.argv[2]
var tokens = tokenize(src)
console.log(tokens)
tokens.forEach(function (t) {
  console.log(JSON.stringify(t))
})
