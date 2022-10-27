"use strict";

var L = require("leaflet");
var Geocoder = require("leaflet-control-geocoder");
var LRM = require("leaflet-routing-machine");
var locate = require("leaflet.locatecontrol");
var options = require("./lrm_options");
var links = require("./links");
var leafletOptions = require("./leaflet_options");
var ls = require("local-storage");
var tools = require("./tools");
var state = require("./state");
var localization = require("./localization");
var Compass = require("leaflet-compass");
require("./polyfill");
import { speechText } from "./speech";

var nameLastSpeech = "";

var parsedOptions = links.parse(window.location.search.slice(1));
var mergedOptions = L.extend(leafletOptions.defaultState, parsedOptions);
var local = localization.get(mergedOptions.language);
var esri = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        id: "mapbox.streets",
        maxZoom: 24,
        maxNativeZoom: 18,
        attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
);

var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 24,
    maxNativeZoom: 19,
    attribution:
        '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

var map = L.map("map", {
    center: [55, 10],
    zoom: 2,
    layers: [esri],
    // worldCopyJump: true,
    rotate: true,
    touchRotate: true,
    rotateControl: {
        closeOnZeroBearing: false,
    },
    bearing: 30,
});

// map.setBearing(30);
// map.touchRotate.enable();

var layers = L.control
    .layers(
        {
            Empty: L.tileLayer(""),
            Streets: osm,
            Satellite: esri,
        },
        null,
        {
            collapsed: false,
        }
    )
    .addTo(map);

var markers = [];
for (var i in places) {
    markers.push(
        L.marker(places[i], {
            draggable: true,
        })
            .bindPopup("<b>" + i + "</b><br>" + loremIpsum)
            .bindTooltip(
                "<b>" + i + "</b>",
                markers.length
                    ? {}
                    : {
                          direction: "right",
                          permanent: true,
                      }
            )
            .addTo(map)
    );
}

var path = L.polyline(route, {
    renderer: L.canvas(),
}).addTo(map);

var circle = L.circle([53, 4], 111111).addTo(map);

var polygon = L.polygon([
    [48, -3],
    [50, -4],
    [52, 4],
]).addTo(map);

// Display some debug info
L.Rotate.debug(map);
