/* eslint-disable semi */
"use strict";

const debug = require('debug')("restful:controllers:currency");

function Currency(main) {
    debug("init...");

    return {
        'search': (req, res, next)=> {
            debug(".currency.search called");

            let simbolo = req.swagger.params.simbolo ? req.swagger.params.simbolo.value : null;
            let descrip = req.swagger.params.descrip ? req.swagger.params.descrip.value : null;
            let limit = req.swagger.params.limit ? req.swagger.params.limit.value : 100;
            main.libs.currency.search(simbolo, descrip, limit)
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
            let simbolo = req.swagger.params.simbolo ? req.swagger.params.simbolo.value : null;
            let descrip = req.swagger.params.descrip ? req.swagger.params.descrip.value : null;
            main.libs.currency.insert(simbolo,descrip)
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
        }
    };
}

module.exports = Currency;