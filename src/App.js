import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import { HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store';
import {StripeProvider} from 'react-stripe-elements';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <StripeProvider apiKey='pk_test_W8O9ZGQzbkH1r4Je3zdGhTkD'>
            <div className="App">
              {routes}
            </div>
          </StripeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
