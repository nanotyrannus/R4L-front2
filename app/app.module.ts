import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }   from './app.component';
import { FirstComponent } from './first.component'
import { HomeComponent } from './home.component'
import { EventsComponent } from './events.component'
import { LeafletMapComponent } from './leaflet-map.component'
import { routing }        from './app.routing';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    FirstComponent,
    LeafletMapComponent,
    EventsComponent
  ],
  providers: [
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
