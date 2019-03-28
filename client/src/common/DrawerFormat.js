import React from 'react';
import { Drawer, Form, Row, Col, InputNumber, Select, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
const { Option } = Select;
const monthFormat = 'MM/DD/YYYY';

const DrawerFormat = ({ state, props }) => {
  const {
    visible,
    showDrawer,
    handleSubmit,
    selectedData,
  } = state
  const {
    categoryData,
    today,
    changeDate,
  } = props
  const {
    getFieldDecorator
  } = props.form
  return (
    <Drawer
      width={400}
      title={selectedData ? 'EDIT' : 'ADD'}
      onClose={() => { showDrawer() }}
      visible={visible}
    >
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Description">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please enter the description' }],
                initialValue: selectedData ? selectedData.title : null
              })(<Input maxLength={30} placeholder="Please enter the description" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Price">
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please enter the price' }],
                initialValue: selectedData ? selectedData.price : null
              })(<InputNumber formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} min={0} placeholder="Please enter the price" />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Type">
              {getFieldDecorator('type', {
                rules: [{ required: true, message: 'Please select the type' }],
                initialValue: selectedData ? (selectedData.type ? 1 : 0) : 0
              })(
                <Select placeholder="Please select the type">
                  <Option value={0}>Expense</Option>
                  <Option value={1}>Income</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Category">
              {getFieldDecorator('category', {
                rules: [{ required: true, message: 'Please select the category' }],
                initialValue: selectedData ? selectedData.category : null
          })(
                <Select placeholder="Please select the category">
                {categoryData.length > 0 ? categoryData.map((m, i) => {
                  return (
                    <Option value={m._id} key={i}>{m.title}</Option>
                  )
                }) : ''}
              </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Date">
              {getFieldDecorator('lastUpdate', {
                rules: [{ required: true, message: 'Please choose the date' }],
                initialValue: selectedData ? moment(selectedData.lastUpdate) : moment(today, monthFormat)
              })(
                <DatePicker format={monthFormat} onChange={(date) => { changeDate(date) }} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Button onClick={showDrawer} style={{ marginRight: 8 }}>
          Cancel
                </Button>
        <Button type="primary" htmlType="submit">
          Submit
                </Button>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              {getFieldDecorator('id', {
                rules: [{ required: false }],
                initialValue: `${selectedData ? selectedData._id : ''}`
              })(<Input type="hidden" />)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default DrawerFormat;
