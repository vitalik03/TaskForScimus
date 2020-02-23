const User = require('../../models/user');
const bcrypt = require('bcrypt');

class UserService {

    getAllUsers() {
        return new Promise(async (resolve, reject) => {
            await User.findAll()
              .then((users) => resolve(users))
              .catch((err) => console.log('Error' + err))
        }
    )}

    createUser(userData) {
        return new Promise(async (resolve, reject) => {
            userData.password = bcrypt.hashSync(userData.password, 10);
            await User.create(userData)
                .then((res) => resolve(res))
                .catch((err) => console.log('Error ' + err))
        });
    }

    getOneUser(id) {
        return new Promise(async (resolve, reject) => {
            await User.findOne({ where: { id } })
                .then((res) => resolve(res))
                .catch((err) => console.log('Error ' + err))
        })
    }

    getOneUserByEmail(email) {
        return new Promise(async (resolve, reject) => {
            await User.findOne({ where: { email } })
                .then((res) => resolve(res))
                .catch((err) => console.log('Error ' + err))
        })
    }
}

module.exports = UserService;