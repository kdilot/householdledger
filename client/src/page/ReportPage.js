import React, { Component } from 'react';
import { ReportCategoryFormat, ReportListFormat, Loading } from 'common';
import { ApiPost } from 'common/Api';
import { Row, Col } from 'antd';
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
        const uniqueMonth = data.filter((value, index) => data.indexOf(value) === index)
        const uniqueCategory = category.filter((value, index) => category.indexOf(value) === index)
        const arrMonth = []
        const arrCateogry = []

        uniqueMonth.map(m => // Income / Expense Report
          arrMonth[m] = [res.data.filter(f => f.type === true && moment(f.lastUpdate).format('M') === m).map(n => n.price).reduce((a, b) => a + b, 0).toFixed(2),
          res.data.filter(f => f.type === false && moment(f.lastUpdate).format('M') === m).map(n => n.price).reduce((a, b) => (a + b), 0).toFixed(2)]
        )
        arrMonth[today.format('YYYY')] = [res.data.filter(f => f.type === true).map(n => n.price).reduce((a, b) => a + b, 0).toFixed(2),
        res.data.filter(f => f.type === false).map(n => n.price).reduce((a, b) => (a + b), 0).toFixed(2)]  // yearly

        const total = []
        uniqueMonth.map(m => {  // Category Report
          const arr = []
          return (
            uniqueCategory.map(c => {
              arr[c] = [res.data.filter(f => f.type === true && f.category === c && moment(f.lastUpdate).format('M') === m).map(n => n.price).reduce((a, b) => a + b, 0).toFixed(2),
              res.data.filter(f => f.type === false && f.category === c && moment(f.lastUpdate).format('M') === m).map(n => n.price).reduce((a, b) => (a + b), 0).toFixed(2)]
              total[c] = [res.data.filter(f => f.type === true && f.category === c).map(n => n.price).reduce((a, b) => a + b, 0).toFixed(2),
              res.data.filter(f => f.type === false && f.category === c).map(n => n.price).reduce((a, b) => (a + b), 0).toFixed(2)]
              return (
                arrCateogry[m] = arr
              )
            })
          )
        })
        arrCateogry[13] = total

        this.setState({
          inex: arrMonth,
          cate: arrCateogry,
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

          {daily.length > 0 ?
            <>
              <Col xs={24} sm={16} md={14} lg={18} xl={9}>
                <Row gutter={5}>
                  {daily.map((m, i) => <ReportListFormat key={i} des={i} income={m[0]} expense={m[1]} type={'D'} />)}
                </Row>
              </Col>
              <Col xs={0} sm={8} md={10} lg={6} xl={14} />
            </>
            : <Loading loading={loading} />
          }

        </div>
        <div className="box">
          <Col span={24}>
            <h3 className="alignLeft">{today.format('YYYY')} Income / Expense</h3>
          </Col>
          {inex.length > 0 ?
            <>
              <Col xs={24} sm={16} md={14} lg={18} xl={9}>
                <Row gutter={5}>
                  {inex.map((m, i) => <ReportListFormat key={i} des={i > 12 ? i : moment().month(i - 1).format('MMM')} income={m[0]} expense={m[1]} type={'MMM'} />)}
                </Row>
              </Col>
              <Col xs={0} sm={8} md={10} lg={6} xl={14} />
            </>
            : <Loading loading={loading} />
          }
        </div>
        <div className="box">
          <Col span={24}>
            <h3 className="alignLeft">{today.format('YYYY')} Category</h3>
          </Col>
          <Col span={24}>
            <Row gutter={5}>
              {cate.length > 0 ?
                cate.map((m, i) =>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4} key={i}>
                    <Col span={24}>
                      <div className={today.format('M').localeCompare(i) === 0 ? "reportTitle titleSelected" : "reportTitle"}>
                        {i > 12 ? 'Total' : moment().month(i - 1).format('MMM')}
                      </div>
                    </Col>
                    <Col span={24}>
                      <Row gutter={5}>
                        {m.map((_m, _i) =>
                          <ReportCategoryFormat key={_i} size={24} des={categoryData.filter(f => f._id === _i)[0] ? categoryData.filter(f => f._id === _i)[0].title : _i} income={_m[0]} expense={_m[1]} col={true} month={i} />
                        )}
                      </Row>
                    </Col>
                  </Col>)
                : <Loading loading={loading} />
              }
            </Row>
          </Col>
        </div>
      </div >
    );
  }
}

export default ReportPage;