const { user, adviser } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const bcrypt = require('bcrypt');
require('dotenv').config();
module.exports = async (req, res) => {
  console.log(req.body);
  let { email, password, provider } = req.body;

  let userInfo = await user
    .findOne({
      where: {
        email,
        provider,
      },
      include: [{ model: adviser, required: false }],
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'database err' });
    });

  if (userInfo) {
    //소셜로그인용 비밀번호설정
    if (!password) password = process.env.SOCIAL_PASSWORD;
    let check = await bcrypt.compare(password, userInfo.dataValues.password);
    if (!check) {
      return res.status(404).json({ message: 'password err' });
    }

    // adviser일때
    if (userInfo.adviser) {
      let adviserInfo = userInfo.dataValues.adviser;
      delete userInfo.dataValues.adviser;
      userInfo = { ...userInfo.dataValues, ...adviserInfo.dataValues };
      userInfo.role = 'adviser';
    } else {
      // user일때
      userInfo = userInfo.dataValues;
      userInfo.role = 'user';
      delete userInfo.adviser;
    }
    delete userInfo.password;
    const accessToken = generateAccessToken(userInfo);
    sendAccessToken(res, accessToken);
  } else {
    if (provider !== 'origin') {
      return res.status(200).json({ message: 'signup plz' });
    }
    res.status(404).json({ message: 'invalid user' });
  }
};
