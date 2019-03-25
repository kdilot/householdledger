import React, { Component } from 'react';
import { DataPage, CategoryPage, ReportPage } from 'page';
import { Button, Tabs, DatePicker } from 'antd';
import moment from 'moment';
import Context from 'context';
import './page.scss';
const TabPane = Tabs.TabPane
const monthFormat = 'MM/DD/YYYY'

class PageList extends Component {
  render() {
    return (
      <Context.Consumer>
        {c => {
          return (
            <header className="Head-tab">
              <h1 className="bold">{c.today.format('MMM YYYY')}</h1>
              <DatePicker value={moment(c.today)} format={monthFormat} onChange={(date) => { c.changeDate(date) }} />
              <Tabs defaultActiveKey="1" tabBarExtraContent={<Button type="primary" onClick={() => { c.changeFlag() }} >Back</Button>} onTabClick={(key) => { c.changeTab(key) }} style={{ width: '100%' }}>
                <TabPane tab="Data" key="1"><DataPage {...c} /></TabPane>
                <TabPane tab="Category" key="2"><CategoryPage {...c} /></TabPane>
                <TabPane tab="Report" key="3"><ReportPage {...c} /></TabPane>
              </Tabs>
            </header>
          )
        }}
      </Context.Consumer>
    );
  }
}

export default PageList;