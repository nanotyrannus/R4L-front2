import { NgModule }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'
import { FormsModule }    from '@angular/forms'
import { routing }        from './routing/app.routing'
import { HttpModule }     from '@angular/http'

import { AppComponent }   from './app.component'
import { HomeComponent } from './home/home.component'
import { UserLoginComponent } from './user/user-login.component'
import { EventComponent } from './event/event.component'
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component'
import { AdminComponent } from './user/admin.component'
import { UploadComponent } from './user/upload.component'
import { EventCardComponent } from './event/event-card.component'
import { EventDetailComponent } from './event/event-detail.component'

import { DataService } from './data.service'
import { EventService} from './event/event.service'
import { UserService } from './user/user.service'
import { CookieService } from "angular2-cookie/core"
import { PolygonService } from "./polygon/polygon.service"
import { LoggedInGuard } from "./routing/logged-in.guard"
import { Rest } from "./shared/rest"

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    UserLoginComponent,
    LeafletMapComponent,
    EventComponent,
    EventDetailComponent,
    AdminComponent,
    UploadComponent
  ],
  providers: [
    DataService,
    EventService,
    UserService,
    CookieService,
    PolygonService,
    LoggedInGuard,
    Rest
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
