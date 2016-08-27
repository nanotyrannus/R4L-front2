import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Observable } from "rxjs/Observable"

@Injectable()
export class UserService {
    public constructor(private http: Http) {}

    public create(username: string, 
                  email: string, 
                  firstName: string, 
                  lastName: string, 
                  password: string): Observable<Response> {
        return this.http.post(`${ window.location.hostname }:3000/user/create`, {
            "username": username,
            "password": password,
            "email": email,
            "first_name": firstName,
            "last_name": lastName
        })
    }
    
    public login() {}
}