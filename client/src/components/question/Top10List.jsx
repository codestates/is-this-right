import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getTopAdvisers } from '../../actions/adviserActionIndex';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Top10Container = styled.div`
  background: #0077b6;
  min-width: 300px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .top10Title {
    position: relative;
    display: flex;
    justify-content: center;
    font-weight: bold;
    width: 100%;
    height: 50px;
    color: #fafafa;
    background-image: url('../../imageFile/rank.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 20px;

    div {
      position: absolute;
      height: 100%;
      top: 8px;
    }
  }
  .top10Name {
    font-family: 'font-css';
  }
  .top10List {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    font-size: 0.8rem;

    .top3 {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: flex-end;
      gap: 10px;
      width: 100%;
      color: #fafafa;

      .rank {
        border-radius: 5px 5px 0 0;
        display: flex;
        margin-top: 2px;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 3px;
        width: 100%;
        color: white;
        font-weight: bold;
        font-family: 'font-css';
      }
      .rank1 {
        order: 2;
        .rank {
          min-height: 60px;
          background: #ffd700;
          font-size: 1.5rem;
        }
        .top10SelectedCount {
          font-size: 1.3rem;
        }
      }
      .rank2 {
        order: 1;
        .rank {
          background: silver;
          min-height: 50px;
          font-size: 1.3rem;
        }
        .top10SelectedCount {
          font-size: 1.2rem;
        }
      }
      .rank3 {
        order: 3;
        .rank {
          background: #c37336;
          min-height: 40px;
          font-size: 1.1rem;
        }
        .top10SelectedCount {
          font-size: 1.1rem;
        }
      }
      .top10Item {
        :hover {
          cursor: pointer;
          > .top10Name {
            text-decoration: underline;
            text-underline-position: under;
          }
        }
        position: relative;
        width: 80px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
        padding-bottom: 0;
        .top10Avatar {
          position: relative;
        }
        .top10Name {
          position: relative;
          margin-top: 5px;
        }
        .top10SelectedCount {
          position: relative;
          font-weight: bold;
        }
        .rank {
          position: relative;
        }
      }
    }
    .remains {
      background: #fff;
      height: 100%;
      padding: 10px 20px 10px 20px;
      border-radius: 20px 20px 0 0;
      display: flex;
      flex-direction: column;
      .top10Item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        padding: 10px 5px 5px 10px;
        :hover {
          cursor: pointer;
          > .top10Name {
            text-decoration: underline;
            text-underline-position: under;
          }
        }

        .rank {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex: 1;
          position: relative;
          font-weight: bold;
          font-size: 1rem;
        }
        .top10Avatar {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex: 2;
          position: relative;
        }
        .top10Name {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex: 3;
          position: relative;
        }
        .top10SelectedCount {
          gap: 3px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex: 4;
          position: relative;
          font-weight: bold;
          .count {
            font-size: 1rem;
          }
        }
      }
    }
  }
  @media ${(props) => props.theme.mobile} {
  }
`;
const BorderedAvatar = styled(Avatar)`
  border-radius: 30%;
`;

function Top10List() {
  const top10List = useSelector((state) => state.adviserReducer.topAdvisers);
  const history = useHistory();
  const handleDetail = (adviserId) => {
    history.push(`/advisers/${adviserId}`);
  };
  return (
    <Top10Container>
      <div className="top10Title">
        <div>Most Helpful</div>
      </div>
      <div className="top10List">
        <div className="top3">
          {top10List
            .filter((el, index) => index < 3)
            .map((el, index) => (
              <div className={`top10Item rank${index + 1}`} key={el.id} onClick={() => handleDetail(el.id)}>
                <div className="top10Avatar">
                  <BorderedAvatar shape={'square'} size={60} src={<img src={el.profileImg} />} />
                </div>
                <div className="top10Name">{el.name}</div>
                <div className="top10SelectedCount">
                  <span>{el.selectedCount}</span>
                </div>
                <div className="rank">{index + 1}</div>
              </div>
            ))}
        </div>
        <div className="remains">
          {top10List
            .filter((el, index) => index > 2)
            .map((el, index) => (
              <div className={`top10Item rank${index + 4}`} key={el.id} onClick={() => handleDetail(el.id)}>
                <div className="rank">{index + 4}</div>
                <div className="top10Avatar">
                  <BorderedAvatar shape={'square'} size={40} src={el.profileImg} />
                </div>
                <div className="top10Name">{el.name}</div>
                <div className="top10SelectedCount">
                  <CheckCircleOutlined style={{ color: '#0096c7' }} />
                  <span className="count">{el.selectedCount}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Top10Container>
  );
}

export default Top10List;
