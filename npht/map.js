window.onload = function() {
    var map = L.map('routingmap', {
        layers: [
            L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            })
        ],
        center: [47.26, 11.38],
        zoom: 10
    });

    L.control.scale({
        'imperial': false
    }).addTo(map);

    var markers = L.markerClusterGroup({
		disableClusteringAtZoom : 14
	});
	map.addLayer(markers);
	
	var pois = L.geoJson(window.POIS, {
        onEachFeature: function(feature, layer) {
            //console.log(feature);
            var description = feature.properties.NAME;
            if (feature.properties.SEEHOEHE > 0 && feature.properties.SEEHOEHE < 9999) {
                //Seehöhe dazuschreiben
                description += " (" + feature.properties.SEEHOEHE + "m)";
            }
            layer.bindPopup(description);
        }
    }).addTo(markers);

    map.fitBounds(pois.getBounds());

    //console.log(window.POIS);
	

	
	
	
	
	
	
};