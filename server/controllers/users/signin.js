const { user, adviser } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const bcrypt = require('bcrypt');
require('dotenv').config();
module.exports = async (req, res) => {
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
    let check = await bcrypt.compare(password, userInfo.dataValues.password);
    console.log(check);
    if (!check) {
      return res.status(404).json({ message: 'password err' });
    }

    // adviser일때
    if (userInfo.adviser) {
      let adviserInfo = userInfo.dataValues.adviser;
      delete userInfo.dataValues.adviser;
      userInfo = { ...adviserInfo.dataValues, ...userInfo.dataValues };
      userInfo.role = 'adviser';
      userInfo.adviserId = adviserInfo.dataValues.id;
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
