import { Component } from "@angular/core"
import { Rest } from "../shared/rest"
import { CookieService } from "angular2-cookie/core"
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common'
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from '../../node_modules/ng2-file-upload'

const URL = "http://localhost:3030/event"


@Component({
    "selector": "uploader-component",
    "templateUrl": "/app/user/upload.html",
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class UploadComponent {

    public uploader: FileUploader = new FileUploader({ url: URL });
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    public constructor(private cookieService: CookieService) {
        
        this.uploader.setOptions({
            "authToken" : `Bearer ${ this.cookieService.get("token")}`,
            "x-username" : this.cookieService.get("username")
        })
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

}