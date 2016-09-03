"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var L = require("leaflet");
var o = {
    "properties": {
        "name": 50,
        "boundingBox": [
            85.45406860400004,
            85.45573635100004,
            27.52428954700002,
            27.52484546200003
        ],
        "centroid": {
            "lng": 85.45490247750004,
            "lat": 27.524567504500027
        }
    },
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    85.45545839300007,
                    27.52484546200003
                ],
                [
                    85.45518043500005,
                    27.52484546200003
                ],
                [
                    85.45490247700008,
                    27.52484546200003
                ],
                [
                    85.45462452000004,
                    27.52484546200003
                ],
                [
                    85.45406860400004,
                    27.52484546200003
                ],
                [
                    85.45406860400004,
                    27.52456750400006
                ],
                [
                    85.45462452000004,
                    27.52456750400006
                ],
                [
                    85.45490247700008,
                    27.52456750400006
                ],
                [
                    85.45518043500005,
                    27.52456750400006
                ],
                [
                    85.45518043500005,
                    27.5242248954700002
                ],
                [
                    85.45545839300007,
                    27.52428954700002
                ],
                [
                    85.45573635100004,
                    27.52428954700002
                ],
                [
                    85.45573635100004,
                    27.52456750400006
                ],
                [
                    85.45545839300007,
                    27.52456750400006
                ],
                [
                    85.45545839300007,
                    27.52484546200003
                ]
            ]
        ],
        "crs": {
            "type": "name",
            "properties": {
                "name": "EPSG:4326"
            }
        }
    },
    "id": "50"
};
var LeafletMapComponent = (function () {
    function LeafletMapComponent() {
    }
    LeafletMapComponent.prototype.ngOnInit = function () {
        /**
         * Since this comp is destroyed when routed, call PolygonService.start on init
         * start() should only poll the server if this component corresponds to a different event than before
         */
        this.leafletMap = L.map("map").setView([34.198649, -118.174585], 15);
        this.leafletMap.on("layeradd", function (event) {
            if (event.layer.feature) {
                console.log(event.layer._leaflet_id);
            }
        });
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'your.mapbox.project.id',
            accessToken: 'pk.eyJ1IjoibmFub3R5cmFubnVzIiwiYSI6ImNpcnJtMmNubDBpZTN0N25rZmMxaHg4ZHQifQ.vj7pif8Z4BVhbYs55s1tAw'
        }).addTo(this.leafletMap);
        // var circle = L.circle([34.198, -118.174], 500)
        // circle.addTo(this.leafletMap)
        var geoJsonGroup = L.geoJson(o);
        geoJsonGroup.addTo(this.leafletMap);
        this.leafletMap.setView([27.524567504500027, 85.45490247750004]);
        setTimeout(function () {
            geoJsonGroup.removeLayer("" + 24);
            // geoJsonGroup.addTo(this.leafletMap)
        }, 2000);
    };
    LeafletMapComponent.prototype.notify = function () {
        /**
         * should be called by polygonservice when new data is recieved
         */
    };
    LeafletMapComponent = __decorate([
        core_1.Component({
            selector: "my-map",
            template: "\n    <div>Map below</div>\n    <div id=\"map\" style=\"height: 75%;\"></div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], LeafletMapComponent);
    return LeafletMapComponent;
}());
exports.LeafletMapComponent = LeafletMapComponent;
//# sourceMappingURL=leaflet-map.component.js.map