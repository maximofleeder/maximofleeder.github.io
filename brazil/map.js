var brazmap = L.map('map_brazil');
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(brazmap);

var routing = L.Routing.control({
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