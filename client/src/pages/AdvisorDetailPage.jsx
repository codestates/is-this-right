import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Pagination, Result, Image } from 'antd';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import parse from 'html-react-parser';

import { Link, useParams } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

import AdviserFeedbackDetail from '../components/adviser/AdviserFeedbackDetail';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const UserInfoStyle = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  /* flex: 0.5 1 auto; */
  width: 100%;
  height: 20%;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
`;
const DetailStyle = styled.div`
  width: 100%;
  /* flex: 1 1 auto; */
  height: 30%;
`;
const FeedbacksStyle = styled.div`
  width: 100%;
  /* flex: 2 1 auto; */

  height: auto;
`;

const AvatarStyle = styled.div`
  height: 100%;
  margin-left: 10%;
`;

const UserStyle = styled.div`
  width: 60%;
  margin-left: 10%;
`;

const FeedbackStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PaginationStyle = styled(Pagination)`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function AdvisorDetailPage() {
  const [adviserDetailInfo, setAdviserDetailInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`${url}/advisers/${id}`).then((data) => setAdviserDetailInfo(data.data.data));
  }, []);

  //pagination states
  const PAGE_SIZE = 3;
  const [currentPageList, setCurrentPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    if (adviserDetailInfo) {
      setCurrentPage(page);
      setCurrentPageList(adviserDetailInfo.feedbacks.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
    }
  };
  useEffect(() => {
    if (adviserDetailInfo) {
      setCurrentPage(1);
      setCurrentPageList(adviserDetailInfo.feedbacks.slice(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage));
    }
  }, [adviserDetailInfo]);

  if (adviserDetailInfo === null) {
    return '정보를 받아오고 있습니다.';
  } else {
    console.log(adviserDetailInfo.feedbacks);
  }
  console.log(adviserDetailInfo);
  return (
    <BodyAreaStyle>
      <ContainerStlye style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <UserInfoStyle>
          <AvatarStyle>
            <Avatar shape="square" size={150} src={<Image src={adviserDetailInfo.profileImg} />} />
          </AvatarStyle>
          <UserStyle>
            <div>이름 : {adviserDetailInfo.name}</div>
            <div>종목 : {adviserDetailInfo.category}</div>
            <div>지역 : {adviserDetailInfo.state}</div>
            <div>
              URL : <a href={adviserDetailInfo.url}>{adviserDetailInfo.url}</a>
            </div>
          </UserStyle>
        </UserInfoStyle>
        <DetailStyle>
          <h2 style={{ backgroundColor: '#f3f3f3' }}>Detail</h2>
          <div>{parse(adviserDetailInfo.detail)}</div>
        </DetailStyle>
        <FeedbacksStyle>
          <h2 style={{ backgroundColor: '#f3f3f3' }}>Feedbacks</h2>

          {adviserDetailInfo.feedbacks.length === 0 ? (
            <FeedbackStyle>
              <Result icon={<SmileOutlined />} title="등록된 답변이 없습니다." />
            </FeedbackStyle>
          ) : (
            currentPageList.map((el) => (
              <Link to={`/posts/${el.postId}`}>
                <AdviserFeedbackDetail data={el} />
              </Link>
            ))
          )}
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
          <div>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </div>
        </FeedbacksStyle>

        <PaginationStyle
          simple
          defaultCurrent={1}
          current={currentPage}
          pageSize={PAGE_SIZE}
          onChange={handlePageChange}
          total={adviserDetailInfo.feedbacks.length}
        />
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default AdvisorDetailPage;
