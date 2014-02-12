// control that shows state info on hover
var info = L.control({
		position : 'bottomright'
	});

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};

info.update = function (props) {
	this._div.innerHTML = '<h4>Town Stats</h4>' + (props ?
			'Town: ' + props.town + '<br />'+
			'Population: ' + props.pop2000 +'<br />'+
			'No.of Bicycle Stations: ' + props.total + '<br />'
			 : 'Hover over a state');
};

function getColor(d) {
	return d >1000000  ? '#800026' :
	d > 500000 ? '#BD0026' :
	d > 200000 ? '#E31A1C' :
	d > 100000 ? '#FC4E2A' :
	d > 50000 ? '#FD8D3C' :
	d > 20000 ? '#FEB24C' :
	d > 10000 ? '#FED976' :
	'#FFEDA0';
}

function style(feature) {
	return {
		fillColor : getColor(feature.properties.pop2000),
		weight : 2,
		opacity : 1,
		color : 'white',
		dashArray : '3',
		fillOpacity : 0.7
	};
}

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight : 5,
		color : '#666',
		dashArray : '',
		fillOpacity : 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

function resetHighlight(e) {
	choropleth_layer.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover : highlightFeature,
		mouseout : resetHighlight,
		click : zoomToFeature
	});
}

choropleth_layer = L.geoJson(cities, {
		style : style,
		onEachFeature : onEachFeature
	});

var legend = L.control({
		position : 'bottomright'
	});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
	grades = [10000, 20000, 50000, 100000, 200000, 500000, 10000000],
	labels = [];
	
	div.innerHTML = '<h4>Population</h4>'
	

	// loop through our density intervals and generate a label with a colored square for each interval
	for (var i = 0; i < grades.length; i++) {
		div.innerHTML +=
		'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
		grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] + '<br>' : '+');
	}

	return div;
};
