const { user } = require('../../models');
const Sequelize = require('sequelize');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
  let { username, email, password, profileImg } = req.body;

  if (!username || !email || !password) {
    res.status(422).json({ message: 'insufficient parameters supplied' });
  }

  let [userinfo, created] = await user
    .findOrCreate({
      where: {
        [Sequelize.Op.or]: [{ email }, { username }],
      },
      defaults: {
        email,
        password,
        username,
        profileImg: profileImg || 'https://is-this-right-sources.s3.ap-northeast-2.amazonaws.com/default_profile.png',
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
  // --------------여기서 프로필 이미지 multer작업해야함 (상현)
  let token = generateAccessToken(userinfo.dataValues);
  sendAccessToken(res, token);
};
