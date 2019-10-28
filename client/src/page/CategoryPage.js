import React, { Component } from 'react';
import { Icon, Button, Spin, Col, message, Input, Alert } from 'antd';
import moment from 'moment';
import { ApiGet, ApiPost } from 'common/Api';

class CategoryPage extends Component {
  addCategory = () => {
    ApiGet('category-add').then(res => {
      res.status === 200 ? message.success('Category Add Success') : message.error('Category Add Fail')
      this.props.getCategoryList()
    })
  }
  removeCategory = (_id) => {
    ApiPost('category-remove', { _id }).then(res => {
      res.status === 200 ? message.success('Category Remove Success') : message.error('Category Remove Fail')
      this.props.getCategoryList()
    })
  }
  editCategory = (value, _id) => {
    if (value && _id) {
      ApiPost('category-edit', { value, _id }).then(res => {
        res.status === 200 ? message.success('Category Edit Success') : message.error('Category Edit Fail')
        this.props.getCategoryList()
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
    addCategory: this.addCategory,
    removeCategory: this.removeCategory,
    editCategory: this.editCategory,
    selectEditable: this.selectEditable,
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryData.length === this.props.categoryData.length) {
      prevProps.categoryData.map((m, i) =>
        m.title !== this.props.categoryData[i].title ? this.highlight(m._id) : ''
      )
    } else if (prevProps.categoryData.length > 0 && prevProps.categoryData.length < this.props.categoryData.length) {
      this.highlight(this.props.categoryData[this.props.categoryData.length - 1]._id)
    }
  }
  render() {
    const {
      editable,
      addCategory,
      removeCategory,
      editCategory,
      selectEditable,
      effect
    } = this.state
    const {
      categoryData
    } = this.props
    return (
      <div>
        <Col xs={0} sm={0} md={5} lg={5} xl={5} />
        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
          {categoryData.length > 0 &&
            <>
              <Alert
                className="warning"
                showIcon
                message="Click the Category to edit."
                type="warning"
                closable
              />
              <Alert
                className="warning"
                showIcon
                message="Can't remove default category."
                type="warning"
                closable
              />
            </>
          }
          <div className="alignLeft">
            <Button type="primary" onClick={() => { addCategory() }}>Add</Button>
          </div>
          {categoryData.length === 0 ? <Spin /> :
            categoryData.map((list, index) => {
              return (
                <div className={effect === list._id ? 'divFormat categoryList highlight' : 'divFormat categoryList'} key={index}>
                  <h1 className="cursor-hand" onClick={() => list._id > 16 && removeCategory(list._id)}>
                    {list._id <= 16 ?
                      <Icon type="warning" style={{ fontSize: '1.5em', color: 'yellow' }} />
                      :
                      <Icon type="close-square" style={{ fontSize: '1.5em', color: 'red' }} />
                    }
                  </h1>
                  <h1 className="cursor-hand" onClick={() => { selectEditable(index) }}>{editable === index ? <Input placeholder={list.title} ref={(r) => { this.inputRef = r }} autoFocus={true} allowClear onPressEnter={() => { editCategory(this.inputRef.state.value, list._id) }} /> : list.title}</h1>
                  <h2>{moment(list.lastUpdate).format('(MM/DD/YYYY)')}</h2>
                </div>
              )
            })
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