"use strict";
const debug = require('debug')("restfulmodel:lib:currency");

class Currency {
    constructor(main) {
        this.db = main.db;
    }

    insert(currency) {
        //debug('insert called: '+JSON.stringify(data));
        let self = this;
        let q = currency.Simbolo + " " + currency.Descrip;

        return new Promise(( resolve, reject)=>{
            console.log(self);
            self.db.currency.insert({simbolo: currency.Simbolo, descrip: currency.Descrip, q: q}, (err, doc)=>{
                err? reject(err): resolve(doc);
            });
        });
    }

    search(simbolo, descrip) {
        let buscar = {};
        if(simbolo){
            buscar.simbolo = new RegExp(simbolo);
        }
        if(descrip){
            buscar.descrip = new RegExp(descrip);
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

        let q = currency.Simbolo + " " + currency.Descrip;

        return new Promise(( resolve, reject)=>{
            console.log(self);
            self.db.currency.update({_id:ObjectId(currency._Id)}, {simbolo: currency.Simbolo, descrip: currency.Descrip, q: q}, (err, doc)=>{
                err? reject(err): resolve(doc);
            });
        });
    }
}

module.exports = Currency;