const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const UserService = require('../routes/users/indexService');
const bcrypt = require('bcrypt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretKey';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    let user = new UserService().getOneUser(jwt_payload.id);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
passport.use(strategy);


const gentoken = (payload) => {
    let token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '9000s' });
    return token;
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      let user = await new UserService().getOneUserByEmail(email);
      if (!user) {
        res.status(404).send({ error: 'No such user found' });
      }
      const comparedPasswords = await bcrypt.compareSync(password, user.password);
      if (comparedPasswords) {
          const token = gentoken({id: user.id});
          res.json({ token: token , id: user.id});
      } else {
          res.status(401).send({ error: 'Password is incorrect' });
      }
    }
};

const signup = async (req, res) => {
    const data = req.body;
    if (data.password < 8){
      res.status(401).send({ error: 'Password length should be more than 8'})
    } else if(data.username < 6) {
      res.status(401).send({ error: 'Username length should be more than 6'})
    } else if(data.bio < 30){
      res.status(401).send({ error: 'Username length should have more than 30 symbols'})
    }
    const testUser = await new UserService().getOneUserByEmail(data.email)
    if(testUser){
        res.status(422).send({ error: 'User has already been created on this email'});
    } else {
        let user = await new UserService().createUser(data);
        const token = gentoken({id: user.id});
        res.status(201).json({ token: token, id: user.id});
    }
}

module.exports = {
    login,
    signup
};