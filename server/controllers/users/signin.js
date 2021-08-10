const { user, adviser } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  let { email, password } = req.body;

  let userInfo = await user
    .findOne({
      where: {
        email,
        password,
      },
      include: [{ model: adviser, required: false }],
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'database err' });
    });

  if (userInfo) {
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
    res.status(404).json({ message: { message: 'invalid user' } });
  }
};
