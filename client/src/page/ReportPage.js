import React, { Component } from 'react';
import { ReportFormat, ReportListFormat } from 'common';
import { ApiPost } from 'common/Api';
import { Row, Col, Empty, Spin } from 'antd';
import './report.scss';
import moment from 'moment';

class ReportPage extends Component {
  getDaily = () => {
    this.setState({ daily: [], inex: [], cate: [], yearly: [], loading: true })
    ApiPost('data-list', { today: this.props.today }).then(res => { // Daily Report
      if (res.data.length > 0) {
        const data = res.data.map(m => moment(m.lastUpdate).format('D')).sort((a, b) => a - b)
        const uniq = data.filter((value, index) => data.indexOf(value) === index)
        const arr = []
        uniq.map(m =>
          arr[m] = [res.data.filter(f => f.type === true && moment(f.lastUpdate).format('D') === m).map(n => n.price).reduce((a, b) => a + b, 0),
          res.data.filter(f => f.type === false && moment(f.lastUpdate).format('D') === m).map(n => n.price).reduce((a, b) => (a + b), 0).toFixed(2)]
        )
        this.setState({ daily: arr })
      } else {
        this.setState({ loading: false })
      }
    })
  }
  getYearly = () => {
    const { today } = this.props
    ApiPost('data-list', { today: today, year: true }).then(res => {
      if (res.data.length > 0) {
        const data = res.data.map(m => moment(m.lastUpdate).format('M')).sort((a, b) => a - b)
        const category = res.data.map(m => m.category).sort((a, b) => a - b)
        const unique_m = data.filter((value, index) => data.indexOf(value) === index)
        const unique_c = category.filter((value, index) => category.indexOf(value) === index)
        const arr_m = []
        const arr_c = []

        unique_m.map(m => // Income / Expense Report
          arr_m[m] = [res.data.filter(f => f.type === true && moment(f.lastUpdate).format('M') === m).map(n => n.price).reduce((a, b) => a + b, 0),
          res.data.filter(f => f.type === false && moment(f.lastUpdate).format('M') === m).map(n => n.price).reduce((a, b) => (a + b), 0).toFixed(2)]
        )
        arr_m[today.format('YYYY')] = [res.data.filter(f => f.type === true).map(n => n.price).reduce((a, b) => a + b, 0),
        res.data.filter(f => f.type === false).map(n => n.price).reduce((a, b) => (a + b), 0).toFixed(2)]  // yearly

        unique_c.map(c => { // Category Report
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
        this.setState({
          inex: arr_m,
          cate: arr_c,
        })
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
    loading: true
  }
  render() {
    const {
      daily,
      inex,
      cate,
      loading
    } = this.state
    const {
      today,
      categoryData
    } = this.props
    return (
      <div>
        <div className="box">
          <Col span={24}>
            <h3 className="alignLeft">Daily Report / {today.format('MMMM')}</h3>
          </Col>
          <Col xs={24} sm={16} md={14} lg={18} xl={9}>
            <Row gutter={5}>
              {daily.length > 0 ?
                daily.map((m, i) => <ReportListFormat key={i} des={i} income={m[0]} expense={m[1]} type={'D'} />)
                : loading ? <Spin /> : <Empty />
              }
            </Row>
          </Col>
          <Col xs={0} sm={8} md={10} lg={6} xl={14} />
        </div>
        <div className="box">
          <Col span={24}>
            <h3 className="alignLeft">{today.format('YYYY')} Income / Expense</h3>
          </Col>
          <Col xs={24} sm={16} md={14} lg={18} xl={9}>
            <Row gutter={5}>
              {inex.length > 0 ?
                inex.map((m, i) => <ReportListFormat key={i} des={i > 11 ? i : moment().month(i - 1).format('MMM')} income={m[0]} expense={m[1]} type={'MMM'} />)
                : loading ? <Spin /> : <Empty />
              }
            </Row>
          </Col>
          <Col xs={0} sm={8} md={10} lg={6} xl={14} />
        </div>
        <div className="box">
          <Col span={24}>
            <h3 className="alignLeft">{today.format('YYYY')} Category</h3>
          </Col>
          <Col span={24}>
            <Row gutter={5}>
              {console.log(cate)}
              {cate.length > 0 ?
                cate.map((m, i) =>
                  <Col xs={24} sm={12} md={12} lg={6} xl={4} key={i}>
                    <Col span={24}>
                      <div className="reportTitle">
                        {categoryData.filter(f => f._id === i)[0] ? categoryData.filter(f => f._id === i)[0].title : i}
                      </div>
                    </Col>
                    <Col span={24}>
                      <Row gutter={5}>
                        {m.map((_m, _i) =>
                          <ReportFormat key={_i} des={moment().month(_i - 1).format('MMM')} income={_m[0]} expense={_m[1]} col={true} type={'MMM'} />
                        )}
                      </Row>
                    </Col>
                  </Col>)
                : loading ? <Spin /> : <Empty />
              }
            </Row>
          </Col>
        </div>
      </div >
    );
  }
}

export default ReportPage;