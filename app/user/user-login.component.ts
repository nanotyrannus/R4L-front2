import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Observable }     from 'rxjs/Observable'
import { Http, Response, RequestOptions } from "@angular/http"
import { baseUrl } from "../shared/config"
import "/app/shared/rxjs-operators"

@Component({
    selector: "login-component",
    templateUrl: "/app/user/user-login.html"
})
export class UserLoginComponent {
    @Input('str') public someString: string
    @Output() public onChangeForm = new EventEmitter<boolean>()
    private username: string
    private password: string

    public constructor(public http: Http) { }

    public login() {
        var requestOptions = new RequestOptions({
            "withCredentials": true
        })
        this.http.post(`${baseUrl}/user/login`, {
            "username": this.username,
            "password": this.password
        }, requestOptions
        ).subscribe(data => {
            console.log(data.json())
        }, error => {
            console.error(error)
        })
    }

    public test() {
        console.log(`test: ${this.username} ${this.password}`)
    }

    public changeForm() {
        console.log("changeForm called")
        this.onChangeForm.emit(true)
    }
}