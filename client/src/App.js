import React, { Component } from 'react';
import { MainPage, PageList } from 'page';
import moment from 'moment';
import './main.scss';

class App extends Component {
  changeFlag = () => {
    const { flag } = this.state
    this.setState({ flag: !flag })
  }
  changeDate = (date) => {
    this.setState({ today: date })
  }
  changeMonth = (plus) => {
    const { today } = this.state
    plus ?
      this.setState({
        today: today.add(1, 'month')
      })
      :
      this.setState({
        today: today.add(-1, 'month')
      })
  }
  state = {
    flag: true,
    today: moment(),
    changeDate: this.changeDate,
    changeMonth: this.changeMonth,
    changeFlag: this.changeFlag
  }
  render() {
    const {
      flag,
    } = this.state
    return (
      <div className="Head">
        {flag ?
          <MainPage {...this.state} />
          :
          <PageList {...this.state} />
        }
      </div>
    );
  }
}

export default App;
