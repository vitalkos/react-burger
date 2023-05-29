import React, { FC } from 'react';
import styles from './burger-order-total.module.css';
import Modal from '../modal/modal';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import { useNavigate } from 'react-router';

/** redux */
import { useDispatch, useSelector } from '../../services/hooks';
import { setOrderDetails, clearOrderDetails } from '../../services/actions';

const BurgerOrderTotal: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedItems, totalCost, orderId, isOrderCreating, isAuthorized } = useSelector(store => ({
    selectedItems: store.selectedIngredients.items
    , totalCost: store.selectedIngredients.totalCost
    , orderId: store.orderDetails.id
    , isOrderCreating: store.orderDetails.orderRequest
    , isAuthorized: !!store.auth.user
  }));

  const createOrder: () => void = () => {
    if (!isAuthorized) {
      navigate('/login');
      return;
    } 
    const ingredientIdList = selectedItems.map(t => t.id);
    ingredientIdList && ingredientIdList.length > 0 &&
      dispatch(setOrderDetails(ingredientIdList));
  }

  const closeOrderModal: () => void = () =>
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

export default BurgerOrderTotal;