import { Routes, RouterModule } from '@angular/router';
import { FirstComponent } from './first.component'
import { HomeComponent } from './home.component'
import { LeafletMapComponent } from './leaflet-map.component'
import { EventsComponent } from './events.component'

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'first',
    component: FirstComponent
  },
  {
    path: 'map',
    component: LeafletMapComponent
  },
  {
    path: 'events',
    component: EventsComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes)