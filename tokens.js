var tokenize = require('c-tokenizer')
var t = tokenize(function (src, token) {
  console.log(token.type + ' => ' + JSON.stringify(src))
})
console.log(t._regexes)
t._regexes.forEach(function (t) {
  console.log(JSON.stringify(t))
})

process.stdin.pipe(t)
