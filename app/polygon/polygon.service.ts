import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Observable }     from 'rxjs/Observable';
import { LeafletMapComponent } from "../leaflet-map/leaflet-map.component"
import "/app/shared/rxjs-operators"

@Injectable()
export class PolygonService {
    private eventId: number
    private polygonList: any
    private polygons: any[]
    private leafletMapComponent: LeafletMapComponent

    constructor() {}

    public start(eventId: number) {

    }

    public getPolygonList(eventId: number) {
        /**
         * 1. Get list of polygons, not concrete
         * 2. if this.eventId === null, initialize it with eventId
         * 3. if this.eventId !== eventId, replace polygonList with new value and destroy polygons 
         */
    }

    public getInitialPolygon() {

    }

    public getPolygons(polygonIds: number[]): any[] {
        //TODO
        /**
         * 1. Get list of polygons, not concrete polygons
         * 2. Get initial polygon. Should this come with the list at the same time? probably
         * 3. 
         */
        return null
    }

    public setPolygonScore() {

    }

    public subscribe(leafletMapComponent: LeafletMapComponent) {
        this.leafletMapComponent = leafletMapComponent
    }
}