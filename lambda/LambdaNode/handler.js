'use strict';
const DynamoHelper = require('./dynamo_helper');
const dynamo = new DynamoHelper;

/**
 * Headers to send back to client
 */
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

module.exports.users = async (event, context) => {
    /* Handle GET requests */
    if (event.httpMethod === 'GET') {
        console.log('Get requested');
        try {
            const data = await dynamo.loadData('Users');
            console.log('Data read correctly');

            const body = JSON.stringify({
               Items: data.Items
            });

            return sendResponse(200, body, headers);
        } catch (e) {
            console.error('Error retrieving users', e);
            return sendResponse(501, 'Internal error', headers);
        }

    }

    /* Handle POST requests */
    if (event.httpMethod === 'POST') {
        console.log('Post requested');
        try {
            const body = JSON.parse(event.body);                // Body enviado en el request
            const userParams = body.userParameters; // Parámetros a guardar en la DB
            // Item a guardar
            const item = {
                UserId: userParams.cc,
                firstName: userParams.firstName,
                lastName: userParams.lastName,
                email: userParams.email
            };

            await dynamo.saveData('Users', item);
            console.log('User saved correctly');
            return sendResponse(200, 'User saved correctly', headers);
        } catch (e) {
            console.error('Error saving user', e);
            return sendResponse(501, JSON.stringify({
                error: 'Internal server error'
            }), headers);
        }
    }

};

/**
 * Function to send response to client
 * @param statusCode {number}
 * @param body {*}
 * @param headers {*}
 * @returns {{statusCode: *, headers: string, body: *}}
 */
const sendResponse = (statusCode, body, headers = '') => {
    const response = {
        statusCode: statusCode,
        headers: headers,
        body: body
    };

    return response;
};
