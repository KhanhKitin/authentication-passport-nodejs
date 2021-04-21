const User = require('../../models').User;
const checkEmail = (email) => {
    return User.count({
        where: {
          email: email  
        }
    })
    
}

const getUserVerify2FA = (id) => User.findByPk(id);

const getUserByEmail = (email) => {
    return User.findAll({
        where: {
            email: email
        }
    })
}

const insertUser = async (data) => {
    const user = await User.create({
        email: data.email,
        password: data.password,
        is2FA: data.is2FA,
        name: data.name
    })
    return user;
}

const updateEnable2FA = async (id, secret) => {
    let user = await User.update({
      is2FA: true,
      secret_key: secret,
    }, {
      where: {
        id,
      },
    });
    return user;
  };
  

module.exports = {
    checkEmail,
    getUserByEmail,
    insertUser,
    getUserVerify2FA,
    updateEnable2FA,
}


