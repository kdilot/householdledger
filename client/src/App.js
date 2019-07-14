import React, { Component } from 'react';
import { MainPage, PageList } from 'page';
import moment from 'moment';
import Context from 'context';
import { ApiGet } from 'common/Api';
import './main.scss';

class App extends Component {
  getCategoryList = () => {
    ApiGet('category-list').then(res => {
      this.setState({ categoryData: res.data })
    })
  }
  changeFlag = () => {
    const { flag } = this.state
    this.setState({ flag: !flag })
  }
  changeTab = (key) => {
    if (key === '3') {
      const { tabFlag } = this.state
      this.setState({ tabFlag: !tabFlag })
    }
  }
  changeDate = (date) => {
    if (date)
      this.setState({ today: date })
  }
  changeMonth = (plus) => {
    const { today } = this.state
    plus ?
      this.setState({
        today: today.add(1, 'month').set('date', 1)
      })
      :
      this.setState({
        today: today.add(-1, 'month').set('date', 1)
      })
  }
  state = {
    flag: true,
    tabFlag: true,
    today: moment(),
    categoryData: [],
    changeTab: this.changeTab,
    changeDate: this.changeDate,
    changeMonth: this.changeMonth,
    changeFlag: this.changeFlag,
    getCategoryList: this.getCategoryList,
  }
  componentDidMount() {
    this.getCategoryList()
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        <div className="Head">
          {0 ?
            <MainPage />
            :
            <PageList />
          }
        </div>
      </Context.Provider>
    );
  }
}

export default App;
