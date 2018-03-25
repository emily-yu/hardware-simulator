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
  var reorganized = {}
  var last_identifier = ""
  var open_paren = false
  var dot_operator = false
  var dot_original = ""
  var dot_after = ""

  var first_token = JSON.parse(tokenized[0])
  const types = ["int", "String", "float", "double", "bool", "char", "void", "Servo"]
  console.log(first_token)
  console.log(types.indexOf(first_token.source))
  if(types.indexOf(first_token.source) != -1 && first_token.source == identifier){

  }
  else{
    for (x=0; x<tokenized.length; x++){
      var token = tokenized[x]

      var same = JSON.parse(token)
      var type = same.type
      var source = same.source

      if(type == "whitespace"){
        continue
      }
      if(type == "identifier" && open_paren == false){
        if(dot_operator == true){
          dot_after = source
        }
        reorganized[source] = {}
        last_identifier = source
        reorganized[source]["dot"] = false
        reorganized[source]["type"] = "function"
        reorganized[last_identifier]["params"] = []
      }

      if(open_paren == true && source != ")" && type != "operator"){
        console.log(source)
        console.log(reorganized[last_identifier])
        reorganized[last_identifier]["params"].push(source)
      }

      if(source == "("){
        open_paren = true
      }
      else if(source == ")") {
        open_paren = false
      }

      if(type == "operator" && source == "."){
        dot_original = last_identifier
        dot_operator = true
      }
    }

    if(dot_operator == true){
      reorganized[dot_original][dot_after] = reorganized[dot_after]
      reorganized[dot_original]["dot"] = true
      // reorganized[dot_original] = JSON.stringify(reorganized[dot_original])
      delete reorganized[dot_after]
    }
  }

  res.send(JSON.stringify(reorganized))
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
