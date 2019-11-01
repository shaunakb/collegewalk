map = L.map('map').setView([38, -97], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoibGVnb2Jpb25pY2Z1c2lvbiIsImEiOiJ0SkFLZmp3In0.BrQG02JMFZem7FrjwfOvmQ'
}).addTo(map);

//markers[<%= i %>] = L.marker([<%= arr[i].LATITUDE %>, <%= arr[i].LONGITUD %>]).addTo(map);