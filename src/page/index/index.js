import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
// import DevTools, { configureDevtool } from 'mobx-react-devtools'

import RouteTest from './Test/RouteTest';
import { StoreTest } from 'store';

// configureDevtool({
//   logEnabled: true,
//   updatesEnabled: false,
//   logFilter: change => console.log(change) || true,
// });

class Root extends React.Component {
  render() {
    return (
        <Provider store={{test: StoreTest}}>
          <React.Fragment>
            <RouteTest />
            {/* <DevTools noPanel/> */}
          </React.Fragment>
        </Provider>
    );
  }
}

function renderRoot() {
  ReactDOM.render(
    <Root />,
    document.getElementById('root')
  );
}

renderRoot();

if (module.hot) {
  module.hot.accept(function() {
    renderRoot();
  })
}
