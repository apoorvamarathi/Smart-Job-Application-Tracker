const skills =[
    "javascript","react","node","mongodb","html","css","python","java"
]

const extractSkills = (text)=>{
    const  found = []

    skills.forEach(skill => {
        if(text.toLowerCase().includes(skills)){
            found.push(skill)
        }
    })
    return found
}
module.exports = extractSkills
