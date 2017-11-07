"use strict";

const express = require("express");
const router = express.Router();
const Service = require( "../services/main" );

/* request processor */

router.use(( req, res, next ) => {
    next();
});

// when using GET just show a useless message

router.get( "/", ( req, res ) => {
    res.json({ message: "Lambda service operational"});
});

// when POSTing data, process it using the AssemblyService

router.post( "/", ( req, res ) => {
    const result = Service.process( req.body );

    if ( result instanceof Error ) {
        // request Error
        onError( res, result );
    }
    else if ( typeof result === "object" ) {
        // request success
        onSuccess( res, result );
    }
    else {
        // unknown Error
        onError( res, result );
    }
});

module.exports = router;

/* internal functions */

function onError( res, error ) {
    const message = ( error && error.message ) ? error.message : "unknown";
    res.status( 500 );
    res.json({
        "error": `"${message}"-Error occurred`
    });
}

function onSuccess( res, data ) {
    res.status( 200 );
    res.json({
        "result": data
    });
}
