let getLifts = function(user_id){

    const fs = require('fs');
    const userDefinedDataBuffer = fs.readFileSync('./models/docs/pr.json', 'utf8')
    const userDefinedDataJSON = userDefinedDataBuffer.toString(userDefinedDataBuffer)
    const usersData = JSON.parse(userDefinedDataJSON)
    
    // ? the find method allows us to find a single instance in an array
    let userData = usersData.find((userData)=> {
        return userData.users_id === user_id
    })
    
    let userLifts = userData.lifts
    // ? the filter method allows us to find all objects that match a criteria 
    let userDefinedLifts = userLifts.filter((userLift) =>{
        return userLift.liftType === 'userDefined'
    })
   
    // ? The map method retrieves properties we're looking for
    let userDefinedLiftNames = userDefinedLifts.map((lift) => {
        return lift.liftName
    })
    
    const defaultLiftsDataBuffer = fs.readFileSync('./models/docs/lifts.json', 'utf8')
    const defaultLiftsJSON = defaultLiftsDataBuffer.toString(defaultLiftsDataBuffer)
    const defaultLifts = JSON.parse(defaultLiftsJSON)
    
    let defaultLiftsNames = defaultLifts.map((defaultLifts) => {
        return defaultLifts.liftName
    })
    
    let liftsMenu = defaultLiftsNames.concat(userDefinedLiftNames)

    return liftsMenu
}




module.exports = getLifts;