import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import { HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store';
import {StripeProvider} from 'react-stripe-elements';
require('dotenv').config();
const { STRIPE_PUBLIC_KEY } = process.env



class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
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
