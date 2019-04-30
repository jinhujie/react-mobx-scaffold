import React from 'react';
import { Button } from 'antd';
import { observer, inject } from 'mobx-react';

import style from './RouteTest.less';

@inject('store')
@observer
class TestView extends React.Component{
  componentDidMount = () => {
    setTimeout(() => {
      this.props.store.test.reName();
    }, 1000)
  }
  render() {
    return <span className={style['index-test']}>
      Route-test
      <Button>
        { this.props.store.test.name }
      </Button>
      <a className='a'>style test</a>
    </span>
  }
}

export default TestView;