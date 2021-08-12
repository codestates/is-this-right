const { user } = require('../../models');
const Sequelize = require('sequelize');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const bcrypt = require('bcrypt');
require('dotenv').config();
module.exports = async (req, res) => {
  // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
  let { username, email, password, provider } = req.body;
  const profileImg = req.file.location;
  if (!username || !email) {
    return res.status(422).json({ message: 'insufficient parameters supplied' });
  }
  //소셜로그인용 비밀번호 설정
  if (!password) password = process.env.SOCIAL_PASSWORD;
  let salt, hash;
  try {
    salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    hash = await bcrypt.hash(password, salt);
  } catch (err) {
    console.log(err);
    return res.json({ message: 'bcrypt create hash err' });
  }
  password = hash;
  let [userinfo, created] = await user
    .findOrCreate({
      where: {
        [Sequelize.Op.or]: [{ email, provider }, { username }],
      },
      defaults: {
        email,
        password,
        username,
        profileImg: profileImg || 'https://is-this-right-sources.s3.ap-northeast-2.amazonaws.com/default_profile.png',
        provider,
      },
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'database err' });
    });
  if (!created) {
    return res.status(409).json({ message: 'this email or username has already been registered' });
  }
  delete userinfo.dataValues.password;
  userinfo.dataValues.role = 'user';
  let token = generateAccessToken(userinfo.dataValues);
  sendAccessToken(res, token);
};
