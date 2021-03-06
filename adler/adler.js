/*
	Adlerweg Script
	Zeigt vier Etappen des Adlerwegs auf einer Leaflet-Karte mit Photos von Panoramio und Wikipedia-Einträgen
*/

window.onload = function() {
    var layers = { // http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
        geolandbasemap: L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmapoverlay: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmapgrau: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmaphidpi: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmaporthofoto30cm: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        osmLayer: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
        })
    };

    var adlerweg = L.map('adler_map', {
        layers: [layers.osmLayer],
        center: [47.483056, 12.066389],
        zoom: 10
    });

    var etappe01 = L.geoJson(etappe01json, {
        style: {
            color: "#fff400",
            weight: 6
        }
    });
    etappe01.bindPopup("<a href='http://www.tirol.at/reisefuehrer/sport/wandern/wandertouren/a-adlerweg-etappe-1-st-johann-gaudeamushuette' target='_blank'><p>Adlerweg - Etappe 1</p></a>")

    var etappe02 = L.geoJson(etappe02json, {
        style: {
            color: "#ff9a00",
            weight: 6
        }
    });
    etappe02.bindPopup("<a href='http://www.tirol.at/reisefuehrer/sport/wandern/wandertouren/a-adlerweg-etappe-2-gaudeamushuette-hintersteiner-see' target='_blank'><p>Adlerweg - Etappe 2</p></a>")

    var etappe03 = L.geoJson(etappe03json, {
        style: {
            color: "#ff0000",
            weight: 6
        }
    });
    etappe03.bindPopup("<a href='http://www.tirol.at/reisefuehrer/sport/wandern/wandertouren/a-adlerweg-etappe-3-hintersteiner-see-kufstein' target='_blank'><p>Adlerweg - Etappe 3</p></a>")

    var etappe04 = L.geoJson(etappe04json, {
        style: {
            color: "#c90000",
            weight: 6
        }
    });
    etappe04.bindPopup("<a href='http://www.tirol.at/reisefuehrer/sport/wandern/wandertouren/a-adlerweg-etappe-4-kufstein-alpengasthof-buchacker' target='_blank'><p>Adlerweg - Etappe 4</p></a>")

    var marker1 = L.marker([47.522778, 12.429722]).addTo(adlerweg);
    marker1.bindPopup('<h2>Adlerweg</h2><p>Etappe 1:<br>Start: St. Johann in Tirol')

    var adlergroup = new L.featureGroup([etappe01, etappe02, etappe03, etappe04]);
    adlerweg.addLayer(adlergroup);
    adlerweg.fitBounds(adlergroup.getBounds());

    L.control.layers({
        "Open Street Map": layers.osmLayer,
        "Geoland Basemap": layers.geolandbasemap,
        "Geoland Basemap Overlay": layers.bmapoverlay,
        "Geoland Basemap Grau": layers.bmapgrau,
        "Geoland Basemap High DPI": layers.bmaphidpi,
        "Geoland Basemap Orthofoto": layers.bmaporthofoto30cm
    }, {
        "Etappen": adlergroup,
        "Marker St. Johann": marker1
    }).addTo(adlerweg);

    var bounds = adlergroup.getBounds();
    var url = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20" +
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
            // console.log("Photo Titel: ", i, data.photos[i].photo_title);
            var x = L.marker(
                [data.photos[i].latitude, data.photos[i].longitude], {
                    icon: L.icon({
                        iconUrl: data.photos[i].photo_file_url
                    })
                }
            ).bindPopup("<h2>" + data.photos[i].photo_title + "</h2>" +
                "<a href=' " + data.photos[i].photo_url + "'>Link zum Bild</a>"
            ).addTo(adlerweg);
            // console.log(data.photos[i].photo_file_url)
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
            // console.log("Wiki-Titel: " + wikidata.geonames[i2].title);
            var wik_mark = L.marker([wikidata.geonames[i2].lat, wikidata.geonames[i2].lng]);
            var icon = L.icon({
                iconUrl: "wikipedia.png"
            });
            wik_mark.setIcon(icon);
            wik_mark.bindPopup("<a href='http://" + wikidata.geonames[i2].wikipediaUrl +
                "'>" + wikidata.geonames[i2].title + "</a>");
            wik_mark.addTo(adlerweg);
            // console.log(wik_mark)
        }
    }
	
	var hash = new L.Hash(adlerweg);	
	
	var el = L.control.elevation({
		collapsed : true,
		theme: "steelblue-theme"		
	}).addTo(adlerweg);
	var adlerEtappe01 = L.geoJson(etappe01json, {
		onEachFeature: el.addData.bind(el)
	}).addTo(adlerweg);
	
	L.control.scale({
        'metric': true
    }).addTo(adlerweg);
}