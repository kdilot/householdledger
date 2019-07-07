import React from 'react';
import { Col, Spin, Empty } from 'antd';

const Loading = ({ loading }) => {
  return (
    <Col span={24}>
      {loading ? <Spin /> : <Empty />}
    </Col>
  );
};

export default Loading;