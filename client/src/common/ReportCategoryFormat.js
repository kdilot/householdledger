import React, { Component } from 'react';
import { CurrencyFormat } from 'common';
import Context from 'context';
import { Col } from 'antd';

class ReportCategoryFormat extends Component {
  render() {
    const {
      des,
      size,
      income,
      expense,
      month
    } = this.props
    return (
      <Context.Consumer>
        {c => {
          return (
            < Col span={size ? size : 12} >
              <Col span={24} className={c.today.format('M').localeCompare(month) === 0 ? "reportCategoryList categorySelected" : 'reportCategoryList'} style={{ padding: 0 }}>
                <p>{des}</p>
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

export default ReportCategoryFormat;