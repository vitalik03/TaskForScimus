const UserService = require('./indexService');

const getOneUser = async (req, res) => {
    const id = req.params.id;
    const findOne = await new UserService().getOneUser(id);
    if(!findOne){
        return res.status(400).send({ error: 'user with this id doesn`t exist'});    
    }
    return res.status(200).json(findOne);
}

module.exports = {
    getOneUser
}