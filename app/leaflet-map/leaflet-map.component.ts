
import { Component, OnInit } from "@angular/core"
import * as L from "leaflet"

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
        }

@Component({
    selector: "my-map",
    template: `
    <div>Map below</div>
    <div id="map" style="height: 75%;"></div>
    `
    // styleUrls: ['/node_modules/leaflet/dist/leaflet.css']
})

export class LeafletMapComponent implements OnInit {
    private leafletMap: any

    constructor() {}

    ngOnInit() {
        /**
         * Since this comp is destroyed when routed, call PolygonService.start on init
         * start() should only poll the server if this component corresponds to a different event than before
         */
        this.leafletMap = L.map("map").setView([34.198649, -118.174585], 15)
        this.leafletMap.on("layeradd", (event) => {
            if (event.layer.feature) {
                console.log(event.layer._leaflet_id)
            }
        })
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'your.mapbox.project.id',
            accessToken: 'pk.eyJ1IjoibmFub3R5cmFubnVzIiwiYSI6ImNpcnJtMmNubDBpZTN0N25rZmMxaHg4ZHQifQ.vj7pif8Z4BVhbYs55s1tAw'
        }).addTo(this.leafletMap);
        // var circle = L.circle([34.198, -118.174], 500)
        // circle.addTo(this.leafletMap)

        var geoJsonGroup = L.geoJson(o)
        geoJsonGroup.addTo(this.leafletMap)
        this.leafletMap.setView([27.524567504500027, 85.45490247750004])
        setTimeout(()=>{
            geoJsonGroup.removeLayer("" + 24)
            // geoJsonGroup.addTo(this.leafletMap)
        }, 2000)
    }
    
    notify() {
        /**
         * should be called by polygonservice when new data is recieved
         */
    }
}