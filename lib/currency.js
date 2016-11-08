"use strict";
const debug = require('debug')("restfulmodel:lib:currency");

class Currency {
    constructor(main) {
        this.db = main.db;
    }

    insert(simbolo,descrip) {
        //debug('insert called: '+JSON.stringify(data));
        let self = this;

        return new Promise(( resolve, reject)=>{
            console.log(self);
            self.db.currency.insert({simbolo:simbolo,descrip:descrip}, (err, doc)=>{
                err? reject(err): resolve(doc);
            });
        });
    }

    search(find, limit) {
        let self = this;
        return new Promise(( resolve, reject ) => {
            self.db.currency.find({ Descrip: find }, (err, docs) => {
                err? reject(err) : resolve(docs)
            }).limit(limit);
        });
    }
}

module.exports = Currency;