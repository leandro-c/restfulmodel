"use strict"
const debug = require('debug')("restfulmodel:lib:currency");

class Currency {
    constructor(main) {
        this.db = main.db;
    }

    insert(data) {
        debug('insert called: '+JSON.stringify(data));
        let self = this;

        return new Promise(( resolve, reject)=>{
            console.log(self);
            self.db.currency.insert(data, (err, doc)=>{
                err? reject(err): resolve(doc);
            });
        });
    }

    search(CodiMon) {
        let self = this;
        return new Promise(( resolve, reject ) => {
            self.db.currency.find({ Codi: CodiMon }, (err, docs) => {
                err? reject(err) : resolve(docs)
            });
        });
    }
}

module.exports = Currency;