import React, { Component } from 'react';
import { DataPage, CategoryPage } from 'page';
import { Button, Tabs, DatePicker } from 'antd';
import { WithWidget } from 'common';
import moment from 'moment';
import './page.scss';
const TabPane = Tabs.TabPane
const monthFormat = 'MM/DD/YYYY';

class PageList extends Component {
  render() {
    const {
      today,
      changeDate,
      changeFlag
    } = this.props
    const Test = WithWidget(<CategoryPage />)
    return (
      <header className="Head-tab">
        <DatePicker defaultValue={moment(today, monthFormat)} format={monthFormat} onChange={(date) => { changeDate(date) }} />
        <Tabs defaultActiveKey="1" tabBarExtraContent={<Button type="primary" onClick={() => { changeFlag() }}>Back</Button>} style={{ width: '100%' }}>
          <TabPane tab="Data" key="1"><DataPage today={today} /></TabPane>
          <TabPane tab="Category" key="2"><CategoryPage {...this.state} /></TabPane>
          <TabPane tab="Report" key="3"><Test /></TabPane>
        </Tabs>
      </header>
    );
  }
}

export default PageList;