import React from 'react';
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
      <a>pp</a>
      { this.props.store.test.name }
    </span>
  }
}

export default TestView;