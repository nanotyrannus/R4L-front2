import { Http, Response } from "@angular/http"
import { Component, EventEmitter, Output } from "@angular/core"
import { Observable } from "rxjs/Observable"
import { Rest } from "../shared/rest"
import { UserService } from "../user/user.service"
import { CookieService } from "angular2-cookie/core"

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

    public constructor(private userService: UserService, private rest: Rest, private cookieService: CookieService) {}

    /**
     * Requests user creation from server.
     */ 
    public signup(): void {
        this.userService.signup(this.username, this.password, this.email, this.firstName, this.lastName)
    }

    /**
     * Switches to login form component.
     */
    public changeForm(): void {
        this.onChangeForm.emit(false)
    }
}
