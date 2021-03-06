/* eslint-disable semi */
"use strict";

const debug = require('debug')("restful:controllers:currency");


function Currency(main) {
    debug("init...");

    return {
        'search': (req, res, next)=> {
            debug(".currency.search called");

            let q = req.swagger.params.q ? req.swagger.params.q.value : null;
            main.libs.currency.search(q)
                .then(busquedas => {
                    res.json(busquedas);
                })
                .catch(err => {
                    debug(".currency.search.error: " + err);
                    next(err);
                });
        },
        'insert': (req , res , next)=> {
          debug(".account.insert called");
            let currency = req.swagger.params.currency ? req.swagger.params.currency.value : null;

            main.libs.currency.insert(currency)
                .then(busqueda =>{
                    res.json(busqueda);
                })
                .catch(err => {
                    next(err);
                })
        },
        'remove': (req, res, next)=> {
            debug(".currency.remove called");

            let IdRemove = req.swagger.params.id ? req.swagger.params.id.value : null;
            if(IdRemove != null){
                main.libs.currency.remove(IdRemove)
                    .then(busquedas => {
                        res.json(busquedas);
                    })
                    .catch(err => {
                        debug(".currency.remove.error: " + err);
                        next(err);
                    });
            }else{
                next(new Error("debe ingresar un id"));
            }
        },
        'update':(req,res,next)=>{
            let currency = req.swagger.params.currency ? req.swagger.params.currency.value : null;

            main.libs.currency.update(currency)
                .then(busqueda =>{
                    res.json(busqueda);
                })
                .catch(err => {
                    next(err);
                })
        },
        'getExchange':(req,res,next)=>{
                main.libs.currency.getExchangeRate()
                    .then(busqueda =>{
                        res.json(busqueda);
                    })
                    .catch(err => {
                        next(err);
                    })
        }
    };
}

module.exports = Currency;