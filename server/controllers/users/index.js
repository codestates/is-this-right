const { user } = require('../../models');
const { isAuthorized, generateAccessToken, sendAccessToken } = require('../tokenFunctions');
require('dotenv').config();
module.exports = {
  get: async (req, res) => {
    if (req.query.email || req.query.username) {
      //파라미터가 있을때(회원가입 중복체크 용도)
      let findKey, findname;
      if (req.query.email) {
        findkey = 'email';
        findname = req.query.email;
      }
      if (req.query.username) {
        findkey = 'username';
        findname = req.query.username;
      }
      let userdata = await user.findOne({ where: { [findkey]: findname } }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'database err' });
      });

      if (!userdata) {
        return res.status(200).json({ message: 'ok' });
      }
      res.status(409).json({ message: 'this parameter is already use' });
    } else {
      //파라미터가 없을때 (유저정보 보내주기)
      let userInfo = isAuthorized(req);
      if (userInfo) {
        res.json({ data: userInfo, message: 'ok' });
      } else {
        res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
        res.status(401).json({ message: 'token has expired try again login' });
      }
    }
  },

  put: async (req, res) => {
    let userInfo = isAuthorized(req);
    if (userInfo) {
      let { username, password, profileImg } = req.body;
      let payload = {};
      if (username) payload.username = username;
      if (profileImg) payload.profileImg = profileImg;
      if (password) {
        let salt, hash;
        try {
          salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
          hash = await bcrypt.hash(password, salt);
        } catch (err) {
          console.log(err);
          return res.json({ message: 'bcrypt create hash err' });
        }
        payload.password = hash;
      }
      let id = userInfo.id;

      let updateUserInfo = await user.update(
        { ...payload },
        {
          where: {
            id,
          },
        },
      );
      delete userInfo.iat, userInfo.password;
      userInfo = { ...userInfo, ...payload };
      let token = generateAccessToken(userInfo);
      sendAccessToken(res, token);
    } else {
      res.status(401).json({ message: 'Unauthorized request' });
    }
  },
};
