import { Component } from "@angular/core"
import { UserService } from "./user/user.service"

@Component({
  selector: "app-component",
  template: `
  <a routerLink="/">HOME</a>
  <a routerLink="/events">EVENTS</a>
  <a routerLink="/map">MAP</a>
  <a routerLink="/admin">ADMIN</a>
  <button (click)="logout()">LOGOUT</button>
  <router-outlet></router-outlet>
  `  
})

export class AppComponent {

  public constructor(private userService: UserService) {}

  public logout() {
    this.userService.logout()
  }
}