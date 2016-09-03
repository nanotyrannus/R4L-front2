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
var Observable_1 = require("rxjs/Observable");
var config_1 = require("./config");
/**
 * Wrapper class for Http. Simply listens for application-level
 * status codes.
 */
var Rest = (function () {
    function Rest(http) {
        this.http = http;
    }
    Rest.prototype.post = function (endpoint, body, options) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.http.post("" + config_1.baseUrl + endpoint, body, options).subscribe(function (data) {
                var body = data.json();
                if (!body.status) {
                    console.warn("No property 'status' on " + data.url);
                }
                if (body.status && body.status != 200) {
                    observer.error(new Error("Status code " + data.status + ", " + data.url));
                    observer.complete();
                }
                observer.next(data);
                observer.complete();
            }, function (error) {
                observer.error(error);
                observer.complete();
            });
        });
    };
    Rest.prototype.get = function (endpoint) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.http.get(endpoint).subscribe(function (data) {
                var body = data.json();
                if (!body.status) {
                    console.warn("No property 'status' on " + data.url);
                }
                if (body.status && body.status != 200) {
                    observer.error(new Error("Status code " + data.status + ", " + data.url));
                    observer.complete();
                }
                observer.next(data);
                observer.complete();
            }, function (error) {
                observer.error(error);
                observer.complete();
            });
        });
    };
    Rest = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Rest);
    return Rest;
}());
exports.Rest = Rest;
//# sourceMappingURL=rest.js.map