const axios = require('axios');
axios.defaults.withCredentials = true;

const { getKakaoToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  let kakaoToken = await getKakaoToken(req);
  // 받아온 토큰으로 카카오에게 유저정보 요청
  if (!kakaoToken) {
    return res.status(401).json({ message: 'kakao authenfication err' });
  }
  let userdata = await axios
    .get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        'Content-type': `application/x-www-form-urlencoded;charset=utf-8`,
        Authorization: `Bearer ${kakaoToken.data.access_token}`,
      },
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: '카카오 서버 이상' });
    });
  if (userdata) {
    if (userdata.data.kakao_account.email) {
      let userInfo = {
        email: userdata.data.kakao_account.email,
        provider: 'kakao',
      };
      res.status(200).json({ data: userInfo, message: 'ok' });
    } else {
      res.status(404).json({ message: 'need allow email' });
    }
  }
};
