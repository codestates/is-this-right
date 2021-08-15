const { user, adviser, feedback, post } = require('../../models');
const Sequelize = require('sequelize');
const { generateAccessToken } = require('../tokenFunctions');
const bcrypt = require('bcrypt');

require('dotenv').config();
// const {onlinelist} = require('../../users')
module.exports = {
  get: async (req, res) => {
    let list = await adviser
      .findAll({
        include: [
          {
            model: user,
            attributes: ['email', 'username', 'profileImg'],
            required: false,
          },
        ],
        raw: true,
        nest: true,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'database err' });
      });
    res.json(list);
    // 이후 for문 돌려서 리스트 보내줄때 isonline 붙이기
  },
  post: async (req, res) => {
    console.log(req.body);
    let { username, email, password, name, category, detail, url, gender, state, provider } = req.body;

    if (!username || !email || !name || !category || !detail || !url || !gender || !state) {
      return res.status(422).json({ message: 'insufficient parameters supplied' });
    }
    let profileImg;
    if (req.file) profileImg = req.file.location;
    else profileImg = 'https://is-this-right-sources.s3.ap-northeast-2.amazonaws.com/default_profile.png';
    // 받은 정보로 중복된 유저 정보가 있는지 확인, 없다면 유저데이터베이스에 정보삽입

    let salt, hash;
    try {
      salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
      hash = await bcrypt.hash(password, salt);
    } catch (err) {
      console.log(err);
      return res.json({ message: 'bcrypt create hash err ' });
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
          profileImg,
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
    // 이후 어드바이저 데이터베이스 정보 삽입. 이후 유저 정보랑 합쳐서 클라에게 데이터 전송.
    let adviserInfo = await adviser
      .create({
        userId: userinfo.dataValues.id,
        name,
        category,
        url,
        gender,
        state,
        detail,
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'database err' });
      });
    delete userinfo.dataValues.password;
    adviserInfo = { ...adviserInfo.dataValues, ...userinfo.dataValues };
    adviserInfo.role = 'adviser';

    // --------------여기서 프로필 이미지 multer작업해야함 (상현)
    let token = generateAccessToken(adviserInfo);
    res.cookie('jwt', token, { httpOnly: true });
    return res.status(201).json({ message: 'ok' });
  },
  put: async (req, res) => {
    let userInfo = isAuthorized(req);
    if (userInfo) {
      let { username, password, profileImg, name, category, detail, url, gender, state } = req.body;
      let userpayload = {};
      let adviserpayload = {};
      if (username) userpayload.username = username;
      if (password) {
        let salt, hash;
        try {
          salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
          hash = await bcrypt.hash(password, salt);
        } catch (err) {
          console.log(err);
          return res.json({ message: 'bcrypt create hash err ' });
        }
        userpayload.password = hash;
      }
      if (profileImg) userpayload.profileImg = profileImg;
      if (name) adviserpayload.name = name;
      if (category) adviserpayload.detail = detail;
      if (url) adviserpayload.url = url;
      if (gender) adviserpayload.gender = gender;
      if (state) adviserpayload.state = state;
      let userId = userInfo.userId;
      let adviserId = userInfo.adviserId;
      let updateUserInfo = await user.update(
        { ...userpayload },
        {
          where: {
            id: userId,
          },
        },
      );

      let updateAdviserInfo = await adviser.update(
        { ...adviserpayload },
        {
          where: {
            id: adviserId,
          },
        },
      );
      delete userInfo.iat, userInfo.password;
      userInfo = { ...userInfo, ...userpayload, ...adviserpayload };
      let token = generateAccessToken(userInfo);
      sendAccessToken(res, token);
    } else {
      res.status(401).json({ message: 'Unauthorized request' });
    }
  },
  getDetail: async (req, res) => {
    let adviserDetail = await adviser
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: user, required: false, attributes: ['profileImg'] },
          {
            model: feedback,
            required: false,
            attributes: ['id', 'content', 'createdAt', 'postId'],
            include: { model: post, attributes: ['title', 'selected'] },
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'database err' });
      });
    adviserDetail.dataValues.profileImg = adviserDetail.dataValues.user.profileImg;
    delete adviserDetail.dataValues.user;
    res.status(200).json(adviserDetail);
  },
};
