var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//var dbox = require('dbox');
//var api = dbox.app({"app_key": "bwqtwxxzful4f4w", "app_secret": "w8hsxjwngwf0nz1"});
var access_token = '78REl_UZNQAAAAAAAAAAfdxwfUFuyYKiwG4F2SFq_yefP-GJexCD-olU-q4TO77J';
const dfs = require('dropbox-fs')({
	apiKey: access_token
});

//var app_request_token = 'Null'
//api.requesttoken(function(status, request_token){
//	app_request_token = request_token
//  	console.log(request_token)
//})
//window.open('https://www.dropbox.com/1/oauth/authorize?oauth_token=#{ request_token.oauth_token }')

//api.accesstoken(app_request_token, function(status, access_token){
//	app_access_token = access_token
//  	console.log(access_token)
//})

//console.log(access_token);
//var client = api.client(access_token);
//client.account(function(status, reply){
  //console.log(reply)});

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

app.get('/submitted', function(req, res, next) {
	console.log('User requested GET /submitted');
	res.render('submit');
});

app.get('/what-data', function(req, res, next) {
	console.log('User requested GET /what data');
	res.render('data');
});

app.get('/privacy-policy', function(req, res, next) {
	console.log('User requested GET /policy');
	res.render('policy');
});

app.post('/', urlencodedParser, function(req, res, next) {
	console.log(req.body)
	res.render('submit');
});

app.post('/api/submit', urlencodedParser, function(req, res, next) {
	//var data = JSON.stringify(req.body);
	//Read data.json file
	var file_data = {}
	dfs.readFile('/data.json', {encoding: 'utf-8'}, function(err, result){
		//Make it into a json 
		file_data = JSON.parse(result);
	//Add a new element into the json e.g. had 2 inputs like this {2:[object],1:object} and adding a new input then the json will look like this {3:[object], 2:[object], 1:[object]}
	var existing_elements = Object.keys(file_data).length + 1
	console.log(existing_elements);
	file_data[existing_elements] = req.body
	//stringify
	var data = JSON.stringify(file_data)
	//write to file
	dfs.writeFile('/data.json', data, {encoding: 'utf-8'}, function(err, stat){
		console.log('File Updated');
	})
})
	res.redirect('/submitted');
});

app.post('/', function(req, res) {
    console.log('Username: ' + req.query['body']);
});

app.listen(process.env.PORT || 5000, function(){
	console.log('Example app listening on port 5000!')
})
