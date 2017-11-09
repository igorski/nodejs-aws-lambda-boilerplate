/**
 * AWS Lambda entry point
 */
"use strict";

const Service = require("./services/main");

exports.handler = async( event, context, callback ) => {

    const result = {};
    let success  = false;

    // get the request payload (should be application/json)

    let payload;

    try {
        payload = ( typeof event.body === "string" ) ? JSON.parse( event.body ) : event.body;
    }
    catch ( e ) {
        result.error = "Could not parse request body.";
    }

    // process the request

    try {
        // application magic goes here
        const output = await Service.process( payload );
        if ( typeof output === "object" ) {
            // conversion success
            success = true;
            result.result = output;
        }
        else {
            // conversion Error
            result.error = ( output instanceof Error ) ?
                output.message : "Unknown Error occurred during request. Please check input data format";
        }
    }
    catch ( e ) {
        result.error = `Error ${e.message} occurred during request`;
    }


    // return the result

    callback( null, {
        statusCode: ( success ) ? 200 : 500,
        body: JSON.stringify( result )
    });
};
