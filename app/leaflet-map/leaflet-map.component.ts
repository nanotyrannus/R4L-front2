
import { Component, OnInit } from "@angular/core"
import { EventService } from "../event/event.service"
import { PolygonService } from "../polygon/polygon.service"
import { UserService } from "../user/user.service"
import * as L from "leaflet"

enum Vote {
    damage,
    no_damage,
    unsure,
    not_evaluated
}

@Component({
    selector: "my-map",
    templateUrl: "/app/leaflet-map/leaflet-map.html"
    // styleUrls: ['/node_modules/leaflet/dist/leaflet.css']
})

export class LeafletMapComponent implements OnInit {
    private username: string
    private leafletMap: any
    private geoJsonLayerGroup: any
    private timeoutId: number
    private popup: any
    private eventName: string
    private keyState: any
    private selectedPolygon: any = null
    private nextPolygonId: number
    private satelliteLayer: any
    private terrainLayer: any

    constructor(private polygonService: PolygonService, private eventService: EventService, private userService: UserService) {
        this.keyState = {}
    }

    ngOnInit() {
        this.username = this.userService.username

        /**
         * Since this comp is destroyed when routed, call PolygonService.start on init
         * start() should only poll the server if this component corresponds to a different event than before
         */
        this.leafletMap = L.map("map", { 'minZoom': 10 }).setView([0, 0])
        this.popup = L.popup()
        // var div = document.createElement("div")
        // div.style.width = "100px"
        // div.style.height = "100px"
        // div.style.backgroundColor = "black"
        this.popup.setContent("hello")
        this.polygonService.subscribe(this)
        this.leafletMap.on("layeradd", (event) => {
            // if (event.layer.feature) {
            //     console.log("layeradd event", event.layer.feature.vote)
            // }
            let feature = event.layer.feature || null
            if (feature != null) {
                if (this.selectedPolygon && (feature.id === this.selectedPolygon.id || feature.id === this.nextPolygonId)) {
                    event.layer.setStyle(styles[feature.vote])
                    event.layer.setStyle(styles.clicked)
                    this.selectedPolygon = feature
                } else {
                    event.layer.setStyle(styles[feature.vote])
                }
            }
            event.layer.on("click", e => {
                if (e.layer) { // null check because leaflet fires click event twice
                    this.selectedPolygon = e.layer.feature
                    console.log(`selectedpolygon`, this.selectedPolygon)
                    e.layer.setStyle(styles.clicked)
                    this.leafletMap.setView(this.polygonService.centroidList[e.layer.feature.id].centroid)
                }
            })
        })
        // this.leafletMap.on("click", e => {
        //     this.popup.setLatLng(e.latlng).openOn(this.leafletMap)
        // })
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

        this.leafletMap.on("dragend", () => {
            this.polygonService.scanArea(this.getBounds())
            dragTick = 0
        })

        var observer = this.polygonService.start()
        var initialPolygon = this.polygonService.getInitialPolygon()
        var initialCentroid = [initialPolygon.centroid.lng, initialCentroid.lat]
        if (observer) {
            observer.subscribe(data => {
                console.warn(`async'ly set view`)
                this.eventName = this.eventService.currentEvent.name
                this.leafletMap.setView(initialCentroid, 15)
                this.leafletMap.setMaxBounds(this.eventService.currentEvent.boundingBox)
                this.initMapLayer()
            })
        } else {
            console.warn(`sync'ly set view`)
            this.eventName = this.eventService.currentEvent.name
            this.leafletMap.setView(initialCentroid, 15)
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
        this.satelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 19,
            id: 'your.mapbox.project.id',
            accessToken: 'pk.eyJ1IjoibmFub3R5cmFubnVzIiwiYSI6ImNpcnJtMmNubDBpZTN0N25rZmMxaHg4ZHQifQ.vj7pif8Z4BVhbYs55s1tAw'
        })
        this.terrainLayer = L.tileLayer('https://api.mapbox.com/styles/v1/nanotyrannus/citosvy3f00082il18xi6kuw9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFub3R5cmFubnVzIiwiYSI6ImNpcnJtMmNubDBpZTN0N25rZmMxaHg4ZHQifQ.vj7pif8Z4BVhbYs55s1tAw', {
            maxZoon: 19,
            id: 'your.mapbox.project.id'
        })
        this.satelliteLayer.addTo(this.leafletMap)
    }

    public getBounds(): any {
        var b = this.leafletMap.getBounds()
        return {
            "lat_max": b._northEast.lat,
            "lon_max": b._northEast.lng,
            "lat_min": b._southWest.lat,
            "lon_min": b._southWest.lng
        }
    }

    private gotoNext(): void {
        if (this.selectedPolygon == undefined) {
            return
        }
        var currentId = this.selectedPolygon.id
        var nextId = currentId + 1
        if (nextId > (this.polygonService.centroidList.length - 1)) {
            nextId = 0
        }
        this.nextPolygonId = nextId
        this.leafletMap.setView(this.polygonService.centroidList[nextId].centroid)
    }

    private gotoPrev(): void {
        //TODO
    }

    private submitVote(value: Vote): void {
        this.polygonService.submitVote(value, this.selectedPolygon.id).subscribe(data => {
            var body = data.json()
            this.polygonService.refreshPolygon(body.polygon_id)
            this.polygonService.scanArea(this.getBounds())
        })
    }

    private onKeyPress(event: any, value: string): void {
        if (event.keyCode === 78) {
            this.gotoNext()
        }
        else if (event.keyCode === 75) {
            this.renderTerrainLayer()
        }
    }

    private onKeyUp(event: any, value: string): void {
        console.log("keyup")
        if (event.keyCode === 75) {
            this.renderSatelliteLayer()
        }
    }

    private renderTerrainLayer(): void {
        this.leafletMap.removeLayer(this.satelliteLayer)
        this.leafletMap.addLayer(this.terrainLayer)
    }

    private renderSatelliteLayer(): void {
        this.leafletMap.removeLayer(this.terrainLayer)
        this.leafletMap.addLayer(this.satelliteLayer)
    }

    private logout(): void {
        this.userService.logout()
    }
}

var styles = {
    'not_evaluated': {
        'color': "#ff3f34",
        'fillOpacity': 0.5
    },
    'damage': {
        'color': "#ed0a3f",
        'fillOpacity': 0.9
    },
    'no_damage': {
        'color': "#44f1bd"
    },
    'unsure': {
        'color': "#8533fe"
    },
    'clicked': {
        'fillOpacity': 0.0
    }
}

var selectedStyles = {
    'not_evaluated': {
        'color': "#ff3f34",
        'fillOpacity': 0,
        'opacity': 1
    },
    'damage': {
        'color': "#ed0a3f"
    },
    'no_damage': {
        'color': ""
    },
    'unsure': {
        'color': ""
    }
}