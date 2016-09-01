import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Observable }     from 'rxjs/Observable'
import "/app/shared/rxjs-operators"

@Injectable()
export class DataService {

    private apiUrl = "http://localhost:8080/axis2/services/MODAPSservices/"

    constructor(private http: Http) { console.log("DataService created.") }

    getData(endpoint: string): Observable<any> {
        return this.http.get(this.apiUrl + endpoint)
    }
}

//searchForFiles?products=MOD08_D3&startTime=2016-08-00&endTime=2016-08-10&north=90&south=-90&east=180&west=-180&coordsOrTiles=global
//searchForFiles?products=NL3DT_A&startTime=2016-08-00&endTime=2016-08-10&north=90&south=-90&east=180&west=-180&coordsOrTiles=globalAlso, I'm not sure which pole is north. 