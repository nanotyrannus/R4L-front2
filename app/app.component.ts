import { Component } from "@angular/core"


@Component({
  selector: "app-component",
  template: `
  <a routerLink="/">HOME</a>
  <a routerLink="/events">EVENTS</a>
  <a routerLink="/map">MAP</a>
  <router-outlet></router-outlet>
  `  
})

export class AppComponent {

}