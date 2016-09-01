import { Component } from "@angular/core"
import { Http, Response } from "@angular/http"
import { DataService } from "../data.service"
import { EventService } from "../event/event.service"
import { CookieService } from "angular2-cookie/core"
import { UserSignupComponent } from "../user/user-signup.component"
import { UserLoginComponent } from "../user/user-login.component" 

import "/app/shared/rxjs-operators"

@Component({
    selector: "my-home",
    templateUrl: "/app/home/home.html",
    directives: [UserSignupComponent, UserLoginComponent]
})

export class HomeComponent {

    myString: string = "hello"
    isNewUser: boolean = false
    query: string
    response: string
    constructor(private dataService: DataService, 
                private eventService: EventService, 
                private http: Http,
                private cookieService: CookieService) {}

    ngOnInit() {
        console.log("Home Component Initialized!")
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
       this.http.get(`http://localhost:3030/ping_`)
                .subscribe(data => { 
                    console.log(data) 
                }, error => {
                    console.error(error)
                })
    }

    onChangeForm(isNewUser: boolean): void {
        console.log("onChangeForm called")
        this.isNewUser = isNewUser
    }
    
}