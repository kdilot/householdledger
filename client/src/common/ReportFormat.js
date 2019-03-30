import React, { Component } from 'react';
import { CurrencyFormat } from 'common';
import Context from 'context';
import { Col, Avatar } from 'antd';

class ReportFormat extends Component {
  render() {
    const {
      des,
      income,
      expense,
      col,
      type
    } = this.props
    return (
      <Context.Consumer>
        {c => {
          return (
            < Col xs={24} sm={col ? 24 : 12} md={col ? 24 : 12} lg={col ? 24 : 6} xl={col ? 24 : 4} >
              <div className={c.today.format(type).localeCompare(des) === 0 ? "reportbox selected" : "reportbox"}>
                <Col span={4}>
                  <h1><Avatar className={c.today.format(type).localeCompare(des) === 0 ? "avatar selected" : "avatar"} size={35}>{des}</Avatar></h1>
                </Col>
                <Col span={10}>
                  <h1 className="plus"><CurrencyFormat price={income} /></h1>
                </Col>
                <Col span={10}>
                  <h1 className="minus"><CurrencyFormat price={expense} /></h1>
                </Col>
              </div>
            </Col>
          )
        }}
      </Context.Consumer>
    );
  }
}

export default ReportFormat;