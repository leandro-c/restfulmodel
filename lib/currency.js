"use strict";
const debug = require('debug')("restfulmodel:lib:currency");

class Currency {
    constructor(main) {
        this.db = main.db;
        this.http = main.libs.http;
    }

    insert(currency) {
        //debug('insert called: '+JSON.stringify(data));
        let self = this;
        let q = currency.Currency + " " + currency.Description;

        return new Promise(( resolve, reject)=>{
            console.log(self);
            self.db.currency.insert({Currency: currency.Currency, Description: currency.Description, Exchange: currency.Exchange, q: q}, (err, doc)=>{
                err? reject(err): resolve(doc);
            });
        });
    }

    search(q) {
        let buscar = {};
        if(q){
            buscar.q = new RegExp(q, "i");
        }

        let self = this;
        let Limit = 50;

        return new Promise(( resolve, reject ) => {
            self.db.currency.find(buscar).limit(Limit, (err, docs) => {
                err? reject(err) : resolve(docs)
            });
        });
    }

    remove(IdRemove){
        let self = this;
        let ObjectId = require("mongojs").ObjectId;
        return new Promise(( resolve, reject ) => {
            self.db.currency.remove({ "_id" : ObjectId(IdRemove) }, (err, docs) => {
                err? reject(err) : resolve(docs)
            });
        });
    }
    update(currency) {
        let self = this;
        let ObjectId = require("mongojs").ObjectId;

        let q = currency.Currency + " " + currency.Description;

        return new Promise(( resolve, reject)=>{
            console.log(self);
            self.db.currency.update({_id:ObjectId(currency._Id)}, {Currency: currency.Currency, Description: currency.Description, Exchange: currency.Exchange, q: q}, (err, doc)=>{
                err? reject(err): resolve(doc);
            });
        });
    }
    getExchangeRate(currency){
        let self = this;

        let options = {
            hostname: 'apilayer.net',
            port: 80,
            path: '/api/live?access_key=ee653d784eaef5d6ce82eb4eaaffe20b&currencies=EUR,GBP,CAD,PLN&source=USD'+'&format=1',
            method: 'GET'
        };

       self.http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });
/*
         self.http.request({
            host: 'apilayer.net',
            path: '/api/live?access_key=ee653d784eaef5d6ce82eb4eaaffe20b&currencies=EUR,GBP,CAD,PLN&source=USD'+'&format=1'
        }, function(response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                callback({
                    //email: parsed.email,
                    //password: parsed.pass
                    source: parsed.source,
                });
            });
        });
*/
    }
}

module.exports = Currency;