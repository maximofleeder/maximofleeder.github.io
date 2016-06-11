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
    marker1.bindPopup('<h4>São Paulo</h4><p>Bem-vindo a São Paulo!</br></br>São Paulo (port. für Sankt Paulus) ist die Hauptstadt des gleichnamigen Bundesstaates und größte Stadt Brasiliens. Die Stadt ist das wichtigste Wirtschafts-, Finanz- und Kulturzentrum sowie Verkehrsknotenpunkt des Landes. São Paulo ist der größte industrielle Ballungsraum in Lateinamerika. Im administrativen Stadtgebiet von São Paulo leben rund 12 Millionen Menschen (2015). Die Metropolregion Grande São Paulo hat 21 Millionen Einwohner (2015) und ist damit eine der größten Städte der Erde sowie die bevölkerungsreichste Stadt auf der Südhalbkugel.</p>')
    var marker2 = L.marker([-23.140556, -44.247222]).addTo(brazmap);
    marker2.bindPopup('<h4>Ilha Grande</h4><p>Die Ilha Grande (portugiesisch Große Insel) ist mit ihren 86 Stränden eine der bekanntesten Inseln Brasiliens. Sie gehört zur Stadt Angra dos Reis im Westen des Bundesstaates Rio de Janeiro und liegt etwa 160 km westlich der Stadt Rio de Janeiro zwischen der Bahia de Sepetiba und der Bahia da Ilha Grande im Atlantik. Es gibt Fährverbindungen vom Hauptort Vila do Abraão zum Stadtzentrum von Angra dos Reis und nach Mangaratiba auf dem Festland. Die Fahrzeit beträgt jeweils ca. 75 Minuten zur ca. 25 km entfernt gelegenen Insel.</p>')
    var marker3 = L.marker([-22.908333, -43.196389]).addTo(brazmap);
    marker3.bindPopup('<h4>Rio de Janeiro</h4><p>Bem-vindo ao Rio de Janeiro!</br></br>Rio de Janeiro ist die zweitgrößte Stadt Brasiliens und Hauptstadt des gleichnamigen Bundesstaates. Sie liegt an der Guanabara-Bucht im Südosten des Landes. Der Name (portugiesisch für „Fluss des Januars“) beruht auf einem Irrtum des Seefahrers Gaspar de Lemos, der die Bucht am 1. Januar 1502 entdeckte und für die Mündung eines großen Flusses hielt. Im administrativen Stadtgebiet leben rund 6,4 Millionen Menschen (2013). Die Metropolregion hat 11,9 Millionen Einwohner (2010). Somit gehört Rio de Janeiro zu den Megastädten dieser Welt.</p>')
    var marker4 = L.marker([-20.385278, -43.503333]).addTo(brazmap);
    marker4.bindPopup('<h4>Minas Gerais</h4><p>Bem-vindo a Ouro Preto!</br></br>Ouro Preto ist eine Stadt im brasilianischen Bundesstaat Minas Gerais. Wegen ihrer barocken Altstadt ist sie in der Welt einzigartig und einer der wichtigsten Touristenmagnete Brasiliens. Seit 1980 ist die Altstadt UNESCO-Weltkulturerbe. Der Name Ouro Preto bedeutet auf Deutsch schwarzes Gold. Die Stadt bekam diesen Namen wegen ihrer riesigen Goldvorkommen, die durch Eisenoxid-Verunreinigung leicht schwarz gefärbt waren.</p>')
    var marker5 = L.marker([-15.8, -47.85]).addTo(brazmap);
    marker5.bindPopup('<h4>Distrito Federal</h4><p>Bem-vindo a Brasília!</br></br>Brasília ist die Hauptstadt Brasiliens. Sie liegt im Distrito Federal do Brasil (Bundesdistrikt), der 2,6 Millionen Einwohner (2009) auf einer Fläche von 5.802 Quadratkilometern hat. Nach dem brasilianischen Bundesamt für Statistik und Geographie (IBGE) gibt es im Distrito Federal nur eine Gemeinde (município): Brasília. Der Bundesdistrikt stellt jedoch kein zusammenhängendes Stadtgebiet dar, sondern ist – mit seiner recht geringen Bevölkerungsdichte und den dominierenden Agrarflächen – eher mit einem kleinen Bundesstaat vergleichbar.</p>')
    var marker6 = L.marker([-8.758611, -63.881944]).addTo(brazmap);
    marker6.bindPopup('<h4>Rondônia</h4><p>Bem-vindo ao Porto Velho!</br></br>Porto Velho ist die Hauptstadt des brasilianischen Bundesstaates Rondônia. Die Stadt hat rund 500.000 EinwohnerInnen. Seit den 1980er-Jahren ist die Stadt wie der Bundesstaat Rondônia Ziel starken Zuzuges, vor allem aus dem Nordosten Brasiliens. Verarmte Bewohner der Bundesstaaten an den Küsten ziehen in die inneren Staaten, wo sie hoffen, Urwald in Plantagen umwandeln zu können und damit ein besseres Leben zu führen.</p>')
    var marker7 = L.marker([-10.951944, -61.951667]).addTo(brazmap);
    marker7.bindPopup('<h4>Rondônia</h4><p>Ji-Paraná ist die bevölkerungsmäßig zweitgrößte Stadt im brasilianischen Bundesstaat Rondônia. Im Jahr 2007 zählte sie 107.679 Einwohner auf einer Fläche von 6897 km². Durch Ji-Paraná fließt der gleichnamige Fluss, der die Stadt in zwei große Stadtbezirke teilt. Zwischen den Bezirken befinden sich auf dem Fluss auch mehrere kleinere Inseln. Die Umgebung von Ji-Paraná ist stark von landwirtschaftlich genutzten Ackern geprägt, der Regenwald wurde sehr weit zurückgedrängt.</p>')
    var marker8 = L.marker([-9.971111, -67.811111]).addTo(brazmap);
    marker8.bindPopup('<h4>Acre</h4><p>Rio Branco (deutsch Weißer Fluss) ist die Hauptstadt und größte Stadt des brasilianischen Bundesstaates Acre. Rio Branco wurde am 28. Dezember 1882 gegründet. In ihr lebt etwa die Hälfte der Bevölkerung, genannt Rio Branquense, Acres. Die Stadt ist wichtigster Ausgangspunkt für Touristen, die Acre besuchen. Die Stadt wird durch den Fluss Rio Acre in zwei Hälften geteilt, den ersten und den zweiten Bezirk, und ist benannt nach dem gleichnamigen Rio Branco, der in den Rio Acre mündet. Im Jahr 2006 waren in der Stadt 58.531 Fahrzeuge angemeldet und es erschienen drei Tageszeitungen.</p>')

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