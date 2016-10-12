import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Router } from "@angular/router"
import { Observable } from "rxjs/Observable"
import { Subject } from "rxjs/Subject"
import { Rest } from "../shared/rest"
import { CookieService } from "angular2-cookie/core"

@Injectable()
export class UserService {

    private _isLoggedIn: boolean
    private _isAdmin: boolean
    private _username: string
    private _loginSubject = new Subject<any>()
    private _signupSubject = new Subject<any>()

    public constructor(private rest: Rest, private cookieService: CookieService, private router: Router) {
        this._isLoggedIn = Boolean(this.cookieService.get("token"))
        this._isAdmin = Boolean(this.cookieService.get("admin"))
        this._username = String(this.cookieService.get("username"))
    }

    public login(username, password) {
        var observable = new Observable()
        this.rest.post(`/user/login`, {
            "username": username,
            "password": password
        }, null).subscribe(data => {
            let body = data.json()
            if (!body.success) {
                this._loginSubject.next(true)
                return
            }
            this.cookieService.put("username", username)
            this._username = username
            this._isLoggedIn = true
            this.isAdmin = body.is_admin
            this.cookieService.put("admin", body.is_admin)
            this.cookieService.put("token", body.token, { "expires": (new Date(Date.now() + body.expires_in)) })
            this.router.navigate(["/events"])
        })
    }

    public signup(username: string, password: string, email: string, firstName: string, lastName: string): void {
        let observable: Observable<Response> = this.rest.post(`/user/create`, {
            "username": username,
            "password": password,
            "email": email,
            "first_name": firstName,
            "last_name": lastName
        }, null)

        observable.subscribe(data => {
            let body = data.json()
            if (body.success ==! undefined && !body.success) {
                this._signupSubject.next(true)
                return
            }
            this.cookieService.put('token', body.token, { "expires": (new Date(Date.now() + body.expires_in)) })
            console.log(data)
            this._isLoggedIn = true
        }, error => {
            console.error(error)
            this._isLoggedIn = false
        })
    }

    public logout(): void {
        this.cookieService.remove("token")
        this.cookieService.remove("username")
        this.cookieService.remove("admin")
        this.router.navigate([''])
    }

    get isLoggedIn(): boolean {
        return this._isLoggedIn
    }

    get isAdmin(): boolean {
        return this._isAdmin
    }

    set isAdmin(value: boolean) {
        this._isAdmin = value
    }

    get username(): string {
        return this._username
    }

    get loginSubject(): Subject<any> {
        return this._loginSubject
    }

    get signupSubject(): Subject<any> {
        return this._signupSubject
    }
}