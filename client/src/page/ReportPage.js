import React, { Component } from 'react';
import { ReportFormat } from 'common';
import { ApiPost } from 'common/Api';
import { Row, Col, Empty, Spin } from 'antd';
import './report.scss';
import moment from 'moment';

class ReportPage extends Component {
  getDaily = () => {
    ApiPost('data-list', { today: this.props.today }).then(res => { // Daily Report
      this.setState({ daily: [], loading: true })
      if (res.data) {
        const data = res.data.map(m => moment(m.lastUpdate).format('D')).sort((a, b) => a - b)
        const uniq = data.filter((value, index) => data.indexOf(value) === index)
        const arr = []
        uniq.map(m =>
          arr[m] = [res.data.filter(f => f.type === true && moment(f.lastUpdate).format('D') === m).map(n => n.price).reduce((a, b) => a + b, 0),
          res.data.filter(f => f.type === false && moment(f.lastUpdate).format('D') === m).map(n => n.price).reduce((a, b) => (a + b), 0).toFixed(2)]
        )
        this.setState({ daily: arr, loading: false })
      } else {
        this.setState({ loading: false })
      }
    })
  }
  getYearly = () => {
    ApiPost('data-list', { today: this.props.today, year: true }).then(res => { // Income / Expense Report
      this.setState({ inex: [], loading: true })
      if (res.data) {
        const data = res.data.map(m => moment(m.lastUpdate).format('M')).sort((a, b) => a - b)
        const category = res.data.map(m => m.category).sort((a, b) => a - b)
        const unique_m = data.filter((value, index) => data.indexOf(value) === index)
        const unique_c = category.filter((value, index) => category.indexOf(value) === index)
        const arr_m = []
        const arr_c = []
        unique_m.map(m =>
          arr_m[m] = [res.data.filter(f => f.type === true && moment(f.lastUpdate).format('M') === m).map(n => n.price).reduce((a, b) => a + b, 0),
          res.data.filter(f => f.type === false && moment(f.lastUpdate).format('M') === m).map(n => n.price).reduce((a, b) => (a + b), 0).toFixed(2)]
        )
        unique_c.map(c => {
          const arr = []
          return (
            unique_m.map(m => {
              arr[m] = [res.data.filter(f => f.type === true && f.category === c && moment(f.lastUpdate).format('M') === m).map(n => n.price).reduce((a, b) => a + b, 0),
              res.data.filter(f => f.type === false && f.category === c && moment(f.lastUpdate).format('M') === m).map(n => n.price).reduce((a, b) => (a + b), 0).toFixed(2)]
              return (
                arr_c[c] = arr
              )
            })
          )
        })
        this.setState({ inex: arr_m, cate: arr_c, loading: false })
      } else {
        this.setState({ loading: false })
      }
    })
  }
  componentDidMount() {
    this.getDaily()
    this.getYearly()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.today !== this.props.today || prevProps.tabFlag !== this.props.tabFlag) {
      this.getDaily()
      this.getYearly()
    }
  }
  state = {
    daily: [],
    inex: [],
    cate: [],
    loading: false
  }
  render() {
    const {
      daily,
      inex,
      cate,
      loading
    } = this.state
    const {
      categoryData
    } = this.props
    return (
      <div>
        <div className="box">
          <h3 className="alignLeft">DAILY REPORT</h3>
          <Col span={24}>
            <Row gutter={10}>
              {daily.length > 0 ?
                daily.map((m, i) => <ReportFormat key={i} des={i} income={m[0]} expense={m[1]} type={'D'} />)
                : loading ? <Spin /> : <Empty />}
            </Row>
          </Col>
        </div>
        <div className="box">
          <h3 className="alignLeft">INCOME / EXPENSE</h3>
          <Col span={24}>
            <Row gutter={10}>
              {inex.length > 0 ?
                inex.map((m, i) => <ReportFormat key={i} des={moment().month(i - 1).format('MMM')} income={m[0]} expense={m[1]} type={'MMM'} />)
                : loading ? <Spin /> : <Empty />}
            </Row>
          </Col>
        </div>
        <div className="box">
          <h3 className="alignLeft">CATEGORY</h3>
          <Col span={24}>
            <Row gutter={10}>
              {cate.length > 0 ?
                cate.map((m, i) =>
                  <Col span={4} key={i}>
                    <Col span={24}>
                      <div className="reportTitle">
                        {categoryData.filter(f => f._id === i)[0] ? categoryData.filter(f => f._id === i)[0].title : i}
                      </div>
                    </Col>
                    <Col span={24}>
                      <Row gutter={10}>
                        {m.map((_m, _i) =>
                          <ReportFormat key={_i} des={moment().month(_i - 1).format('MMM')} income={_m[0]} expense={_m[1]} col={true} type={'MMM'} />
                        )}
                      </Row>
                    </Col>
                  </Col>)
                : ''}
            </Row>
          </Col>
        </div>
      </div>
    );
  }
}

export default ReportPage;