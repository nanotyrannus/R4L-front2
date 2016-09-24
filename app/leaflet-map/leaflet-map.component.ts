
import { Component, OnInit } from "@angular/core"
import { EventService } from "../event/event.service"
import { PolygonService } from "../polygon/polygon.service"
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
    private leafletMap: any
    private geoJsonLayerGroup: any
    private timeoutId: number

    constructor(private polygonService: PolygonService, private eventService: EventService) { }

    ngOnInit() {
        /**
         * Since this comp is destroyed when routed, call PolygonService.start on init
         * start() should only poll the server if this component corresponds to a different event than before
         */

        this.leafletMap = L.map("map", {'minZoom' : 10}).setView([0, 0])
        this.polygonService.subscribe(this)
        this.leafletMap.on("layeradd", (event) => {
            // if (event.layer.feature) {
            //     console.log("layeradd event", event.layer.feature.vote)
            // }
        })
        this.geoJsonLayerGroup = L.geoJson()
        this.geoJsonLayerGroup.addTo(this.leafletMap)


        this.leafletMap.on("moveend", () => {
            // console.log(`Leaflet map moved! Bounds:`, this.getBounds())
            this.polygonService.scanArea(this.getBounds())
        })

        var dragTick = 0
        this.leafletMap.on("drag", () => {
            dragTick++
            if (dragTick > 20) {
                this.polygonService.scanArea(this.getBounds())
                dragTick = 0
            }
            // if (this.timeoutId) {
            //     clearTimeout(this.timeoutId)
            // }
            // this.timeoutId = window.setTimeout(() => {
            //     this.polygonService.scanArea(this.getBounds())
            // }, 50)
        })

        this.leafletMap.on("dragend", ()=> {
            this.polygonService.scanArea(this.getBounds())
            dragTick = 0
        })

        var observer = this.polygonService.start()
        if (observer) {
            observer.subscribe(data => {
                console.warn(`async'ly set view`)
                this.leafletMap.setView(this.polygonService.getInitialPolygon(), 15)
                this.leafletMap.setMaxBounds(this.eventService.currentEvent.boundingBox)
                this.initMapLayer()
            })
        } else {
            console.warn(`sync'ly set view`)
            this.leafletMap.setView(this.polygonService.getInitialPolygon(), 15)
            this.initMapLayer()
        }
    }

    notify() {
        /**
         * should be called by polygonservice when new data is recieved
         */
    }

    public renderPolygons(polygons: any[]) {
        polygons.forEach(polygon => {
            this.geoJsonLayerGroup.addData(polygon)
        })
    }

    public clearPolygons(): void {
        this.geoJsonLayerGroup.clearLayers()
    }

    private initMapLayer(): void {
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'your.mapbox.project.id',
            accessToken: 'pk.eyJ1IjoibmFub3R5cmFubnVzIiwiYSI6ImNpcnJtMmNubDBpZTN0N25rZmMxaHg4ZHQifQ.vj7pif8Z4BVhbYs55s1tAw'
        }).addTo(this.leafletMap);
    }

    private getBounds(): any {
        var b = this.leafletMap.getBounds()
        return {
            "lat_max": b._northEast.lat,
            "lon_max": b._northEast.lng,
            "lat_min": b._southWest.lat,
            "lon_min": b._southWest.lng
        }
    }
}