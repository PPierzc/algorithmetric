var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var node_dropbox = require('node-dropbox');
var access_token = '78REl_UZNQAAAAAAAAAAeaEsOoAnfPzytir_ytf7HEDTwQextsL2RFgLjenUyZkg'

api = node_dropbox.api(access_token);

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
	var data = JSON.stringify(req.body);
	console.log(data);
	api.account(function(err, res, body) {
		console.log(body);
		api.createFile('./data.json', data, function(req, res, next){
			console.log(res)
		});
	});
	res.redirect('/');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.post('/', function(req, res) {
    console.log('Username: ' + req.query['body']);
});

app.listen(process.env.PORT || 5000, function(){
	console.log('Example app listening on port 5000!')
})
