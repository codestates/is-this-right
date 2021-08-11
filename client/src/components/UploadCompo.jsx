import React, { useState } from 'react';
import { Upload } from 'antd';
import styled from 'styled-components';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const LabelStyle = styled.label`
  font-size: 20px;
`;

const UploadImgTagStyle = styled.img`
  width: 300px;
  height: 150px;
  object-fit: cover;
  margin: 0px;
  padding: 0px;
`;

function UploadCompo({ where, setImgFile }) {
  const [preview, setPreview] = useState(null);

  const uploadImage = () => {
    console.log('제발');
  };

  const handleImageFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setPreview(base64.toString()); // 파일 base64 상태 업데이트
        setImgFile(preview);
      }
    };
    if (event.file.originFileObj) {
      reader.readAsDataURL(event.file.originFileObj); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.file.originFileObj); // 파일 상태 업데이트
    }
    console.log(preview);
  };
  return (
    <div style={{ height: '150px', marginBottom: '32px' }}>
      <LabelStyle htmlFor="file">Profile image</LabelStyle>
      <Dragger
        name="image"
        customRequest={uploadImage}
        listType="picture"
        multiple={where === 'user' ? false : true}
        showUploadList={false}
        onChange={handleImageFile}>
        {preview ? (
          <UploadImgTagStyle src={preview} alt="" />
        ) : (
          <div>
            <div>
              <InboxOutlined />
            </div>
            <span>프로필 이미지를 업로드해주세요</span>
          </div>
        )}
      </Dragger>
    </div>
  );
}

export default UploadCompo;
