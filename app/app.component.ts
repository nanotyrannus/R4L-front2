import { Component } from "@angular/core"
import { UserService } from "./user/user.service"

@Component({
  selector: "app-component",
  templateUrl: "/app/app.html"
})

export class AppComponent {

  public constructor(private userService: UserService) {}

  public logout() {
    this.userService.logout()
  }
}