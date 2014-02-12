var geojsonMarkerOptions = {
	fillColor : "#616D7E",
	color : "#000",
	weight : 1,
	opacity : 1,
	fillOpacity : 0.8
};
proportionSymbol_Layer = L.geoJson(stations, {
		pointToLayer : function (feature, latlng) {
			var value = feature.properties['total'];
			if (value == 0) {
				value = 0;
			}
			return L.circleMarker(latlng, geojsonMarkerOptions).setRadius(Math.sqrt(value / 48000) * 18 + 5).bindPopup("<B>ID: </B>" + feature.properties['id'] + "<br /><B>Terminal Name: </B>" + feature.properties['terminalName']
				 + "<br /><B>Location: </B>" + feature.properties['name'] + "<br /><B>Count: </B>" + feature.properties['total']);
		}
	});