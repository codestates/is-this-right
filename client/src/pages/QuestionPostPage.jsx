import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import SelectBox from '../components/adviser/SelectBox';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import UploadCompo from '../components/UploadCompo';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const LabelStyle = styled.label`
  font-size: 20px;
`;

const InputStyle = styled(Input)`
  margin-top: 6px;
  margin-bottom: 12px;
`;
const ImgTest = styled.div`
  position: relative;
  width: auto;

  > :nth-child(2) {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    color: white;
    transform: translate(-50%, -50%);
  }
  :hover {
    > :nth-child(2) {
      display: inline;
      :hover {
        cursor: pointer;
      }
    }
  }
`;
function QuestionPostPage({ post, setPost, setIsEdit }) {
  const state = useSelector((state) => state.postReducer.postImgs);
  const [postInfo, setPostInfo] = useState({
    title: '',
    category: '',
    content: '',
  });

  useEffect(() => {
    if (post) {
      let info = post.data[0];
      setPostInfo({ title: info.title, category: info.category, content: info.content });
    }
  }, []);
  const handleInputValue = (key, e) => {
    console.log(key);

    console.log(e);
    console.log(postInfo);
    if (key === 'category') {
      setPostInfo({ ...postInfo, [key]: e });
    } else {
      setPostInfo({ ...postInfo, [key]: e.target.value });
    }
  };

  const handlePost = () => {
    const images = state.imgFile;
    const formData = new FormData();

    for (let el of images) {
      formData.append('files', el);
    }
    for (let key in postInfo) {
      formData.append(key, postInfo[key]);
    }
    console.log(postInfo);
    if (Object.values(postInfo).length === 3) {
      axios
        .post(`${url}/posts`, formData, {
          header: { 'Content-Type': 'multipart/form-data' },
        })
        .then((result) => {
          // setSuccessSignUp(true);
          window.location.replace('/');
          // alert('게시성공');
        })
        .catch((err) => {
          // setUsernameErr('모든 정보 입력 후 다시 시도 해주세요.');
        });
    }
    // window.location.replace('SignIn'); // 삭제 해줘야함
  };
  return (
    <BodyAreaStyle>
      <ContainerStlye style={{ padding: '50px' }}>
        <LabelStyle htmlFor="title">Title</LabelStyle>
        <InputStyle
          name="title"
          type="text"
          size="large"
          value={postInfo.title}
          onChange={(e) => handleInputValue('title', e)}
          style={{ margin: '12px 0 6px 0' }}
          placeholder="제목을 입력해주세요"
          required
        />
        <LabelStyle htmlFor="username">Category</LabelStyle>
        <SelectBox
          func={handleInputValue}
          data={['헬스', '골프', '클라이밍', '기타-추가예정']}
          keyData={'category'}
          name="category"
          value={postInfo.category}
          validation={() => {}}
          required
        />
        <div style={{ display: 'flex' }}>
          {post
            ? post.data.sources.map((item) => {
                if (item.type === 'image') {
                  return (
                    <ImgTest>
                      <img key={item.id} src={item.sourceUrl} style={{ width: '200px', margin: '10px' }} />
                      <div>테스트입니다</div>
                    </ImgTest>
                  );
                } else
                  return (
                    <ImgTest>
                      <video key={item.id} src={item.sourceUrl} style={{ width: '200px', margin: '10px' }}></video>
                      <div>테스트입니다</div>
                    </ImgTest>
                  );
              })
            : null}
        </div>
        <UploadCompo where="postImg" post={post} />
        <LabelStyle htmlFor="content">Content</LabelStyle>
        <Input.TextArea
          name="content"
          onChange={(e) => handleInputValue('content', e)}
          placeholder="내용을 입력해주세요"
          value={postInfo.content}
          required
        />
        <Button onClick={handlePost}>Submit</Button>
        {post ? (
          <Button
            style={{ background: 'red' }}
            onClick={() => {
              setIsEdit(false);
            }}>
            Cancel
          </Button>
        ) : null}
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default QuestionPostPage;
