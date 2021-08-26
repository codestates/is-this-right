import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import styled, { keyframes } from 'styled-components';
import SelectBox from '../components/adviser/SelectBox';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import UploadCompo from '../components/UploadCompo';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const QuestionPostPageContainer = styled(ContainerStlye)`
  width: 50vw;
  flex-direction: column;
  gap: 20px;
`;

const LabelStyle = styled.label`
  font-size: 20px;
`;

const InputStyle = styled(Input)`
  margin-top: 6px;
  margin-bottom: 12px;
`;
const ImgPreview = styled.div`
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

const textFade = keyframes`
0% { color:white;}
50% { color:red;}
        100% {color:white; }
`;
const AlertMessageStyle = styled.div`
  color: red;
  animation: ${textFade} 0.5s linear infinite;
`;

function QuestionPostPage({ post, setPost, setIsEdit }) {
  const state = useSelector((state) => state.postReducer.postImgs);
  const [previewList, setPreviewList] = useState([]);
  const [sourcesToDelete, setSourcesToDelete] = useState([]);
  const history = useHistory();
  const [postInfo, setPostInfo] = useState({
    title: '',
    category: '',
    content: '',
  });
  const [validation, setValidation] = useState({
    title: '',
    category: '',
    content: '',
  });

  useEffect(() => {
    if (post) {
      let info = post.data[0];
      setPostInfo({ title: info.title, category: info.category, content: info.content });
      setPreviewList(post.data.sources.slice());
    }
  }, []);
  console.log(postInfo);
  const handleInputValue = (key, e) => {
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
    if (post) {
      formData.append('toDelete', sourcesToDelete);
      axios
        .put(`${url}/posts/${post.data[0].id}`, formData, {
          header: { 'Content-Type': 'multipart/form-data' },
        })
        .then((result) => {
          setIsEdit(false);
          history.go(0);
        });
    } else {
      if (Object.values(postInfo).length === 3) {
        axios
          .post(`${url}/posts`, formData, {
            header: { 'Content-Type': 'multipart/form-data' },
          })
          .then((result) => {
            window.location.replace('/');
          })
          .catch((err) => {
            // setUsernameErr('모든 정보 입력 후 다시 시도 해주세요.');
          });
      }
    }
  };

  const handleDeletePreview = (id) => {
    setPreviewList(previewList.filter((source) => source.id !== id));
    setSourcesToDelete([...sourcesToDelete, id]);
  };

  const checkValidation = (name) => {
    if (name === 'title') {
      if (postInfo.title === '') {
        setValidation({ ...validation, [name]: '타이틀을 입력해주세요.' });
      } else {
        setValidation({ ...validation, [name]: '' });
      }
    }
    if (name === 'category') {
      if (postInfo.category === '') {
        setValidation({ ...validation, [name]: '카테고리를 선택해주세요.' });
      } else {
        setValidation({ ...validation, [name]: '' });
      }
    }
    if (name === 'content') {
      if (postInfo.content === '') {
        setValidation({ ...validation, [name]: '내용을 입력해주세요.' });
      } else {
        setValidation({ ...validation, [name]: '' });
      }
    }
  };
  return (
    <BodyAreaStyle>
      <QuestionPostPageContainer>
        <LabelStyle htmlFor="title">Title</LabelStyle>
        <InputStyle
          name="title"
          type="text"
          size="large"
          value={postInfo.title}
          onChange={(e) => handleInputValue('title', e)}
          onBlur={() => checkValidation('title')}
          style={{ margin: '12px 0 6px 0' }}
          placeholder="제목을 입력해주세요"
          required
        />
        {validation.title ? <AlertMessageStyle>{validation.title}</AlertMessageStyle> : null}
        <LabelStyle htmlFor="username">Category</LabelStyle>
        <SelectBox
          func={handleInputValue}
          data={['헬스', '골프', '클라이밍', '기타-추가예정']}
          keyData={'category'}
          name="category"
          value={postInfo.category}
          validation={checkValidation}
          required
        />
        {validation.category ? <AlertMessageStyle>{validation.category}</AlertMessageStyle> : null}
        <div style={{ display: 'flex' }}>
          {post
            ? previewList.map((item) => {
                if (item.type === 'image') {
                  return (
                    <ImgPreview key={item.id}>
                      <img src={item.sourceUrl} style={{ width: '200px', margin: '10px' }} />
                      <div
                        onClick={() => {
                          handleDeletePreview(item.id);
                        }}>
                        삭제
                      </div>
                    </ImgPreview>
                  );
                } else
                  return (
                    <ImgPreview key={item.id}>
                      <video src={item.sourceUrl} style={{ width: '200px', margin: '10px' }}></video>
                      <div
                        onClick={() => {
                          handleDeletePreview(item.id);
                        }}>
                        삭제
                      </div>
                    </ImgPreview>
                  );
              })
            : null}
        </div>
        <UploadCompo where="postImg" post={post} />
        <LabelStyle htmlFor="content">Content</LabelStyle>
        <Input.TextArea
          name="content"
          onChange={(e) => handleInputValue('content', e)}
          onBlur={() => checkValidation('content')}
          placeholder="내용을 입력해주세요"
          value={postInfo.content}
          required
        />
        {validation.content ? <AlertMessageStyle>{validation.content}</AlertMessageStyle> : null}
        <Button
          onClick={() => {
            if (postInfo.category) {
              handlePost();
            } else {
              setValidation({ ...validation, category: '카테고리를 선택해주세요.' });
            }
          }}>
          Submit
        </Button>
        {post ? (
          <Button
            style={{ background: 'red' }}
            onClick={() => {
              setIsEdit(false);
            }}>
            Cancel
          </Button>
        ) : null}
      </QuestionPostPageContainer>
    </BodyAreaStyle>
  );
}

export default QuestionPostPage;
