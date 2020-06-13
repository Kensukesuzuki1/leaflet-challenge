var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 5,
  id: "mapbox.light",
  accessToken: API_KEY
});

var map = L.map("map-id", {
  center: [30.267,97.743],
  zoom: 4.8
})

lightmap.addTo(map);

var legend = L.control({
  position: "bottomright"
});

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

legend.addTo(map);

function getColor(Richter) {
  return Richter > 7 ? '#3d1010':
    Richter > 5 ? '#8e2525':
    Richter > 3 ? '#cb3434':
    '#eaaeae';
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function (data) {
  function onEachFeature(features, layer) {
    var popupContent = "<h3>" + features.properties.mag + "on the Richter scale</h3><hr>" +
    ", it was" + features.properties.depth + "in depth from the surface" + "</h3><hr>" + 
    " and was classified as a " + features.properties.type + "</h3><hr>";
    layer.bindPopup(popupContent);
  }
	L.geoJSON(data, {
  	onEachFeature: onEachFeature,
		pointToLayer: function (features, latlng) {
			return L.circleMarker(latlng, {
				radius: features.properties.mag*2.5,
				fillColor: getColor(features.properties.mag),
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8
			});
		}
	}).addTo(map);
})
