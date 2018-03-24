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
  var reorganized = {}
  var last_identifier = ""
  var open_paren = false
  var dot_operator = false

  for (x=0; x<tokenized.length; x++){
    var token = tokenized[x]
    console.log(token)
    var same = JSON.parse(token)
    var type = same.type
    var source = same.source

    if(type == "whitespace"){
      continue
    }
    if(type == "identifier" && open_paren == false){
      reorganized[source] = []
      last_identifier = source
    }

    if(open_paren == true && source != ")" && type != "operator"){
      reorganized[last_identifier].push(source)
    }

    if(source == "("){
      open_paren = true
    }
    else if(source == ")") {
      open_paren = false
    }

    // if(type == "operator" && source == "."){

    // }
  }
  console.log(reorganized)

  res.send(reorganized)
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
