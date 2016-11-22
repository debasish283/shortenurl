var express = require('express');
var app = express();
var routes = require('./routes/routes.js');
var bodyParser = require('body-parser');
var port = process.env.PORT||3000;

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

var server = app.listen(port, function() {
    console.log('Server listening on port'+port);
});
