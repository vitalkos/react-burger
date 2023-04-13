import React from 'react';
import styles from './burger-order-total.module.css';
import { burgerOrderTotalPropTypes } from './burger-order-total.type';
import Modal from '../modal/modal';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';

/** redux */
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetails, clearOrderDetails } from '../../services/actions';

const BurgerOrderTotal = () => {
  const dispatch = useDispatch();
  const { selectedItems, totalCost, orderId, isOrderCreating } = useSelector(store => ({
    selectedItems: store.selectedIngredients.items
    , totalCost: store.selectedIngredients.totalCost
    , orderId: store.orderDetails.id
    , isOrderCreating: store.orderDetails.orderRequest
    }));
    
  const createOrder = () => {
    const ingredientIdList = selectedItems.map(t => t.id);
    ingredientIdList && ingredientIdList.length > 0 && 
    dispatch(setOrderDetails(ingredientIdList));
  }

  const closeOrderModal = () =>
    dispatch(clearOrderDetails());

  return (
    <section className={styles.orderContainer}>
      <p className="mr-1 noselect text text_type_digits-default">{totalCost}</p>
      <CurrencyIcon type="primary" />
      <Button extraClass='ml-10' htmlType="button" type="primary" size="small" onClick={createOrder} disabled={isOrderCreating}>
        Оформить заказ
      </Button>
      {orderId && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails orderId={orderId} />
        </Modal>)}
    </section>
  );
}
BurgerOrderTotal.propTypes = burgerOrderTotalPropTypes;

export default BurgerOrderTotal;