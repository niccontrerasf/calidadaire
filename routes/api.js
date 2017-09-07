var express = require('express');
var router = express.Router();
var request = require('request');

/**
 *    Captura todos los request que pasan por /api/*
*/
router.route('*')
        .all(function(req,res,next){
        next();
    });

/**
 * Retorna mensaje de error
 * @name GET /api
 * @function
 * @return {html} 'Debe ingresar un nombre de ciudad'
 */
router.route('/')
        .get(function(req,res){
        res.end('Debe ingresar un nombre de ciudad');
    });

/**
 * Reliza GET a api aqicn y formatea la info devolviendo los datos en formato JSON
 * @name GET /api/:city
 * @function
 * @param {string} city - ciudad a consultar en api aqicn
 * @return {json} datos aqi de ciudad
 */
router.route('/:city')
        .all(function(req,res,next){
            next();
    })
        .get(function(req,res){
        //get api json
        //res.end(':city get');
            var city = normaString(req.params.city);
            
            if(!city)
                res.json({status:'error'});
            else
            {
                request.get('http://api.waqi.info/feed/'+city+'/?token=8954e06d154a2fb3f0c790f8b4458139485474e3','',function(err,respo,body){
                    bodyjson = JSON.parse(body);
                    if(!err && res.statusCode === 200){
                        if(bodyjson.status == 'error')
                            res.json(bodyjson);
                        else
                        {
                            //console.log(resa);

                            //json con datos utiles
                            var minijson = {
                                city:city,
                                name:bodyjson.data.city.name,
                                aqi:bodyjson.data.aqi,
                                lat:bodyjson.data.city.geo[0],
                                lon:bodyjson.data.city.geo[1],
                                time:bodyjson.data.time.s,
                                epoch:bodyjson.data.time.v,
                                status:'ok',
                                data:'aqi ok'
                            };
                            res.json(minijson);
                        }
                    }
                });
            }
    });


/**
 * Formatea string eliminando espacios y capitalizando la primera letra.
 * @param {string} str - string formatear
 * @return {string} string formateado
 */
function normaString(str){
    var str2 = str.trim().toLowerCase();
    str2 = str2.charAt(0).toUpperCase() + str2.slice(1);
    return str2;
}

module.exports = router;