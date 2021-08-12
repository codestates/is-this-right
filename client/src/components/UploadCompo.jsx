import React, { useState, useEffect, useMemo } from 'react';
import { Upload, Modal } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { userProfileImg } from '../actions/userActionIndex';
import { adviserProfileImg } from '../actions/adviserActionIndex';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const LabelStyle = styled.label`
  font-size: 20px;
`;

const UploadImgTagStyle = styled.img`
  width: 300px;
  height: 100px;
  object-fit: cover;
  margin: 0px;
  padding: 0px;
`;

function UploadCompo({ where }) {
  const [preview, setPreview] = useState(null);
  const [adviserState, setAdviserState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer.userProfileImg);
  const adviserPriviewState = useSelector((state) => state.adviserReducer.adviserProfileImg);

  const uploadImage = () => {
    console.log('제발');
  };

  useEffect(() => {
    setPreview(state.preview);
  }, [preview]);

  const handleImageFile = (event) => {
    // console.log(event);

    console.log('클라작동');
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        const pre = base64.toString();
        dispatch(userProfileImg(event.file.originFileObj, pre));
        setPreview('제발');
      }
    };
    if (event.file.originFileObj) {
      reader.readAsDataURL(event.file.originFileObj); // 1. 파일을 읽어 버퍼에 저장합니다.
      // setImgFile(event.file.originFileObj); // 파일 상태 업데이트
    }
  };

  const handleImageFileMulti = (event) => {
    console.log(event);
    // console.log('클라작동');
    // let reader = new FileReader();
    // reader.onloadend = () => {
    //   // 2. 읽기가 완료되면 아래코드가 실행됩니다.
    //   const base64 = reader.result;
    //   if (base64) {
    //     const pre = base64.toString();
    //     dispatch(userProfileImg(event.file.originFileObj, pre));
    //     setPreview('제발');
    //   }
    // };
    // if (event.file.originFileObj) {
    //   reader.readAsDataURL(event.file.originFileObj); // 1. 파일을 읽어 버퍼에 저장합니다.
    //   // setImgFile(event.file.originFileObj); // 파일 상태 업데이트
    // }
  };
  // setAdviserState({ ...adviserState, fileList }
  // const handleChange = ({ fileList }) => setAdviserState({ fileList });
  const handleChange = ({ fileList }) => {
    console.log(fileList);
    setAdviserState({ fileList });
    fileList.forEach((el) => {
      testFunc(el);
    });
    console.log(adviserPriviewState);
  };

  const testFunc = (file) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        const pre = base64.toString();
        dispatch(adviserProfileImg(file.originFileObj, pre));
      }
    };
    if (file.originFileObj) {
      reader.readAsDataURL(file.originFileObj); // 1. 파일을 읽어 버퍼에 저장합니다.
      // setImgFile(event.file.originFileObj); // 파일 상태 업데이트
    }
  };
  // const handlePreview = async (file) => {
  //   console.log(file);
  //   if (!file.url && !file.preview) {
  //     file.preview = await getPreview(file.originFileObj);
  //   }
  // };

  // const handleCancel = () => setAdviserState({ ...adviserState, previewVisible: false });

  function getBase64(event) {
    // console.log(fileList, event);
    return new Promise((res, rej) => {
      let reader = new FileReader();

      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      // if (base64) {

      // setAdviserState({ fileList: adviserPriviewState.imaFile });
      // handleChange = ({ fileList }) => setAdviserState({ fileList });
      // setPreview('제발');
      reader.readAsDataURL(event.file.originFileObj);
      reader.onload = () => {
        res(reader.result);
      };
      // };
      // if (event.file.originFileObj) {
      //   reader.readAsDataURL(event.file.originFileObj); // 1. 파일을 읽어 버퍼에 저장합니다.
      //   // setImgFile(event.file.originFileObj); // 파일 상태 업데이트
      // }
    });
  }

  const wpqkf = async (event) => {
    let base64 = await getBase64(event);
    const pre = base64.toString();
    const data = event.file;
    console.log(event);
    data.thumbUrl = pre;
    // data.status = 'done';
    // dispatch(adviserProfileImg(data, pre));
    setAdviserState({ fileList: event.fileList });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div style={{ height: '150px', marginBottom: '32px' }}>
      <LabelStyle htmlFor="file">Profile image</LabelStyle>
      {where === 'user' ? (
        <Dragger
          name="image"
          customRequest={uploadImage}
          listType="picture"
          multiple={false}
          showUploadList={false}
          onChange={handleImageFile}>
          {preview ? (
            <UploadImgTagStyle src={state.preview} alt="" />
          ) : (
            <div>
              <div>
                <InboxOutlined />
              </div>
              <span>프로필 이미지를 업로드해주세요</span>
            </div>
          )}
        </Dragger>
      ) : (
        <div>
          <Upload
            // customRequest={uploadImage}
            action=""
            listType="picture-card"
            multiple={true}
            fileList={adviserState.fileList}
            // adviserPriviewState.imgFile
            // onPreview={handlePreview}
            onChange={handleChange}>
            {/* getBase64 */}
            {uploadButton}
          </Upload>
        </div>
      )}
    </div>
  );
}

export default UploadCompo;
