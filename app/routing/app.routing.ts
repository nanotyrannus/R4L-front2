import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from '../home/home.component'
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component'
import { EventComponent } from '../event/event.component'
import { AdminComponent } from '../user/admin.component'
import { EventDetailComponent } from '../event/event-detail.component'
import { LoggedInGuard } from "./logged-in.guard"

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'map',
    component: LeafletMapComponent
  },
  {
    path: 'events',
    component: EventComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'details',
    component: EventDetailComponent,
    canActivate: [LoggedInGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes)