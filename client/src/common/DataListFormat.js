import React from 'react';
import { Card, Col, Icon, Empty, Spin } from 'antd';
import { CurrencyFormat } from 'common';
import moment from 'moment';
import './DataListFormat.scss';
const monthFormat = 'MM/DD/YYYY';

const DataListFormat = (prop) => {
  const {
    state,
    categoryData,
    loading
  } = prop
  const {
    data,
    removeData,
    showDrawer
  } = state
  return (
    <Card className="dataList">
      {data.length > 0 ?
        data.map((m, i) => {
          return (
            <Card.Grid className="card" key={i}>
              <Col span={12}><h4 className="alignLeft">
                <Icon type="folder-open" style={{ fontSize: '2em', marginRight: '0.2em' }} onClick={() => { showDrawer(m) }} />
                <Icon type="delete" style={{ fontSize: '2em' }} onClick={() => { removeData(m._id) }} />
              </h4>
              </Col>
              <Col span={12}><h2>{moment(m.lastUpdate).format(monthFormat)}</h2></Col>
              <Col span={24}><h1 className={m.type ? 'plus' : 'minus'}>{m.type ? '+' : '-'}<CurrencyFormat price={m.price} digit={2} /></h1></Col>
              <Col span={24}><h3>{categoryData.length > 0 && categoryData.filter(f => f._id === m.category)[0] ? categoryData.filter(f => f._id === m.category)[0].title : '-'}</h3></Col>
              <Col span={24}><h2 className="title">{m.title}</h2></Col>
            </Card.Grid>
          )
        })
        : loading ? <Spin /> : <Empty />
      }
    </Card>
  );
};

export default DataListFormat;