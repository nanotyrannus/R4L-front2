"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('../home/home.component');
var leaflet_map_component_1 = require('../leaflet-map/leaflet-map.component');
var event_component_1 = require('../event/event.component');
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'map',
        component: leaflet_map_component_1.LeafletMapComponent
    },
    {
        path: 'events',
        component: event_component_1.EventComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map