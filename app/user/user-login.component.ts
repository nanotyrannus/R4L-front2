import { Component, Input } from "@angular/core"

@Component({
    selector: "login-component",
    template: `<label>Username or Email</label><input type="text">`
})
export class UserLoginComponent {
    @Input('str') someString: string
}