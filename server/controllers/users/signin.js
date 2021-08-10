const { user, adviser } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const bcrypt = require('bcrypt');
module.exports = async (req, res) => {
  let { email, password, provider } = req.body;
  if (!provider) provider = 'origin';

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
    res.status(404).json({ message: 'invalid user' });
  }
};
