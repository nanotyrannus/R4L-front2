import { Http, Response } from "@angular/http"
import { Component, EventEmitter, Output } from "@angular/core"
import { Observable } from "rxjs/Observable"
import { baseUrl } from "../shared/config"

@Component({
    "selector" : "signup-component",
    "templateUrl" : "/app/user/user-signup.html"
})
export class UserSignupComponent {
    @Output() public onChangeForm = new EventEmitter<boolean>()
    private firstName: string
    private lastName: string
    private username: string
    private email: string
    private password: string

    public constructor(public http: Http) {}

    /**
     * Requests user creation from server.
     */ 
    public signup(): void {
        let observable: Observable<Response> = this.http.post(`${ baseUrl }/user/create`, {
            "username" : this.username,
            "password" : this.password,
            "email" : this.email,
            "first_name" : this.firstName,
            "last_name" : this.lastName
        })
        
        observable.subscribe(data => {
            console.log(data)
        }, error => {
            console.error(error)
        })
    }

    /**
     * Switches to login form component.
     */
    public changeForm(): void {
        this.onChangeForm.emit(false)
    }
}
