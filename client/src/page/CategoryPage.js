import React, { Component } from 'react';
import { Icon, Button, Empty, Col, message, Input, Alert } from 'antd';
import moment from 'moment';
import { ApiGet, ApiPost } from 'common/Api';

class CategoryPage extends Component {
  getCategoryList = () => {
    ApiGet('category-list').then(res => {
      this.setState({ apiData: res.data })
    })
  }
  addCategory = () => {
    ApiGet('category-add').then(res => {
      res.status === 200 ? message.success('Category Add Success') : message.error('Category Add Fail')
      this.getCategoryList()
    })
  }
  removeCategory = (_id) => {
    ApiPost('category-remove', { _id }).then(res => {
      res.status === 200 ? message.success('Category Remove Success') : message.error('Category Remove Fail')
      this.getCategoryList()
    })
  }
  editCategory = (value, _id) => {
    if (value && _id) {
      ApiPost('category-edit', { value, _id }).then(res => {
        res.status === 200 ? message.success('Category Edit Success') : message.error('Category Edit Fail')
        this.getCategoryList()
        this.setState({ editable: '' })
      })
    }
  }
  selectEditable = (_id) => {
    const { editable } = this.state
    this.setState({ editable: editable === _id ? '' : _id })
  }
  highlight = (effect) => {
    this.setState({
      effect
    })
    setTimeout(() => {
      this.highlight(false)
    }, 1000)
  }
  state = {
    editable: '',
    effect: '',
    apiData: [],
    getCategoryList: this.getCategoryList,
    addCategory: this.addCategory,
    removeCategory: this.removeCategory,
    editCategory: this.editCategory,
    selectEditable: this.selectEditable,
  }
  componentDidMount() {
    this.getCategoryList()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.apiData.length === this.state.apiData.length) {
      prevState.apiData.map((m, i) =>
        m.title !== this.state.apiData[i].title ? this.highlight(m._id) : ''
      )
    } else if (prevState.apiData.length > 0 && prevState.apiData.length < this.state.apiData.length) {
      this.highlight(this.state.apiData[this.state.apiData.length - 1]._id)
    }
  }

  render() {
    const {
      apiData,
      editable,
      addCategory,
      removeCategory,
      editCategory,
      selectEditable,
      effect
    } = this.state
    return (
      <div>
        <Col xs={0} sm={0} md={5} lg={5} xl={5} />
        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
          <div className="alignLeft">
            <Button type="primary" onClick={() => { addCategory() }}>Add</Button>
          </div>
          {apiData.length === 0 ? <Empty /> :
            apiData.map((list, index) => {
              return (
                <div className={effect === list._id ? 'divFormat categoryList highlight' : 'divFormat categoryList'} key={index}>
                  <h1 className="cursor-hand" onClick={() => removeCategory(list._id)}><Icon type="close-square" style={{ fontSize: '1.5em', color: 'red' }} /></h1>
                  <h1 className="cursor-hand" onClick={() => { selectEditable(index) }}>{editable === index ? <Input placeholder={list.title} ref={(r) => { this.inputRef = r }} autoFocus={true} allowClear onPressEnter={() => { editCategory(this.inputRef.state.value, list._id) }} /> : list.title}</h1>
                  <h2>{moment(list.lastUpdate).format('(MM/DD/YYYY HH:mm:ss)')}</h2>
                </div>
              )
            })
          }
          {apiData.length > 0 &&
            <Alert
              className="warning"
              showIcon
              message="Click the Category to edit."
              type="warning"
              closable
            />
          }
        </Col>
        <Col xs={0} sm={0} md={5} lg={5} xl={5} />
        <Col span={24}>
        </Col>
      </div>
    );
  }
}

export default CategoryPage;