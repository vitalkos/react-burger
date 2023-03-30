import React from 'react';

class BurgerConstructor extends React.Component {
  render() {
    return (<span>Номер заказа: {this.props.orderId}</span>);
  }
}

export default BurgerConstructor;