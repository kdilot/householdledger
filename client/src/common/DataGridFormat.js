import React from 'react';
import { Col, Icon, Empty, Spin } from 'antd';
import { CurrencyFormat } from 'common';
import moment from 'moment';
import './DataGridFormat.scss';
const monthFormat = 'MM/DD';

const DataGridFormat = (prop) => {
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
    <div>
      {data.length > 0 ?
        data.map((m, i) => {
          return (
            <Col xs={24} sm={24} md={24} lg={12} xl={12} key={i}>
              <div className="dataGrid">
                <div className={m.type ? 'group plus' : 'group minus'}>
                  <h1>{moment(m.lastUpdate).format(monthFormat)}</h1>
                  <h4>
                    <Icon type="info-circle" style={{ fontSize: '1.5em', marginRight: '0.2em' }} onClick={() => { showDrawer(m) }} />
                    <Icon type="close-circle" style={{ fontSize: '1.5em' }} onClick={() => { removeData(m._id) }} />
                  </h4>
                </div>
                <div className="group">
                  <h3>{categoryData.length > 0 && categoryData.filter(f => f._id === m.category)[0] ? categoryData.filter(f => f._id === m.category)[0].title : '-'}</h3>
                  <h2 className={m.type ? 'plus' : 'minus'}>{m.type ? '+' : '-'}
                    <CurrencyFormat price={m.price} digit={2} />
                  </h2>
                </div>
                <h3 className="title">{m.title}</h3>
              </div>
            </Col>
          )
        })
        : loading ? <Spin /> : <Empty />
      }
    </div>
  );
};

export default DataGridFormat;