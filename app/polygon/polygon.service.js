"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
require("/app/shared/rxjs-operators");
var PolygonService = (function () {
    function PolygonService() {
    }
    PolygonService.prototype.start = function (eventId) {
    };
    PolygonService.prototype.getPolygonList = function (eventId) {
        /**
         * 1. Get list of polygons, not concrete
         * 2. if this.eventId === null, initialize it with eventId
         * 3. if this.eventId !== eventId, replace polygonList with new value and destroy polygons
         */
    };
    PolygonService.prototype.getInitialPolygon = function () {
    };
    PolygonService.prototype.getPolygons = function (polygonIds) {
        //TODO
        /**
         * 1. Get list of polygons, not concrete polygons
         * 2. Get initial polygon. Should this come with the list at the same time? probably
         * 3.
         */
        return null;
    };
    PolygonService.prototype.setPolygonScore = function () {
    };
    PolygonService.prototype.subscribe = function (leafletMapComponent) {
        this.leafletMapComponent = leafletMapComponent;
    };
    PolygonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PolygonService);
    return PolygonService;
}());
exports.PolygonService = PolygonService;
//# sourceMappingURL=polygon.service.js.map