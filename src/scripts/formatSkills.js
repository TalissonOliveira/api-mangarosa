function formatSkills(skills) {
    skills = skills.replace(/(\[)/g, '{')
    skills = skills.replace(/(\])/g, '}')

    return skills
}

module.exports = formatSkills