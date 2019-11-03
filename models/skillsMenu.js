let getSkills = function(user_id){
    console.log("in Menu data")

    const fs = require('fs');
    const userDefinedDataBuffer = fs.readFileSync('./models/docs/pr.json', 'utf8')
    const userDefinedDataJSON = userDefinedDataBuffer.toString(userDefinedDataBuffer)
    const usersData = JSON.parse(userDefinedDataJSON)
    
    // ? the find method allows us to find a single instance in an array
    let userData = usersData.find((userData)=> {
        return userData.users_id === user_id
    })
    
    let userSkills = userData.skills
    // ? the filter method allows us to find all objects that match a criteria 
    let userDefinedSkills = userSkills.filter((userSkill) =>{
        return userSkill.skillType === 'userDefined'
    })
    
    // ? The map method retrieves properties we're looking for
    let userDefinedSkillNames = userDefinedSkills.map((skill) => {
        return skill.skillName
    })
    
    const defaultSkillsDataBuffer = fs.readFileSync('./models/docs/skills.json', 'utf8')
    const defaultSkillsJSON = defaultSkillsDataBuffer.toString(defaultSkillsDataBuffer)
    const defaultSkills = JSON.parse(defaultSkillsJSON)
    
    let defaultSkillsNames = defaultSkills.map((defaultSkills) => {
        return defaultSkills.skillName
    })
    
    let skillsMenu = defaultSkillsNames.concat(userDefinedSkillNames)

    return skillsMenu
}


module.exports = getSkills;