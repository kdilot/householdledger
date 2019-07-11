import React, { Component } from 'react';
import { CurrencyFormat } from 'common';
import Context from 'context';
import { Col } from 'antd';
import './ReportListFormat.scss';

class ReportListFormat extends Component {
  render() {
    const {
      des,
      size,
      income,
      expense,
      type
    } = this.props
    return (
      <Context.Consumer>
        {c => {
          return (
            <Col span={size ? size : 12}>
              <Col span={24} className={c.today.format(type).localeCompare(des) === 0 ? "reportList selected" : "reportList"} style={{ padding: 0 }}>
                <p className={c.today.format(type).localeCompare(des) === 0 ? "selected" : ''}>{des}</p>
                <p className="plus"><CurrencyFormat price={income} /></p>
                <p className="minus"><CurrencyFormat price={expense} /></p>
              </Col>
            </Col>
          )
        }}
      </Context.Consumer>
    );
  }
}

export default ReportListFormat;