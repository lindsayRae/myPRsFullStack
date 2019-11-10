const bcrypt = require('bcrypt');

async function test(){

    let cypherText = await bcrypt.hash("password", "");
    return cypherText;
}

console.log(test())