import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Http, Response } from "@angular/http"
import { Observable }     from 'rxjs/Observable';
import { LeafletMapComponent } from "../leaflet-map/leaflet-map.component"
import { EventService } from "../event/event.service"
import { UserService } from "../user/user.service"
import "/app/shared/rxjs-operators"
import { Rest } from "../shared/rest"

class MetaPolygon {
    public centroid: Centroid
    public id: number
    public voted: boolean
}

class Centroid {
    public lat: number
    public lng: number
}

class Polygon {
    public type: string
    public id: number
    public geometry: any
    public vote: Vote
}

enum Vote {
    damage,
    no_damage,
    unsure,
    not_evaluated
}

@Injectable()
export class PolygonService {
    private eventId: number
    private _centroidList: MetaPolygon[] //Metadata of polygon
    private polygons: Map<number, Polygon> //Full polygon object
    private leafletMapComponent: LeafletMapComponent

    constructor(
        private rest: Rest,
        private eventService: EventService,
        private userService: UserService,
        private router: Router) { }

    public start(): Observable<Response> {
        try {
            var eventId = this.eventService.currentEvent.id
            if (this.eventId !== eventId) {
                this._centroidList = null
                this.polygons = new Map<number, Polygon>()
                this.eventId = eventId
                return this.getPolygonList(this.eventId)
            } else {
                console.log(`polygon.service.start() called. same event.`)
                return null
            }
        } catch (e) {
            console.error(e)
            this.router.navigate(['/events'])
        }
    }

    private getPolygonList(eventId: number) {
        if (!eventId) {
            throw new Error(`Not a valid event ID: ${eventId}`)
        }
        /**
         * 1. Get list of polygons, not concrete
         * 2. if this.eventId === null, initialize it with eventId
         * 3. if this.eventId !== eventId, replace polygonList with new value and destroy polygons 
         */
        var observable = this.rest.get(`/event/${this.eventId}/list`)
        observable.subscribe(
            data => {
                var response = data.json()
                this._centroidList = response.map(function mapper(elm) {
                    var polygonMetaData = {
                        'centroid': {
                            'lng': elm.lng,
                            'lat': elm.lat
                        },
                        'id': elm.id,
                        "vote" : elm.vote
                    }
                    return polygonMetaData
                })
                console.log("polygonlist ", this._centroidList)
            },
            error => { console.error(error) }
        )
        return observable
    }

    public getInitialPolygon() {
        /**
         * Return random polygon with no vote. Otherwise return first polygon.
         */
        var unvotedList = this._centroidList.filter(metaPolygon => !metaPolygon.voted)
        var centroid = this._centroidList[0].centroid
        if (unvotedList.length > 0) {
            centroid = unvotedList[Math.floor(Math.random() * this._centroidList.length)].centroid
        }
        console.log("getInitialPolygon called", centroid)
        return [centroid.lat, centroid.lng]
    }

    public scanArea(bounds: any): void {
        console.time("scan")
        let visible = this._centroidList.filter(function (elm) {
            if (elm.centroid.lat <= bounds.lat_max
                && elm.centroid.lat >= bounds.lat_min
                && elm.centroid.lng <= bounds.lon_max
                && elm.centroid.lng >= bounds.lon_min) {
                return true
            } else {
                return false
            }
        }).map(centroid => {
            return centroid.id
        })
        console.timeEnd("scan")
        // visible.forEach(function forEach(elm){

        // })
        let idsCached = visible.filter(id => {
            if (this.polygons.get(id) !== null) {
                return true
            } else {
                return false
            }
        })
        this.clearPolygons()
        this.renderPolygons(idsCached)
        let idsToFetch = visible.filter((id) => {
            if (this.polygons.has(id)) {
                return false
            } else {
                this.polygons.set(id, null)
                return true
            }
        })
        this.getPolygons(idsToFetch)
    }

    public getPolygons(polygonIds: number[]): any[] {
        //TODO
        /**
         * 1. Get list of polygons, not concrete polygons
         * 2. Get initial polygon. Should this come with the list at the same time? probably
         * 3. 
         */
        this.rest.post(`/user/${this.userService.username}/event/${this.eventService.currentEvent.id}/polygon/${polygonIds.join(",")}`)
            .subscribe(data => {
                let body = data.json()
                let polygons = body.polygons
                if (polygons && polygons.length > 0) {
                    polygons.forEach((polygon) => {
                        if (this.polygons.has(polygon.id) && this.polygons.get(polygon.id) === null) {
                            this.polygons.set(polygon.id, { 
                                'type' : 'Feature',
                                'geometry' : JSON.parse(polygon.geometry_json),
                                'id' : polygon.id,
                                'vote' : polygon.vote
                            })
                            // console.log({ 
                            //     'type' : 'Feature',
                            //     'geometry' : JSON.parse(polygon.geometry_json),
                            //     'id' : polygon.id,
                            //     'vote' : polygon.vote
                            // })
                        } else {
                            console.warn(`Duplicate polygon`)
                        }
                    })
                    this.renderPolygons(polygonIds)
                }
            }, error => {

            })
        return null
    }

    public refreshPolygon(id: number): void { 
        /**
         * Force fetching of polygon when data needs to be updated.
         */
        this.rest.post(`/user/${this.userService.username}/event/${this.eventService.currentEvent.id}/polygon/${ id }`)
            .subscribe(data => {
                //TODO
            })
    }

    public submitVote(value: Vote, id: number) {
        this.rest.post(`/event/${ this.eventId }/polygon/${ id }`, { 'username' : this.userService.username, 'vote' : value}).subscribe(data => {
            console.log(`vote result`, data.json())
        })
    }

    public subscribe(leafletMapComponent: LeafletMapComponent) {
        this.leafletMapComponent = leafletMapComponent
    }

    private renderPolygons(ids: number[]): void {
        var polygons = new Array()
        ids.forEach(id => {
            if (this.polygons.get(id)) {
                polygons.push(this.polygons.get(id))
            }
        })
        this.leafletMapComponent.renderPolygons(polygons)
    }

    private clearPolygons(): void {
        this.leafletMapComponent.clearPolygons()
    }

    public get centroidList(): MetaPolygon[] {
        return this._centroidList
    }
}