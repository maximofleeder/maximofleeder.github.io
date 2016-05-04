var brazmap = L.map('map_brazil');
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(brazmap);

var routing = L.Routing.control({
	waypoints: [
	L.latLng(-23.5, -46.616667),
	L.latLng(-23.140556, -44.247222),
	L.latLng(-22.908333, -43.196389)
	]
}).addTo(brazmap);