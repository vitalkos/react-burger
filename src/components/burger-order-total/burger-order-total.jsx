import React, { useState, useContext } from 'react';
import styles from './burger-order-total.module.css';
import { burgerOrderTotalPropTypes } from './burger-order-total.type';
import Modal from '../modal/modal';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import { OrderContext } from '../../core/context/order.context';
import { ORDER_ID_SET, ORDER_ID_CLEAR } from '../app/app';
import { OrderRepository } from '../../core/repositories/order.repository';

const BurgerOrderTotal = () => {
  const [order, dispatchOrder] = useContext(OrderContext);
  const [isOrderCreating, setIsOrderCreating] = useState(false);

  const createOrder = () => {
    const ingredientIdList = order.items.map(t => t.id);
    if (!ingredientIdList || ingredientIdList.length === 0)
      return;
    setIsOrderCreating(true);
    OrderRepository.create(ingredientIdList)
      .then(data => {
        dispatchOrder({ type: ORDER_ID_SET, id: data.order.number });
        setIsOrderCreating(false);
      })
      .catch(err => {
        setIsOrderCreating(false);
      });

  }

  const closeOrderModal = () =>
    dispatchOrder({ type: ORDER_ID_CLEAR });

  return (
    <section className={styles.orderContainer}>
      <p className="mr-1 noselect text text_type_digits-default">{order.totalCost}</p>
      <CurrencyIcon type="primary" />
      <Button extraClass='ml-10' htmlType="button" type="primary" size="small" onClick={createOrder} disabled={isOrderCreating}>
        Оформить заказ
      </Button>
      {order.id && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails orderId={order.id} />
        </Modal>)}
    </section>
  );
}
BurgerOrderTotal.propTypes = burgerOrderTotalPropTypes;

export default BurgerOrderTotal;