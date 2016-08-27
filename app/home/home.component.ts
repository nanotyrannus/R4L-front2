import { Component } from "@angular/core"
import { Http, Response } from "@angular/http"
import { DataService } from "../data.service"
import { EventService } from "../event/event.service"


import "/app/shared/rxjs-operators"

@Component({
    selector: "my-home",
    templateUrl: "/app/home/home.html"
})

export class HomeComponent {

    myString: string = "hello"
    query: string
    response: string
    constructor(private dataService: DataService, private eventService: EventService) {}

    ngOnInit() {
        console.log("Home Component Initialized!")
        this.ping()
    }

    test() {
        console.log("TEST")
    }

    getData() {
        this.dataService.getData(this.query)
                        .subscribe(
                            data => { 
                                this.response = JSON.stringify(data.json(), null, 2)
                             },
                            error => { console.error(error) }
                        )
    }

    ping() {
        this.eventService.getEvents()
                         .subscribe(
                             data => {
                                 console.log(data)
                             },
                             error => {
                                 console.error(error)
                             }
                         )
    }
}