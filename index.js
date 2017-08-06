const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const SearchIndex = require('search-index');
const JSONStream = require('JSONStream');

const app = express();
app.use(express.static("public"));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

var mySearchIndex;

var searchOptions = {
    preserveCase: false,
};
SearchIndex(searchOptions, function(err, index) {
    fs.createReadStream("data/example.json")
        .pipe(index.feed())
        .on('finish', function() {
            mySearchIndex = index;
            console.log("Completed indexing");
        })
});

app.get("/data", function(req, res) {
    const searchString = req.query.text;
    console.log("Finding ", searchString);
    var result = [];

    var q = {
        query: [{
            AND: { 'creator': [searchString] }
        }]
    };

    mySearchIndex.search(q)
        .on('data', function(data) {
            result.push(data);
        }).on('end', function() {
            console.log("Sending back result", result);
            res.send(result);
        })
});

app.post("/data", function(req, res) {
    console.log("Adding ", req.body);
    let obj = JSON.parse(fs.readFileSync("data/example.json", "utf8"));
    obj.push(req.body);
    fs.writeFile("data/example.json", JSON.stringify(obj));
    res.send("Added!");
});

app.listen(3000, function() {
    console.log("App listening on port 3000!");
});