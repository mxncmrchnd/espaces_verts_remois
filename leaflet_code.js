var legend = L.control({ position: "bottomright" });
var info = L.control();

var map = L.map("mapid").setView([49.2535, 4.08], 12);
var baselayers = {
    OSM: new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    ESRI: new L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        {
            attribution:
                "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
        }
    ),
    CartoDB: new L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    })
};
baselayers.CartoDB.addTo(map);
L.control.layers(baselayers, null, { position: "topright" }, { collapsed: false }).addTo(map);

//variables
var icon_parc = L.icon({
    iconUrl : 'https://cdn-icons-png.flaticon.com/512/3095/3095141.png',
    iconSize : [30,30],
    iconAnchor : [0,0],
    popupAnchor : [15,15]
});
var iris_gj = L.geoJson(iris, { style: style, onEachFeature: onEachFeature }).addTo(map);
var parcs_gj = L.geoJson(parcs, { onEachFeature: onEachMarker });

function getColor(d) {
    return d > 0.25 ? "#005a32" : 
        d > 0.2 ? "#238b45" : 
        d > 0.15 ? "#41ab5d" : 
        d > 0.1 ? "#74c476" :
        d > 0.05 ? "#a1d99b":
        "#edf8e9";
}
function style(feature) {
    return {
        weight: 0.5,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.5,
        fillColor: getColor(feature.properties.part_vege)
    };
}

//fonctions
function onEachMarker(feature, layer) {
    var p = L.popup().setContent(
        "<center><img width='100px' src='" +
            feature.properties.image +
            "'/></center></br><center><b>" +
            feature.properties.nom_parc +
            "</b></center>"
    );
    var m = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{icon: icon_parc}).bindPopup(p).addTo(map);
}

legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
        grades = [0, 0.05, 0.1, 0.15, 0.2, 0.25],
        labels = ["<strong> Proportion d" + "'" + "espaces verts<br></strong>(en m²/m²)"],
        from,
        to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push('<i style="background:' + getColor(from) + '"></i> ' + from + (to ? " à " + to : " et plus"));
    }
    div.innerHTML = labels.join("<br/><br/>");
    return div;
};
info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "info");
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML =
        "<h4>Statistiques locales</h4>" +
        (props ? "<b>Quartier " +
              props.NOM_IRIS +
              "</b><br><br>" +
              "<br />" +
              "Proportion d" +
              "'" +
              "espaces verts  : " +
              (props.part_vege * 100.0).toFixed(2) +
              "%"
            : "Survoler une unité spatiale");
};
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 3,
        color: "#111",
        dashArray: "",
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    iris_gj.resetStyle(e.target);
    info.update();
}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

//affichage
iris_gj = L.geoJson(iris, { style: style, onEachFeature: onEachFeature }).addTo(map);
legend.addTo(map);
info.addTo(map);