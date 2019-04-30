import React from 'react';
import { Card, Button } from 'antd';
import { observer, inject } from 'mobx-react';

import style from './RouteTest.less';

@inject('store')
@observer class TestView extends React.Component{
  addUser = () => {
    this.props.store.test.addUser('user' + Math.round(Math.random() * 10))
  }
  delLastUser = () => {
    this.props.store.test.delLastUser();
  }

  render() {
    const user = this.props.store.test.user;
    return <section className={style.container}>
      <h1>simple example</h1>
      <Button onClick={this.addUser}>Add User</Button>
      <Button onClick={this.delLastUser}>Del Last User</Button>
      {user.map(name => {
        return (
          <Card title={name} style={{width: 200}}></Card>
        )
      })}
    </section>
  }
}

export default TestView;