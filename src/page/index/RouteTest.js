import React from 'react';
import { Button } from 'antd';
import { observer, inject } from 'mobx-react';

import './RouteTest.less';

@inject('store')
@observer
class TestView extends React.Component{
  componentDidMount = () => {
    setTimeout(() => {
      this.props.store.test.reName();
    }, 1000)
  }
  render() {
    return <span className='index-test'>
      <Button>
        { this.props.store.test.name }
      </Button>
    </span>
  }
}

export default TestView;