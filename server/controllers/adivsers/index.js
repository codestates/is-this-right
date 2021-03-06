const { user, adviser, feedback, post, sequelize } = require('../../models');

const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const { generateAccessToken, isAuthorized, sendAccessToken } = require('../tokenFunctions');
const bcrypt = require('bcrypt');
const { getUsers } = require('../../users');

require('dotenv').config();

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
    let online = getUsers();

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < online.length; j++) {
        if (list[i].isonline) {
          continue;
        } else if (list[i].userId === online[j].userId) {
          list[i].isonline = true;
        } else list[i].isonline = false;
      }
    }

    res.status(200).json(list);
    // 이후 for문 돌려서 리스트 보내줄때 isonline 붙이기
  },
  post: async (req, res) => {
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
    adviserInfo.dataValues.adviserId = adviserInfo.dataValues.id;
    adviserInfo = { ...adviserInfo.dataValues, ...userinfo.dataValues };
    adviserInfo.role = 'adviser';

    let token = generateAccessToken(adviserInfo);
    res.cookie('jwt', token, { httpOnly: true });
    return res.status(201).json({ message: 'ok' });
  },
  put: async (req, res) => {
    console.log(req.body);
    let userInfo = isAuthorized(req);
    if (userInfo) {
      let profileImg;
      if (req.file) profileImg = req.file.location;
      let { username, password, name, category, detail, url, gender, state } = req.body;
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
      if (category) adviserpayload.category = category;
      if (detail) adviserpayload.detail = detail;
      if (url) adviserpayload.url = url;
      if (gender) adviserpayload.gender = gender;
      if (state) adviserpayload.state = state;
      let userId = userInfo.userId;
      let adviserId = userInfo.adviserId;
      let updateUserInfo = await user.update(
        { ...userpayload },
        // { username: '테스트' },
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
    // let adviserDetail = await adviser
    //   .findOne({
    //     where: {
    //       id: req.params.id,
    //     },
    //     include: [
    //       { model: user, required: false, attributes: ['profileImg'] },
    //       {
    //         model: feedback,
    //         required: false,
    //         attributes: ['id', 'content', 'createdAt', 'postId'],
    //         include: { model: post, attributes: ['title', 'selected'] },
    //       },
    //     ],
    //     attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return res.status(500).json({ message: 'database err' });
    //   });

    // adviserDetail.dataValues.profileImg = adviserDetail.dataValues.user.profileImg;
    // delete adviserDetail.dataValues.user;
    const adviserId = req.params.id;

    const adviserDetail = await sequelize.query(
      `SELECT advisers.*, users.profileImg, users.email
      FROM advisers
      JOIN users ON users.id = advisers.userId
      WHERE advisers.id = ${adviserId}
  `,
      { type: QueryTypes.SELECT },
    );
    const feedbackInfo = await sequelize
      .query(
        `SELECT feedbacks.postId, feedbacks.content, feedbacks.createdAt, posts.title, posts.category, IFNULL(posts.selected, 0) as selected, users.username, users.profileImg
    FROM advisers
    JOIN feedbacks ON advisers.id = feedbacks.adviserId
    JOIN posts ON posts.id = feedbacks.postId
    JOIN users ON posts.userId = users.id
    WHERE advisers.id=${adviserId}
    ORDER BY feedbacks.createdAt DESC
    `,
        { type: QueryTypes.SELECT },
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'database err' });
      });

    res.status(200).json({ data: { ...adviserDetail[0], feedbacks: feedbackInfo }, message: 'ok' });
  },
};
