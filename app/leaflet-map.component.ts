/// <reference path="/home/ryan/Development/Angular2-Examples/leaflet/typings/globals/leaflet/index.d.ts" />
import { Component, OnInit } from "@angular/core"
import * as L from "leaflet"

@Component({
    selector: "my-map",
    template: `
    <div>Map below</div>
    <div id="map" style="height: 75%;"></div>
    `
    // styleUrls: ['/node_modules/leaflet/dist/leaflet.css']
})

export class LeafletMapComponent implements OnInit {
    leafletMap: any
    ngOnInit() {
        console.log(L)
        this.leafletMap = L.map("map").setView([34.198649, -118.174585], 15)
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'your.mapbox.project.id',
            accessToken: 'pk.eyJ1IjoibmFub3R5cmFubnVzIiwiYSI6ImNpcnJtMmNubDBpZTN0N25rZmMxaHg4ZHQifQ.vj7pif8Z4BVhbYs55s1tAw'
        }).addTo(this.leafletMap);
    }
}