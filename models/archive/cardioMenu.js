let getCardio = function(user_id){    

    const fs = require('fs');
    const userDefinedDataBuffer = fs.readFileSync('./models/docs/pr.json', 'utf8')
    const userDefinedDataJSON = userDefinedDataBuffer.toString(userDefinedDataBuffer)
    const usersData = JSON.parse(userDefinedDataJSON)
    
    // ? the find method allows us to find a single instance in an array
    let userData = usersData.find((userData)=> {
        return userData.users_id === user_id
    })
    
    let userCardio = userData.cardio
    // ? the filter method allows us to find all objects that match a criteria 
    let userDefinedCardio = userCardio.filter((userCardio) =>{
        return userCardio.cardioType === 'userDefined'
    })
   
    // ? The map method retrieves properties we're looking for
    let userDefinedCardioNames = userDefinedCardio.map((cardio) => {
        return cardio.cardioName
    })
    
    const defaultCardioDataBuffer = fs.readFileSync('./models/docs/cardio.json', 'utf8')
    const defaultCardioJSON = defaultCardioDataBuffer.toString(defaultCardioDataBuffer)
    const defaultCardio = JSON.parse(defaultCardioJSON)
    
    let defaultCardioNames = defaultCardio.map((defaultCardio) => {
        return defaultCardio.cardioName
    })
    
    let cardioMenu = defaultCardioNames.concat(userDefinedCardioNames)

    return cardioMenu
}

// let getCardioEntry = () => {



// }

module.exports = getCardio;
//exports.getCardio = getCardio;