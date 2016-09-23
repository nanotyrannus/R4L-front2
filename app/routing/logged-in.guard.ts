import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { CookieService } from "angular2-cookie/core"

@Injectable()
export class LoggedInGuard implements CanActivate {

    public constructor(private router: Router, private cookieService: CookieService) {}

    public canActivate() {
        if (this.cookieService.get('token')) {
            return true
        } 
        this.router.navigate(['/'])
        return false
    }
}