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
var data_service_1 = require("../data.service");
var event_service_1 = require("../event/event.service");
require("/app/shared/rxjs-operators");
var HomeComponent = (function () {
    function HomeComponent(dataService, eventService) {
        this.dataService = dataService;
        this.eventService = eventService;
        this.myString = "hello";
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log("Home Component Initialized!");
        this.ping();
    };
    HomeComponent.prototype.test = function () {
        console.log("TEST");
    };
    HomeComponent.prototype.getData = function () {
        var _this = this;
        this.dataService.getData(this.query)
            .subscribe(function (data) {
            _this.response = JSON.stringify(data.json(), null, 2);
        }, function (error) { console.error(error); });
    };
    HomeComponent.prototype.ping = function () {
        this.eventService.getEvents()
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.error(error);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "my-home",
            templateUrl: "/app/home/home.html"
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, event_service_1.EventService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map