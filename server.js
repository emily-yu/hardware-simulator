var express = require('express')
var bodyParser = require('body-parser')
const app = express()

var engines = require('consolidate');

app.use(express.static(__dirname));
app.set('view engine', 'hbs');
app.set('views', __dirname);
app.engine('html', engines.mustache);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req,res){
  res.render("real.html")
})

app.listen(3000)
console.log('3000')
