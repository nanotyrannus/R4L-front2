import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Observable }     from 'rxjs/Observable'
import { Response, RequestOptions } from "@angular/http"
import { Rest } from "../shared/rest"
import { CookieService } from "angular2-cookie/core"
import { UserService } from "../user/user.service"
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

    public constructor(private userService: UserService, private rest: Rest, private cookieService: CookieService) { }

    ngOnInit() {
        console.log(`The string: ${ this.someString }`)
    }

    public login() {
        this.userService.login(this.username, this.password)
    }

    public test() {
        console.log(`test: ${this.username} ${this.password}`)
    }

    public changeForm() {
        console.log("changeForm called")
        this.onChangeForm.emit(true)
    }
}