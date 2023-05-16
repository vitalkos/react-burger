import React, { FC } from 'react';
import styles from './burger-order-total.module.css';
import Modal from '../modal/modal';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import { useNavigate } from 'react-router';

/** redux */
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetails, clearOrderDetails } from '../../services/actions';
import { TSelectedIngredient } from '../../core/models/selected-ingredient.model';

const BurgerOrderTotal: FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { selectedItems, totalCost, orderId, isOrderCreating, isAuthorized } = useSelector((store: any) => ({
    selectedItems: store.selectedIngredients.items as TSelectedIngredient[]
    , totalCost: store.selectedIngredients.totalCost as number
    , orderId: store.orderDetails.id as number
    , isOrderCreating: store.orderDetails.orderRequest as boolean
    , isAuthorized: !!store.auth.user as boolean
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