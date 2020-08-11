const User = require('../../models').User;
checkEmail = (email) => {
    return User.count({
        where: {
          email: email  
        }
    })
    
}

getUserByEmail = (email) => {
    return User.findAll({
        where: {
            email: email
        }
    })
}

insertUser = async (data) => {
    const user = await User.create({
        email: data.email,
        password: data.password,
        name: data.name
    })
    return user;
}

module.exports = {
    checkEmail,
    getUserByEmail,
    insertUser
}


