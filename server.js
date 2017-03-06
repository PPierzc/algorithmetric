var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

urlencodedParser = bodyParser.urlencoded({ extended: true })
jsonParser = bodyParser.json()

console.log(__dirname);

app.get('/', function(req, res, next) {
	console.log('User requested GET /');
	res.render('index');
});

app.post('/', urlencodedParser, function(req, res, next) {
	console.log(req.body)
	res.render('index');
});

app.post('/api/submit', urlencodedParser, function(req, res, next) {
	console.log(JSON.stringify(req.body));
	res.redirect('/');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.post('/', function(req, res) {
    console.log('Username: ' + req.query['body']);
});

app.listen(8080, function(){
	console.log('Example app listening on port 8080!')
})