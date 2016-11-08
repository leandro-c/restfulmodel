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

    search(simbolo, descrip, limit) {
        let buscar = {}
        if(simbolo){
            buscar.simbolo = RegExp(simbolo);
        }
        if(descrip){
            buscar.descrip = RegExp(descrip);
        }

        let self = this;

        return new Promise(( resolve, reject ) => {
            self.db.currency.find(buscar, (err, docs) => {
                err? reject(err) : resolve(docs)
            }, {'limit': limit});
        });
    }

    remove(IdRemove){
        let self = this;
        let ObjectId = require('mongodb').ObjectID;

        return new Promise(( resolve, reject ) => {
            self.db.currency.remove({ "_id" : ObjectId(IdRemove) }, (err, docs) => {
                err? reject(err) : resolve(docs)
            });
        });
    }
}

module.exports = Currency;