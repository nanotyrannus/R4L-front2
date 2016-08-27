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

import { DataService } from './data.service'
import { EventService} from './event/event.service'
import { UserService } from './user/user.service'

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
    EventComponent
  ],
  providers: [
    DataService,
    EventService,
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
