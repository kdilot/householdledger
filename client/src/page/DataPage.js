import React, { Component } from 'react';
import { Card, Col, Icon, Button, Form, Empty, message, Statistic } from 'antd';
import moment from 'moment';
import { CurrencyFormat, DrawerFormat } from 'common';
import { ApiPost } from 'common/Api';
const monthFormat = 'MM/DD/YYYY';

class DataPage extends Component {
  getData = () => {
    ApiPost('data-list', { today: this.props.today }).then(res => {
      const income = res.data.filter(f => f.type === true)
      const expense = res.data.filter(f => f.type === false)
      this.setState({
        data: res.data,
        income: income.length > 1 ? income.reduce((a, b) => a + b.price, 0) : income.length === 1 ? income[0].price : 0,
        expense: expense.length > 1 ? expense.reduce((a, b) => a + b.price, 0) : expense.length === 1 ? expense[0].price : 0
      })
    })
  }
  removeData = (_id) => {
    ApiPost('data-remove', { _id }).then(res => {
      res.status === 200 ? message.success('Data Remove Success') : message.error('Data Remove Fail')
      this.getData()
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        ApiPost('data-add', { values }).then(res => {
          res.status === 200 ? message.success(`Data ${values.id ? `Edit` : `Add`} Success`) : message.error(`Data ${values.id ? `Edit` : `Add`} Fail`)
          this.showDrawer()
          this.getData()
        })
        this.props.form.resetFields()
      }
    })
  }
  showDrawer = (selected = '') => {
    this.setState({
      visible: !this.state.visible,
      selectedData: selected._id ? selected : null
    })
  }
  state = {
    data: [],
    income: [],
    expense: [],
    visible: false,
    selectedData: null,
    getData: this.getData,
    removeData: this.removeData,
    showDrawer: this.showDrawer,
    handleSubmit: this.handleSubmit,
  }
  componentDidMount() {
    this.getData()
  }
  componentDidUpdate(prevProps, prevState) {
    if (moment(prevProps.today).month() !== moment(this.props.today).month()) {
      this.getData()
    }
  }
  render() {
    const {
      data,
      removeData,
      income,
      expense,
      showDrawer,
    } = this.state
    const {
      categoryData,
    } = this.props
    return (
      <div className="drawer">
        <div className="alignLeft">
          <Button type="primary" onClick={() => { showDrawer() }}>Add</Button>
        </div>
        <div className="totalForm alignLeft bold">
          <Statistic title="Income" value={income} precision={2} valueStyle={{ color: 'green' }} prefix="$" />
          <Statistic title="Expense" value={expense} precision={2} valueStyle={{ color: 'red' }} prefix="$" />
          <Statistic title="Change" value={expense > 0 || income > 0 ? ((income - expense) / expense) * 100 : 0} precision={2} valueStyle={{ color: 'gold' }} suffix="%" />
        </div>
        <DrawerFormat
          state={this.state}
          props={this.props}
        />
        <Card className="dataList">
          {data.length > 0 ?
            data.map((m, i) => {
              return (
                <Card.Grid className="card" key={i}>
                  <Col span={12}><h4 className="alignLeft">
                    <Icon type="close-circle" style={{ fontSize: '2em', marginRight: '0.2em' }} onClick={() => { removeData(m._id) }} />
                    <Icon type="info-circle" style={{ fontSize: '2em' }} onClick={() => { showDrawer(m) }} />
                  </h4>
                  </Col>
                  <Col span={12}><h2>{moment(m.lastUpdate).format(monthFormat)}</h2></Col>
                  <Col span={24}><h1 className={m.type ? 'plus' : 'minus'}>{m.type ? '+' : '-'}<CurrencyFormat price={m.price} digit={2} /></h1></Col>
                  <Col span={24}><h3>{categoryData.length > 0 && categoryData.filter(f => f._id === m.category)[0] ? categoryData.filter(f => f._id === m.category)[0].title : 'None'}</h3></Col>
                  <Col span={24}><h2 className="title alignLeft">{m.title}</h2></Col>
                </Card.Grid>
              )
            })
            :
            <Empty />
          }
        </Card>
      </div>
    );
  }
}

export default Form.create()(DataPage);