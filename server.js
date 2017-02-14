console.log("\n\n***\n" + new Date());
console.info('Running server. . .');

/**********************************************************************************************************************/

var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded());
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(express.static(__dirname + '/layouts'));

app.get("/", function(req, res) {
    res.render("index");
    res.send();
});

app.all("*", function (req, res) {
    console.warn("Incorrect request \"" + req.url + "\": page not found");
    res.statusCode = 404;
    res.send("Incorrect request \"" + req.url + "\": page not found");
});

app.listen("6969");
