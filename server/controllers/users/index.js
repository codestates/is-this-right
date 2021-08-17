const { user } = require('../../models');
const { isAuthorized, generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const aws = require('aws-sdk');
const s3Config = require(__dirname + '/../../config/s3');
const s3 = new aws.S3(s3Config);
require('dotenv').config();
module.exports = {
  get: async (req, res) => {
    console.log(req.query);
    if (req.query.email || req.query.username) {
      //파라미터가 있을때(회원가입 중복체크 용도)
      console.log(req.query);
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
    console.log(userInfo);
    if (userInfo) {
      let { username, password } = req.body;
      let payload = {};
      if (username) payload.username = username;
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
      //업로드 받은 이미지파일의 경로 req.file.location
      if (req.file) {
        payload.profileImg = req.file.location;

        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: userInfo.profileImg.slice(userInfo.profileImg.indexOf('uploads')),
        };
        s3.deleteObject(params, function (err, data) {
          if (err) console.log(err, err.stack);
          // an error occurred
          else console.log(params.Key, 'deleted!'); // successful response
        });
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
