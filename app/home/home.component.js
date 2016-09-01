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
var http_1 = require("@angular/http");
var data_service_1 = require("../data.service");
var event_service_1 = require("../event/event.service");
var core_2 = require("angular2-cookie/core");
var user_signup_component_1 = require("../user/user-signup.component");
var user_login_component_1 = require("../user/user-login.component");
require("/app/shared/rxjs-operators");
var HomeComponent = (function () {
    function HomeComponent(dataService, eventService, http, cookieService) {
        this.dataService = dataService;
        this.eventService = eventService;
        this.http = http;
        this.cookieService = cookieService;
        this.myString = "hello";
        this.isNewUser = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log("Home Component Initialized!");
    };
    HomeComponent.prototype.getData = function () {
        var _this = this;
        this.dataService.getData(this.query)
            .subscribe(function (data) {
            _this.response = JSON.stringify(data.json(), null, 2);
        }, function (error) { console.error(error); });
    };
    HomeComponent.prototype.ping = function () {
        this.http.get("http://localhost:3030/ping_")
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.error(error);
        });
    };
    HomeComponent.prototype.onChangeForm = function (isNewUser) {
        console.log("onChangeForm called");
        this.isNewUser = isNewUser;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "my-home",
            templateUrl: "/app/home/home.html",
            directives: [user_signup_component_1.UserSignupComponent, user_login_component_1.UserLoginComponent]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, event_service_1.EventService, http_1.Http, core_2.CookieService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map