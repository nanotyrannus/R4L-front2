import { Component } from "@angular/core"
import { Rest } from "../shared/rest"
import { CookieService } from "angular2-cookie/core"
import { UserService} from "../user/user.service"
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
    private username: string

    public constructor(private cookieService: CookieService, private userService: UserService) {
        
        this.uploader.setOptions({
            "authToken" : `Bearer ${ this.cookieService.get("token")}`,
            "x-username" : this.cookieService.get("username")
        })
    }

    ngOnInit() {
        this.username = this.userService.username
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

}