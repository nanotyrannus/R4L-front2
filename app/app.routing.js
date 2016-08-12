"use strict";
var router_1 = require('@angular/router');
var first_component_1 = require('./first.component');
var home_component_1 = require('./home.component');
var leaflet_map_component_1 = require('./leaflet-map.component');
var events_component_1 = require('./events.component');
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'first',
        component: first_component_1.FirstComponent
    },
    {
        path: 'map',
        component: leaflet_map_component_1.LeafletMapComponent
    },
    {
        path: 'events',
        component: events_component_1.EventsComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map