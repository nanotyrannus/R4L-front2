import { Component, OnInit } from "@angular/core"

@Component({
    selector: "my-first",
    template: `
        <div>First Component Loaded {{ date }}</div>
    `
})

export class FirstComponent {
    date: Date

    ngOnInit() {
        this.date = new Date()
    }
}