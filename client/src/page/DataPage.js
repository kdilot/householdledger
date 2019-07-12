import React, { Component } from 'react';
import { Row, Col, Icon, Button, Form, message, Statistic } from 'antd';
import moment from 'moment';
import { DrawerFormat, DataGridFormat, DataListFormat } from 'common';
import { ApiPost } from 'common/Api';
const ButtonGroup = Button.Group;

class DataPage extends Component {
  getData = () => {
    this.setState({ data: [], income: 0, expense: 0, loading: true })
    ApiPost('data-list', { today: this.props.today }).then(res => {
      if (res.data.length > 0) {
        const { asc, sort } = this.state
        const income = res.data.filter(f => f.type === true)
        const expense = res.data.filter(f => f.type === false)
        const data = res.data.sort((a, b) => {
          if (sort === 'date') {
            return asc ? moment(a.lastUpdate) - moment(b.lastUpdate) : moment(b.lastUpdate) - moment(a.lastUpdate)
          } else if (sort === 'title') {
            return asc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
          } else if (sort === 'price') {
            return asc ? a.price - b.price : b.price - a.price
          }
          return true
        })
        this.setState({
          data: data,
          income: income.length > 1 ? income.reduce((a, b) => a + b.price, 0) : income.length === 1 ? income[0].price : 0,
          expense: expense.length > 1 ? expense.reduce((a, b) => a + b.price, 0) : expense.length === 1 ? expense[0].price : 0
        })
      } else {
        this.setState({ loading: false })
      }
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
  changeSort = (isASC = true, keyword) => {
    if (isASC) {
      const { asc } = this.state
      this.setState({ asc: !asc })
    } else {
      const { asc, sort } = this.state
      if (sort === keyword)
        this.setState({ asc: !asc })
      else
        this.setState({ sort: keyword })
    }
    this.getData()
  }
  changeFlag = () => {
    const { flag } = this.state
    this.setState({ flag: !flag })
  }

  state = {
    data: [],
    income: [],
    expense: [],
    visible: false,
    loading: true,
    selectedData: null,
    sort: 'date',
    asc: true,
    flag: true,
    getData: this.getData,
    removeData: this.removeData,
    showDrawer: this.showDrawer,
    handleSubmit: this.handleSubmit,
    changeSort: this.changeSort,
    changeFlag: this.changeFlag,
  }
  componentDidMount() {
    this.getData()
  }
  componentDidUpdate(prevProps, prevState) {
    if (moment(prevProps.today).month() !== moment(this.props.today).month() || moment(prevProps.today).year() !== moment(this.props.today).year()) {
      this.getData()
    }
  }
  render() {
    const {
      income,
      expense,
      sort,
      asc,
      flag,
      showDrawer,
      changeSort,
      changeFlag
    } = this.state
    const {
      categoryData,
    } = this.props
    return (
      <div className="drawer">
        <DrawerFormat
          state={this.state}
          props={this.props}
        />
        <Row className="alignLeft">
          <Button type="primary" onClick={() => { showDrawer() }}>Add</Button>
        </Row>
        <Row className="totalForm alignLeft bold">
          <Statistic title="Income" value={income} precision={2} valueStyle={{ color: 'green' }} prefix="$" />
          <Statistic title="Expense" value={expense} precision={2} valueStyle={{ color: 'red' }} prefix="$" />
          <Statistic title="Change" value={expense > 0 && income > 0 ? ((income - expense) / expense) * 100 : 0} precision={2} valueStyle={{ color: 'gold' }} suffix="%" />
        </Row>
        <Row className="alignLeft dataSort">
          <Col span={18}>
            <ButtonGroup>
              <Button type={sort === 'date' ? 'default' : 'primary'} onClick={() => { changeSort(false, 'date') }}>Date</Button>
              <Button type={sort === 'title' ? 'default' : 'primary'} onClick={() => { changeSort(false, 'title') }}>description</Button>
              <Button type={sort === 'price' ? 'default' : 'primary'} onClick={() => { changeSort(false, 'price') }}>Price</Button>
              <Button type="default" onClick={() => { changeSort() }}><Icon type={`arrow-${asc ? 'up' : 'down'}`} /></Button>
            </ButtonGroup>
          </Col>
          <Col span={6} className="alignRight">
            <Button type={flag ? "primary" : 'defualt'} onClick={() => { changeFlag() }} style={{ marginRight: '5px' }}><Icon type="database" style={{ fontSize: '20px' }} /></Button>
            <Button type={!flag ? "primary" : 'defualt'} onClick={() => { changeFlag() }}><Icon type="appstore" style={{ fontSize: '20px' }} /></Button>
          </Col>
        </Row>
        {flag ?
          <DataGridFormat state={this.state} categoryData={categoryData} />
          :
          <DataListFormat state={this.state} categoryData={categoryData} />
        }
      </div>
    );
  }
}

export default Form.create()(DataPage);