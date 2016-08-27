import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from '../home/home.component'
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component'
import { EventComponent } from '../event/event.component'

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'map',
    component: LeafletMapComponent
  },
  {
    path: 'events',
    component: EventComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes)