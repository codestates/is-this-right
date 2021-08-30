import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import styled, { keyframes } from 'styled-components';
import SelectBox from '../components/adviser/SelectBox';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import UploadCompo from '../components/UploadCompo';
import { useHistory } from 'react-router-dom';
import { saveCategory } from '../actions/postActionIndex';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
const QuestionPostBody = styled(BodyAreaStyle)`
  background: #f4f4f4;
`;
const QuestionPostPageContainer = styled(ContainerStlye)`
  background: #fefefe;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  width: 50vw;
  flex-direction: column;
  margin-top: 30px;
  border-radius: 20px 20px 0 0;
  padding: 50px 10vw 0px 10vw;
  justify-content: flex-start;

  @media ${(props) => props.theme.mobile} {
    width: 100vw;
    margin: 0;
    border-radius: 0;
    padding: 30px 50px 0px 50px;
  }

  .label {
    font-size: 1.1rem;
  }
  .title {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;
  }
  .category {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;
  }
  .image {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content {
    margin-top: -40px;
  }
  .submitArea {
    display: flex;
    justify-content: flex-end;
    border: 1px solid #ddd;
    border-top: none;
    border-radius: 0 0 5px 5px;
    padding: 10px;
    gap: 10px;
    .cancelButton {
      font-family: 'font-css';
      color: #0077b6;
      background: #efefef;
      border-radius: 7px;
      padding: 10px 30px 10px 30px;
      :hover {
        cursor: pointer;
        background: #dfdfdf;
        transition: 0.2s;
      }
    }
    .submitButton {
      font-family: 'font-css';
      color: #fafafa;
      background: #0076bb;
      border-radius: 7px;
      padding: 10px 30px 10px 30px;
      :hover {
        cursor: pointer;
        background: rgb(0, 119, 182, 0.9);
        transition: 0.2s;
      }
    }
    @media ${(props) => props.theme.mobile} {
      margin-bottom: 15vh;
    }
  }
`;

const ImgPreview = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 10px;
  .deleteButton {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    color: white;
    transform: translate(-50%, -50%);
  }
  :hover .deleteButton {
    width: 200px;
    height: 100%;
    margin-left: -27%;
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* > :nth-child(2) {
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
  } */
`;

const textFade = keyframes`
0% { color:white;}
50% { color:red;}
        100% {color:white; }
`;
const AlertMessageStyle = styled.div`
  font-size: 0.8rem;
  color: red;
  animation: ${textFade} 0.5s linear infinite;
`;

function QuestionPostPage({ post, setPost, setIsEdit }) {
  const state = useSelector((state) => state.postReducer.postImgs);
  const dispatch = useDispatch();
  const [previewList, setPreviewList] = useState([]);
  const [sourcesToDelete, setSourcesToDelete] = useState([]);
  const history = useHistory();
  const [postInfo, setPostInfo] = useState({
    title: '',
    category: '헬스',
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

      setPostInfo({
        title: info.title,
        category: info.category,
        content: info.content.replace(/<p>/g, '').split('</p>').join('\n'),
      });
      setPreviewList(post.data.sources.slice());
    }
  }, []);

  const removeValidation = () => {
    setValidation({
      title: '',
      category: '',
      content: '',
    });
  };
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
      if (key === 'content') {
        formData.append(key, '<p>' + postInfo[key].split('\n').join('</p><p>') + '</p>');
      } else {
        formData.append(key, postInfo[key]);
      }
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
            dispatch(saveCategory(postInfo.category));
            history.push('/');
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
    <QuestionPostBody>
      <QuestionPostPageContainer>
        <div className="title">
          <div className="label">제목</div>
          <Input
            name="title"
            type="text"
            size="default"
            value={postInfo.title}
            onChange={(e) => handleInputValue('title', e)}
            onClick={removeValidation}
            placeholder="제목을 입력해주세요"
            required
          />
          {validation.title ? <AlertMessageStyle>{validation.title}</AlertMessageStyle> : null}
        </div>
        <div className="category">
          <div className="label">카테고리</div>
          <SelectBox
            func={handleInputValue}
            data={['헬스', '골프', '클라이밍', '기타-추가예정']}
            keyData={'category'}
            name="category"
            value={postInfo.category}
            validation={() => {}}
            required
          />
          {validation.category ? <AlertMessageStyle>{validation.category}</AlertMessageStyle> : null}
        </div>
        <div className="image">
          <div className="label">사진 / 영상</div>
          {post
            ? previewList.map((item) => {
                if (item.type === 'image') {
                  return (
                    <ImgPreview key={item.id}>
                      <img src={item.sourceUrl} style={{ width: '200px' }} />
                      <div
                        className="deleteButton"
                        onClick={() => {
                          handleDeletePreview(item.id);
                        }}>
                        <DeleteOutlined />
                      </div>
                    </ImgPreview>
                  );
                } else
                  return (
                    <ImgPreview key={item.id}>
                      <video src={item.sourceUrl} style={{ width: '200px', margin: '10px' }}></video>
                      <div
                        className="deleteButton"
                        onClick={() => {
                          handleDeletePreview(item.id);
                        }}>
                        <DeleteOutlined />
                      </div>
                    </ImgPreview>
                  );
              })
            : null}
          <UploadCompo where="postImg" post={post} />
        </div>
        <div className="content">
          <div className="label">내용</div>
          <Input.TextArea
            name="content"
            onChange={(e) => handleInputValue('content', e)}
            placeholder="내용을 입력해주세요"
            onClick={removeValidation}
            value={postInfo.content}
            rows={10}
            required
          />
          {validation.content ? <AlertMessageStyle>{validation.content}</AlertMessageStyle> : null}
        </div>
        <div className="submitArea">
          {post ? (
            <div
              className="cancelButton"
              onClick={() => {
                setIsEdit(false);
              }}>
              Cancel
            </div>
          ) : null}
          <div
            className="submitButton"
            onClick={() => {
              if (postInfo.category && postInfo.title && postInfo.content) {
                handlePost();
              } else {
                if (!postInfo.category)
                  setValidation((state) => {
                    return { ...state, category: '카테고리를 선택해주세요.' };
                  });
                if (!postInfo.title)
                  setValidation((state) => {
                    return { ...state, title: '제목을 입력해주세요.' };
                  });
                if (!postInfo.content)
                  setValidation((state) => {
                    return { ...state, content: '내용을 입력해주세요.' };
                  });
              }
            }}>
            질문하기
          </div>
        </div>
      </QuestionPostPageContainer>
    </QuestionPostBody>
  );
}

export default QuestionPostPage;
