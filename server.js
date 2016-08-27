"use strict"
var koa = require("koa")
var cors = require("koa-cors")
var request = require("koa-request")
var parser = require("xml2js").Parser()
var co = require("co")
var pg = require("co-pg")(require("pg"))

const connectionString = "postgres://ryan:1234@localhost:5432/postgres"

pg.defaults.poolSize = 100

co(function* () {
    try {
        console.time("query")
        yield query(`delete from test`)
        yield query(`insert into test values ('hey')`, 500)
        console.timeEnd("query")        
    } catch (e) {
        console.error(e)
    }
})

function* query(queryString, repeats) {
        try {
        let connectResults = yield pg.connectPromise(connectionString);
        let client = connectResults[0];
        let done = connectResults[1];
        let result

        if (repeats) {
            var queries = new Array()
            for (var i = 0; i < repeats; i++) {
                queries.push(client.queryPromise(queryString))
            }
            result = yield queries
        } else {
            result = yield client.queryPromise(queryString)
        }
        //call `done()` to release the client back to the pool
        done();

        return result
    } catch (ex) {
        console.error(ex.toString());
    }
}

function parsePromise(value) {
    return new Promise(function (resolve, reject) {
        parser.parseString(value, function (err, result) {
            if (err !== null) {
                reject(err)    
            } else {
                resolve(result)
            }
        })
    })
}

var app = koa()

const apiUrl = "http://modwebsrv.modaps.eosdis.nasa.gov/axis2/services/MODAPSservices"

app.use(cors())

app.use(function* () {
    var url = apiUrl + this.request.url
    console.log(url)
    try {
        var response = yield request({
            "url": url
        })
    } catch (err) {
        console.error(err)
    }
    
    this.body = yield parsePromise(response.body)
})

app.listen(8080)
console.log("End")