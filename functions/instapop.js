const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    
    let data = await fetch('https://www.instagram.com/trippy/?__a=1');
    console.log({event});
    console.log({data});
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}