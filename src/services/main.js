"use strict";

module.exports = {

    /**
     * process the incoming request
     * return payload Object on success
     * or Error Object on failure
     *
     * @public
     * @param {Object} request
     * @return {Object|Error}
     */
    process( request ) {

        // update implementation as your API requires

        if ( typeof request === "object" && Object.keys( request ).length > 0 ) {

            return {
                "data": "this API is working."
            };
        }
        else {
            return new Error(
                "Congratulations, you broke the internet (actually, expected a " +
                "JSON Object in your request"
            );
        }
    }
};
