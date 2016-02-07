// Utility to convert JSON to geoJSON (see the geoJSON specification: http://www.geojson.org)
function geoJSON( data ) {
	//
	// Input JSON data format:
	//	"original address": "string"
        //      "returned address": "string"
	//	"latitude": "number"
	//	"longitude": "number"
	//

	// Convert JSON data to GeoJSON:
	var _geoJSON = {
			'type': 'FeatureCollection',
			'features': [ ]
		};

	for (var i = 0; i < data.length; i++) {
		_geoJSON.features.push( {
			'type': 'Feature',
			'geometry': {
				'type': 'Point',
				'coordinates': [data[i].X, data[i].Y] // [x,y]
			}, 
			'properties': {
				'name': data[i]['Address']
			}
		});

	}; // end FOR i

	return _geoJSON;

}; // end FUNCTION geoJSON(data)

// Load the File System module:
var fs = require('fs');

// Read in the JSON file as text: https://github.com/ariya/phantomjs/wiki/API-Reference-FileSystem
var text = fs.read('data.json');

// Convert text input to JSON:
var json = JSON.parse(text);

// Convert the JSON data to GeoJSON:
var geo_json = geoJSON(json);

// Write the data to file:
fs.write('data.geojson', JSON.stringify(geo_json, null, '\t'), 'w');

// Quit Phantom JS:
phantom.exit();
