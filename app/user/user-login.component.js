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
var rest_1 = require("../shared/rest");
require("/app/shared/rxjs-operators");
var UserLoginComponent = (function () {
    function UserLoginComponent(http, rest) {
        this.http = http;
        this.rest = rest;
        this.onChangeForm = new core_1.EventEmitter();
    }
    UserLoginComponent.prototype.login = function () {
        this.rest.post("/user/login", {
            "username": this.username,
            "password": this.password
        }, null).subscribe(function (data) {
            console.log(data.json());
        }, function (error) {
            console.error(error);
        });
    };
    UserLoginComponent.prototype.test = function () {
        console.log("test: " + this.username + " " + this.password);
    };
    UserLoginComponent.prototype.changeForm = function () {
        console.log("changeForm called");
        this.onChangeForm.emit(true);
    };
    __decorate([
        core_1.Input('str'), 
        __metadata('design:type', String)
    ], UserLoginComponent.prototype, "someString", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserLoginComponent.prototype, "onChangeForm", void 0);
    UserLoginComponent = __decorate([
        core_1.Component({
            selector: "login-component",
            templateUrl: "/app/user/user-login.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, rest_1.Rest])
    ], UserLoginComponent);
    return UserLoginComponent;
}());
exports.UserLoginComponent = UserLoginComponent;
//# sourceMappingURL=user-login.component.js.map