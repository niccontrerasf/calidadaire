var express = require('express');
var router = express.Router();

/*

    A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).

*/

router.route('*')
        .all(function(req,res,next){
        //res.end('nothin');
        console.log('* all');
        next();
    });

router.route('/')
        .get(function(req,res){
        res.end('/api/');
    });

router.route('/:city')
        .all(function(req,res,next){
            //normalizar input
            console.log(':city get all');
            
            //post; curl -d "1=1&2=2" localhost
            console.log(req.body);
    
            //post/get url params
            //curl localhost/:param
            console.log(req.params);
    
            //post/get url query
            //curl localhost?r=r
            console.log(req.query);
            next();
    })
        .get(function(req,res){
        //get api json
    res.end(':city get');
    });


module.exports = router;