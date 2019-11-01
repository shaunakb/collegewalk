var request = require("request")
var csv = require("csvtojson")
var fs = require("fs")

var wsapikey = "279fdf613257a2d8cb922708b8a53997"
var chunkNum = process.argv[2]
var chunkSize = process.argv[3];

global.data = []

function loadWalkScore(lat, lon, address, name, city, state, cb) {
	var address = encodeURI(address)
	var url = "http://api.walkscore.com/score?format=json&address=" + address
	url += "&lat=" + lat + "&lon=" + lon + "&transit=1&bike=1&wsapikey=" + wsapikey

	request(url, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		body.name = name
		body.city = city
		body.state = state
		cb(null, body)
	});
}

var intervalId = null

function writeData(data, size) {
	if (data.length < size) {
		console.log("Collecting data...")
		console.log(data.length + " out of " + size)
	} else {
		clearInterval(intervalId)
		if (chunkNum == 1) {
			fs.writeFile('public/data/walk.json', JSON.stringify(data), 'utf8', function() {
				console.log("Data successfully written to public/data/walk.json")
			})
		} else {
			fs.readFile('public/data/walk.json', function(err, prev){
				var json = JSON.parse(prev)
				json.push(data)
				fs.writeFile('public/data/walk.json', JSON.stringify(json), 'utf8', function(){
					console.log("Data successfully added to public/data/walk.json")
				})
			})
		}
	}
}

csv().fromFile('hd2017.csv').then(
		(jsonObj)=>{
			var data = []
			var actualChunkSize = 0
			for (i = (chunkNum - 1) * chunkSize; i < chunkNum * chunkSize && i < jsonObj.length; i++) {
				var c = jsonObj[i]
				actualChunkSize++
				var address = c.ADDR + " " + c.CITY + " " + c.STABBR
				loadWalkScore(c.LATITUDE, c.LONGITUD, address, c.INSTNM, c.CITY, c.STABBR, function(err, body) {
					var obj = {name: body.name, city: body.city, state: body.state, walk: body.walkscore, walkdesc: body.description, transit: body.transit, bike: body.bike}
					data[data.length] = obj
				})
			}
			intervalId = setInterval(writeData, 250, data, actualChunkSize)
		}
	)
	


