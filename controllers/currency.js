/* eslint-disable semi */
"use strict";

const debug = require('debug')("restful:controllers:currency");

function Currency(main) {
    debug("init...");

    return {
        'buscar': (req, res, next)=> {
            let  find = req.swagger.params.find ? req.swagger.params.find.value : null;

            res.json({
                'name': name,
                'version': '1.0'
            })
        }
    };
}

module.exports = Currency;