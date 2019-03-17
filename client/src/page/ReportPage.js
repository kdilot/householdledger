import React, { Component } from 'react';
import { ReportFormat } from 'common';
import { Row, Col } from 'antd';
import './report.scss';

class ReportPage extends Component {
  render() {
    return (
      <div>
        <div className="box">
          <h3 className="alignLeft">DAILY REPORT</h3>
          <Col span={24}>
            <Row gutter={10}>
              <ReportFormat des={'JAN'} income={132434} expense={43534653} />
              <ReportFormat des={'JAN'} income={234} expense={423324} />
              <ReportFormat des={'JAN'} income={3453} expense={52} />
              <ReportFormat des={'JAN'} income={124} expense={3211} />
              <ReportFormat des={'JAN'} income={22234} expense={42353} />
            </Row>
          </Col>
        </div>
        <div className="box">
          <h3 className="alignLeft">INCOME / EXPENSE</h3>
          <Col span={24}>
            <Row gutter={10}>
              <ReportFormat des={'JAN'} income={132434} expense={43534653} />
              <ReportFormat des={'JAN'} income={234} expense={423324} />
              <ReportFormat des={'JAN'} income={3453} expense={52} />
              <ReportFormat des={'JAN'} income={124} expense={3211} />
              <ReportFormat des={'JAN'} income={22234} expense={42353} />
              <ReportFormat des={2019} income={22234} expense={42353} />
            </Row>
          </Col>
        </div>
        <div className="box">
          <h3 className="alignLeft">CATEGORY</h3>
          <Col span={24}>
            <Row gutter={10}>
              <Col span={4}>
                <Col span={24}>
                  <div className="reportTitle">
                    sdfsd
                  </div>
                </Col>
                <Col span={24}>
                  <Row gutter={10}>
                    <ReportFormat des={'JAN'} income={132434} expense={43534653} col={true} />
                    <ReportFormat des={'JAN'} income={234} expense={423324} col={true} />
                    <ReportFormat des={'JAN'} income={3453} expense={52} col={true} />
                    <ReportFormat des={'JAN'} income={124} expense={3211} col={true} />
                    <ReportFormat des={'JAN'} income={22234} expense={42353} col={true} />
                    <ReportFormat des={'JAN'} income={22234} expense={42353} col={true} />
                    <ReportFormat des={'JAN'} income={22234} expense={42353} col={true} />
                    <ReportFormat des={'JAN'} income={22234} expense={42353} col={true} />
                    <ReportFormat des={'JAN'} income={22234} expense={42353} col={true} />
                    <ReportFormat des={'JAN'} income={22234} expense={42353} col={true} />
                    <ReportFormat des={'JAN'} income={22234} expense={42353} col={true} />
                    <ReportFormat des={'JAN'} income={22234} expense={42353} col={true} />
                  </Row>
                </Col>
              </Col>
            </Row>
          </Col>
        </div>
      </div>
    );
  }
}

export default ReportPage;