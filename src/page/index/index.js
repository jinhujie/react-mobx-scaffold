import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
// import DevTools, { configureDevtool } from 'mobx-react-devtools'

import TestView from './RouteTest';
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
            <TestView />
            {/* <DevTools noPanel/> */}
          </React.Fragment>
        </Provider>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./RouteTest.js', function() {
    ReactDOM.render(
      <Root />,
      document.getElementById('root')
    );
  })
}