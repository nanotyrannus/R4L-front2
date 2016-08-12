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
var contains_pipe_1 = require("./contains.pipe");
var EventsComponent = (function () {
    function EventsComponent() {
        this.events = [
            new Event("Tacloban", 20),
            new Event("Nepal", 15),
            new Event("New Guinea", 37),
            new Event("Guangdong", 187),
            new Event("Kashmir", 47),
            new Event("Bali", 17),
            new Event("Jammu", 13),
            new Event("San Fransisco", 17),
            new Event("Fukushima", 43),
            new Event("Pyongyang", 210)
        ];
    }
    EventsComponent = __decorate([
        core_1.Component({
            selector: 'my-events',
            template: "\n    <input [(ngModel)]=\"query\" placeholder=\"Search\">\n    <span *ngIf=\"query\">{{query}}</span>\n    <ul>\n    <li *ngFor=\"let event of events\" >\n    <div class=\"event-container\" *ngIf=\"event.name | contains:query\">\n        <div class=\"event-title\">{{ event.name | uppercase }}</div>\n        <div class=\"event-body\">The {{ event.name }} event has {{ event.sites }} sites to be evaluated.</div>\n    </div>\n    </li>\n    </ul>\n    ",
            styles: [
                "ul { list-style-type: none; }",
                ".event-title { font-size: 1.5em; }"
            ],
            pipes: [contains_pipe_1.ContainsPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
var Event = (function () {
    function Event(name, sites) {
        this.name = name;
        this.sites = sites;
    }
    return Event;
}());
//# sourceMappingURL=events.component.js.map