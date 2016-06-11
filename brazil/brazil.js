window.onload = function() {

    var brazmap = L.map('map_brazil');
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(brazmap);

    var routing = L.Routing.control({
        show: false,
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
        show: false
    }).addTo(brazmap);

    // Klicks auf Karte verarbeiten
    brazmap.on("click", function(event) {
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
            tipp_marker.bindPopup('Für Routenberechnung bitte Zieldestination anklicken ...').openPopup();
        }
    });

    /*
    	Zeigt die Reiseroute in Brasilien mit Photos von Panoramio und Wikipedia-Einträgen
    */

    var marker1 = L.marker([-23.5, -46.616667]).addTo(brazmap);
    marker1.bindPopup('<h2>São Paulo</h2><p>Bem-vindo a São Paulo!</p>')
    var marker2 = L.marker([-23.140556, -44.247222]).addTo(brazmap);
    marker2.bindPopup('<h2>Ilha Grande</h2><p>Willkommen auf Ilha Grande!</p>')
    var marker3 = L.marker([-22.908333, -43.196389]).addTo(brazmap);
    marker3.bindPopup('<h2>Rio de Janeiro</h2><p>Bem-vindo ao Rio de Janeiro!</p>')
    var marker4 = L.marker([-20.385278, -43.503333]).addTo(brazmap);
    marker4.bindPopup('<h2>Minas Gerais</h2><p>Bem-vindo a Ouro Preto!</p>')
    var marker5 = L.marker([-15.8, -47.85]).addTo(brazmap);
    marker5.bindPopup('<h2>Distrito Federal</h2><p>Bem-vindo a Brasília!</p>')
    var marker6 = L.marker([-8.758611, -63.881944]).addTo(brazmap);
    marker6.bindPopup('<h2>Rondônia</h2><p>Bem-vindo ao Porto Velho!</br></br>Porto Velho ist die Hauptstadt des brasilianischen Bundesstaates Rondônia. Die Stadt hat rund 500.000 EinwohnerInnen.</p>')
    var marker7 = L.marker([-10.951944, -61.951667]).addTo(brazmap);
    marker7.bindPopup('<h2>Rondônia</h2><p>Hier ist Ji-Paraná</p>')
    var marker8 = L.marker([-9.971111, -67.811111]).addTo(brazmap);
    marker8.bindPopup('<h2>Acre</h2><p>Hier ist Rio Branco</p>')

    var markergroup = new L.featureGroup([marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8]);
    brazmap.fitBounds(markergroup.getBounds());

    L.control.scale({
        'metric': true
    }).addTo(brazmap);

    var bounds = markergroup.getBounds();
    var url = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=30" +
        '&minx=' + bounds.getWest() +
        '&miny=' + bounds.getSouth() +
        '&maxx=' + bounds.getEast() +
        '&maxy=' + bounds.getNorth() +
        '&size=mini_square&mapfilter=true&callback=zeigBilder';
    var script = document.createElement("script");
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    window.zeigBilder = function(data) {
        for (var i = 0; i < data.photos.length; i++) {
            var x = L.marker(
                [data.photos[i].latitude, data.photos[i].longitude], {
                    icon: L.icon({
                        iconUrl: data.photos[i].photo_file_url
                    })
                }
            ).bindPopup("<h4>" + data.photos[i].photo_title + "</h4>" +
                "<a target='blank' href=' " + data.photos[i].photo_url + "'>Hier klicken, wenn das Bild vergrößert in einem neuen Fenster geöffnet werden soll</a>"
            ).addTo(brazmap);
        }
    }

    var url_wiki = "http://api.geonames.org/wikipediaBoundingBoxJSON?username=oeggl" +
        '&west=' + bounds.getWest() +
        '&south=' + bounds.getSouth() +
        '&east=' + bounds.getEast() +
        '&north=' + bounds.getNorth() +
        '&lang=de' +
        '&callback=zeigWiki';
    var script2 = document.createElement("script");
    script2.src = url_wiki;
    document.getElementsByTagName('head')[0].appendChild(script2);
    window.zeigWiki = function(wikidata) {
        // marker add, popup add, link add
        for (var i2 = 0; i2 < wikidata.geonames.length; i2++) {
            var wik_mark = L.marker([wikidata.geonames[i2].lat, wikidata.geonames[i2].lng]);
            var icon = L.icon({
                iconUrl: "wikipedia.png"
            });
            wik_mark.setIcon(icon);
            wik_mark.bindPopup("<a target='blank' href='http://" + wikidata.geonames[i2].wikipediaUrl +
                "'>" + wikidata.geonames[i2].title + "</a>");
            wik_mark.addTo(brazmap);
        }
    }

    var hash = new L.Hash(brazmap);
}