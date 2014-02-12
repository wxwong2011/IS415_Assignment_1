var bikeIcon = L.icon({
		iconUrl : 'images/marker-icon-bike.png',
		shadowUrl : 'images/marker-shadow.png',
		iconSize: [26, 43],
		iconAnchor: [13, 44],
		popupAnchor: [-1, -45],
		shadowSize: [68, 95],
		shadowAnchor: [22, 94]
	});

station_layer = L.geoJson(stations, {
		pointToLayer : function (feature, latlng) {
			return L.marker(latlng, {
				icon : bikeIcon
			});
		},
		onEachFeature : function (feature, layer) {
			if (feature.properties) {
				layer.bindPopup(Object.keys(feature.properties).map(function (k) {
						if (k == "id") {
							return "<B>Station ID</B>" + ": " + feature.properties[k] + "<br />";
						} else if (k == "terminalName") {
							return "<B>Terminal Name</B>" + ": " + feature.properties[k] + "<br />";
						} else if (k == "name") {
							return "<B>Location</B>" + ": " + feature.properties[k] + "<br />";
						}
					}).join(""), {
					maxHeight : 100
				});
			}
		}
	});

elderlyCentre = new L.geoJson(elderlyCareCentre, {
		pointToLayer : function (feature, latlng) {
			return L.marker(latlng, {
				icon : baseballIcon
			});
		},
		onEachFeature : function (feature, layer) {
			layer.bindPopup(feature.properties.Name);
		}
	})
