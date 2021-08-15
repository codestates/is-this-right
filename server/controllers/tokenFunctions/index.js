require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const axios = require('axios');
axios.defaults.withCredentials = true;

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET);
  },

  isAuthorized: (req) => {
    let tokenCookie = req.cookies.jwt;
    if (!tokenCookie) return null;
    try {
      return verify(tokenCookie, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie('jwt', accessToken, {
      httpOnly: true,
    });
    res.json({
      message: 'ok',
    });
  },

  getKakaoToken: async (req) => {
    //카카오가 원하는 파라미터 가공
    console.log(req.body);
    let parameters = {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID, //***********************
      redirect_uri: process.env.KAKAO_REDIRECT_URI, //여기  환경변수로 만들어줘야함
      code: req.body.authorizationCode,
    };
    let body = `grant_type=authorization_code&client_id=${parameters.client_id}&redirect_uri=${parameters.redirect_uri}&code=${parameters.code}`;
    console.log(body);
    // 카카오에게 토큰 요청
    let kakaoToken = await axios
      .post('https://kauth.kakao.com/oauth/token', body, {
        headers: { 'Content-type': `application/x-www-form-urlencoded;charset=utf-8` },
      })
      .catch((err) => console.log('카카오 접근토큰이상'));
    return kakaoToken;
  },
};
