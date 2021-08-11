import React from 'react';
import { Select } from 'antd';

function SelectBox({ func, data, keyData }) {
  console.log(keyData);
  return (
    <Select name="state" style={{ width: '100%' }} onChange={func(keyData)} placeholder="데이터를 선택해주세요.">
      {data.map((el) => (
        <Select.Option value={el}>{el}</Select.Option>
      ))}
    </Select>
  );
}

export default SelectBox;
