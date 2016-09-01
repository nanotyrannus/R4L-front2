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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var config_1 = require("../shared/config");
var UserSignupComponent = (function () {
    function UserSignupComponent(http) {
        this.http = http;
        this.onChangeForm = new core_1.EventEmitter();
    }
    /**
     * Requests user creation from server.
     */
    UserSignupComponent.prototype.signup = function () {
        var observable = this.http.post(config_1.baseUrl + "/user/create", {
            "username": this.username,
            "password": this.password,
            "email": this.email,
            "first_name": this.firstName,
            "last_name": this.lastName
        });
        observable.subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.error(error);
        });
    };
    /**
     * Switches to login form component.
     */
    UserSignupComponent.prototype.changeForm = function () {
        this.onChangeForm.emit(false);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserSignupComponent.prototype, "onChangeForm", void 0);
    UserSignupComponent = __decorate([
        core_1.Component({
            "selector": "signup-component",
            "templateUrl": "/app/user/user-signup.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserSignupComponent);
    return UserSignupComponent;
}());
exports.UserSignupComponent = UserSignupComponent;
//# sourceMappingURL=user-signup.component.js.map