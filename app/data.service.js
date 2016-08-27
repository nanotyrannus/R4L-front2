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
require("/app/shared/rxjs-operators");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.apiUrl = "http://localhost:8080/axis2/services/MODAPSservices/";
        console.log("DataService created.");
    }
    DataService.prototype.getData = function (endpoint) {
        return this.http.get(this.apiUrl + endpoint);
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//searchForFiles?products=MOD08_D3&startTime=2016-08-00&endTime=2016-08-10&north=90&south=-90&east=180&west=-180&coordsOrTiles=global
//searchForFiles?products=NL3DT_A&startTime=2016-08-00&endTime=2016-08-10&north=90&south=-90&east=180&west=-180&coordsOrTiles=globalAlso, I'm not sure which pole is north.  
//# sourceMappingURL=data.service.js.map