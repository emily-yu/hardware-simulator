var express = require('express')
var tokenizer = require('tokenizer-array')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get('/', function(req,res){
})

app.post('/interpret', function(req, res){
  var src = req.body.src
  var tokenized = tokenize(src)
  console.log(tokenized)
  res.send(tokenized)
})

app.listen(8000)
console.log('8000')


var rules = [
  { regex: /^\/\*([^*]|\*(?!\/))*\*\/$/, type: 'area comment' },
  { regex: /^\/\*([^*]|\*(?!\/))*\*?$/, type: 'area comment continue' },
  { regex: /^\/\/[^\n]*$/, type: 'line comment' },
  { regex: /^"([^"\n]|\\")*"?$/, type: 'quote' },
  { regex: /^'(\\?[^'\n]|\\')'?$/, type: 'char' },
  { regex: /^'[^']*$/, type: 'char continue' },
  { regex: /^#(\S*)$/, type: 'directive' },
  { regex: /^\($/, type: 'open paren' },
  { regex: /^\)$/, type: 'close paren' },
  { regex: /^\[$/, type: 'open square' },
  { regex: /^\]$/, type: 'close square' },
  { regex: /^{$/, type: 'open curly' },
  { regex: /^}$/, type: 'close curly' },
  { regex: /^([-<>~!%^&*\/+=?|.,:;]|->|<<|>>|\*\*|\|\||&&|--|\+\+|[-+*|&%\/=]=)$/,
      type: 'operator' },
  { regex: /^([_A-Za-z]\w*)$/, type: 'identifier' },
  { regex: /^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/, type: 'number' },
  { regex: /^(\s+)$/, type: 'whitespace' },
  { regex: /^\\\n?$/, type: 'line continue' }
]

function tokenize(src){
  var tokens = tokenizer(src, rules)
  var realtokens = []

  tokens.forEach(function (token) {
    realtokens.push(JSON.stringify(token))
  })
  return realtokens
}
