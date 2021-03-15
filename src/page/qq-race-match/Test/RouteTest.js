import React from 'react';
import { observer, inject } from 'mobx-react';

import { BackgroundContainer, BackgroundedDropdown } from 'components';
import style from './RouteTest.less';

@inject('store')
@observer class TestView extends React.Component{

  render() {
    return <section className={style.container}>
      <h1>simple example</h1>
      <BackgroundContainer bgSrc="/static/image/b.png">
        <input style={
          {background: "transparent", border: "none", color: "white"}
        }/>

      </BackgroundContainer>
      <BackgroundContainer bgSrc="static/image/aa.png">
        <select>
          <option>hi</option>
          <option>ye</option>
          <option>wo</option>
          </select>
        </BackgroundContainer>
        <BackgroundedDropdown options={ [1,2,3] } holder='plea in' onChange={(v) => console.log(v)}/>
    </section>
  }
}

export default TestView;
