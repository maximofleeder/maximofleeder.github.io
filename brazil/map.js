var brazmap = L.map('map_brazil');
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(brazmap);

var routing = L.Routing.control({
	show : false,
	waypoints: [
	L.latLng(-23.5, -46.616667),
	L.latLng(-23.140556, -44.247222),
	L.latLng(-22.908333, -43.196389),
	L.latLng(-20.385278, -43.503333),
	L.latLng(-22.908333, -43.196389),
	L.latLng(-15.8, -47.85),
	L.latLng(-8.758611, -63.881944),
	L.latLng(-10.951944, -61.951667),
	L.latLng(-9.971111, -67.811111)
	]
}).addTo(brazmap);

// Variable für den Tipp Marker definieren
var tipp_marker;
// Routing control hinzufügen und minimieren
var routing_control = L.Routing.control({
	show : false
	}).addTo(brazmap);
// Klicks auf Karte verarbeiten
	brazmap.on("click", function (event) {
		if (tipp_marker) {
// Wegpunkte setzen und Routing control zeigen
	routing_control.setWaypoints([
		tipp_marker.getLatLng(),
		event.latlng
	]);
	routing_control.show();
// Tipp Marker löschen
	brazmap.removeLayer(tipp_marker);
	tipp_marker = null;
	} else {
// Routing control minimieren
	routing_control.hide()
// Tipp anzeigen und Marker merken
	tipp_marker = L.marker(event.latlng).addTo(brazmap);
	tipp_marker.bindPopup('Ziel klicken ...').openPopup();
}
});