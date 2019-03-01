import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import './CheckoutForm.scss'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch(`/charge/${this.props.price}`, {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id,
    });
  
    if (response.ok) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <div className='element-container'>
          <CardElement className='card-element-wrapper'/>
          <button className='payment-button' onClick={this.submit}>Pay</button>
        </div>
        {/* <p className='instruction'>Once a package is selected, you may complete your purchase.</p> */}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);