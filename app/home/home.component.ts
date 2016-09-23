import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { Rest } from "../shared/rest"
import { Http, Response } from "@angular/http"
import { DataService } from "../data.service"
import { EventService } from "../event/event.service"
import { CookieService } from "angular2-cookie/core"
import { UserService } from "../user/user.service"
import { UserSignupComponent } from "../user/user-signup.component"
import { UserLoginComponent } from "../user/user-login.component"

import "/app/shared/rxjs-operators"

@Component({
    selector: "my-home",
    templateUrl: "/app/home/home.html",
    directives: [UserSignupComponent, UserLoginComponent]
})

export class HomeComponent {

    myString: string = "helloollolololo"
    isNewUser: boolean = false
    query: string
    response: string
    constructor(
        private router: Router,
        private userService: UserService,
        private dataService: DataService,
        private eventService: EventService,
        private http: Http,
        private cookieService: CookieService,
        private rest: Rest) { }

    ngOnInit() {
        if (this.userService.isLoggedIn) {
            this.router.navigate(["/events"])
        }
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
        //    this.rest.get(`http://localhost:3030/ping`)
        //             .subscribe(data => { 
        //                 console.log(data) 
        //             }, error => {
        //                 console.error(error)
        //             })


        this.rest.post(`/ping`, { "foo": "bar" }, null)
            .subscribe(data => {
                console.log(data)
            }, error => {
                console.error(error)
            })


    }

    securedPing() {
        console.time("ping")
        this.rest.post(`/ping_`)
            .subscribe(data => {
                console.log(data)
                console.timeEnd("ping")
            }, error => {
                console.error(error)
            })
            
    }

    onChangeForm(isNewUser: boolean): void {
        console.log("onChangeForm called")
        this.isNewUser = isNewUser
    }

}