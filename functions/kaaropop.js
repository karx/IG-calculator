const fetch = require('node-fetch');

kaaropop = async function() {
    
    let data = await fetch('https://www.instagram.com/trippy/?__a=1');
    
    let bodyData = await data.json();

    console.log({bodyData});
    return {
        statusCode: 200,
        body: JSON.stringify(bodyData)
    }
}


kaaropop();