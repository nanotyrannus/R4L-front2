import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Observable }     from 'rxjs/Observable'
import { Http, Response, RequestOptions } from "@angular/http"
import { Rest } from "../shared/rest"
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

    public constructor(public http: Http, private rest: Rest) { }

    public login() {
        this.rest.post(`/user/login`, {
            "username": this.username,
            "password": this.password
        }, null).subscribe(data => {
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