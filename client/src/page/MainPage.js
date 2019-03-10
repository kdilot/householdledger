import React, { Component } from 'react';
import { Button, Row, Col, Icon } from 'antd';
import Context from 'context';
import '../main.scss';

class MainPage extends Component {
  render() {
    return (
      <Context.Consumer>
        {c => {
          return (
            <div className="Head">
              <header className="Head-header">
                <h1>
                  <Row>
                    <Col xs={0} sm={0} md={7} lg={7} xl={7} className="alignRight">
                      <Icon type="caret-left" onClick={() => { c.changeMonth() }} />
                    </Col>
                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                      {c.today.format('YYYY.MM')}
                    </Col>
                    <Col xs={12} sm={12} md={0} lg={0} xl={0} className="alignRight">
                      <Icon type="caret-left" onClick={() => { c.changeMonth() }} />
                    </Col>
                    <Col xs={12} sm={12} md={7} lg={7} xl={7} className="alignLeft">
                      <Icon type="caret-right" onClick={() => { c.changeMonth(1) }} />
                    </Col>
                  </Row>
                </h1>
                <h2>
                  <Button type="primary" size='large' onClick={() => { c.changeFlag() }}>Enter</Button>
                </h2>
              </header>
            </div>
          )
        }}
      </Context.Consumer>
    );
  }
}

export default MainPage;
