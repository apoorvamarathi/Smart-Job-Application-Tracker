const atScore = (resumeSkills,jobSkills)=>{
    let match = resumeSkills.filter(skill => 
        jobSkills.include(skill))

        const score = (match.length / jobSkills.length)*100

        return {
            score:Math.round(score),
            missing:jobSkills.filter(skill=>!resumeSkills.includes(skill))
        }
}

module.exports = atScore
