import { Component } from "@angular/core"
import { UploadComponent } from "./upload.component"

@Component({
    "selector" : "admin-component",
    "template" : `<uploader-component></uploader-component>`,
    "directives" : [UploadComponent]
})
export class AdminComponent {

}