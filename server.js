const express = require('express')
const csv = require('csvtojson')
const app = express()
var fs = require('fs')
var request = require("request")

app.set('view engine', 'ejs')
app.use(express.static('public'))

var data = []


app.get('/', function (req, res) {
	/*fs.readFile('public/data/walk.json', function(err, data){
				var json = JSON.parse(data)
				res.render('index', {arr: data})
			})*/
		res.render('index', {arr: ["hi"]})
})

app.listen(3000, function() {
	console.log('Walk Score app listening on port 3000!')
})