import React, { useState, useContext } from 'react';
import styles from './burger-constructor.module.css';
import { ingredientItemTypeKeys } from '../../core/types/ingredient-item.type';
import {
  burgerConstructorPropTypes
  , burgerConstructorItemsPropTypes
  , constructorUnlockedElementPropTypes
  , burgerOrderTotalPropTypes
} from './burger-constructor.type';
import Modal from '../modal/modal';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import { OrderContext } from '../../core/context/order.context';
import { ORDER_ITEMS_REMOVE, ORDER_ID_SET } from '../app/app';
import { OrderRepository } from '../../core/repositories/order.repository';

const BurgerConstructor = React.memo(() => {
  return (
    <div className={`mt-25 ${styles.burgerConstructorContainer}`}>
      <section className={styles.itemsContainer}>
        <BurgerConstructorItems />
      </section>
      <section className='mb-10 mt-10 mr-4'>
        <BurgerOrderTotal />
      </section>
    </div>);
});
BurgerConstructor.propTypes = burgerConstructorPropTypes;

const BurgerOrderTotal = () => {
  const [order, dispatchOrder] = useContext(OrderContext);
  const [isOrderCreating, setIsOrderCreating] = useState(false);
  const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);

  const createOrder = () => {
    const ingredientIdList = order.items.map(t => t.id);
    if (!ingredientIdList || ingredientIdList.length === 0)
      return;
    setIsOrderCreating(true);
    OrderRepository.create(ingredientIdList)
      .then(data => {
        dispatchOrder({ type: ORDER_ID_SET, id: data.order.number });
        setIsOrderCreating(false);
        setOrderDetailsVisible(true);
      })
      .catch(err => {
        setIsOrderCreating(false);
      });

  }
  const closeOrderModal = () =>
    setOrderDetailsVisible(false);

  return (
    <section className={styles.orderContainer}>
      <p className="mr-1 noselect text text_type_digits-default">{order.totalCost}</p>
      <CurrencyIcon type="primary" />
      <Button extraClass='ml-10' htmlType="button" type="primary" size="small" onClick={createOrder} disabled={isOrderCreating}>
        Оформить заказ
      </Button>
      {orderDetailsVisible && order.id && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails orderId={order.id} />
        </Modal>)}
    </section>
  );
}
BurgerOrderTotal.propTypes = burgerOrderTotalPropTypes;


const BurgerConstructorItems = React.memo(() => {
  const [order] = useContext(OrderContext);
  const lockedItem = order.items.find(t => t.type === ingredientItemTypeKeys.bun);

  const unlockedItems =
    order.items.filter(t => t.type !== ingredientItemTypeKeys.bun)?.map(t => ({
      id: t.id,
      name: t.name,
      price: t.price,
      image: t.image,
      rowKey: t.rowKey
    }));
  return (<div className={styles.burgerConstructorItemsContainer}>
    {!!lockedItem &&
      <section className='ml-8 mr-4'>
        <ConstructorElement
          extraClass={`noselect ${styles.constructorElement}`}
          type="top"
          isLocked={true}
          text={`${lockedItem.name} (верх)`}
          price={lockedItem.price}
          thumbnail={lockedItem.image}
        />
      </section>}

    {!!unlockedItems && (
      <section className={`custom-scroll ${styles.unlockedItemsContainer}`}>
        {unlockedItems.map(item =>
          (<ConstructorUnlockedElement key={item.rowKey} {...item} />))}
      </section>
    )}

    {!!lockedItem &&
      <section className='ml-8 mr-4'>
        <ConstructorElement
          extraClass={`noselect ${styles.constructorElement}`}
          type="bottom"
          isLocked={true}
          text={`${lockedItem.name} (низ)`}
          price={lockedItem.price}
          thumbnail={lockedItem.image}
        />
      </section>}
  </div>);
})
BurgerConstructorItems.propTypes = burgerConstructorItemsPropTypes;

const ConstructorUnlockedElement = React.memo((props) => {
  const [, dispatchOrder] = useContext(OrderContext);
  const removeClicked = () =>
    dispatchOrder({ type: ORDER_ITEMS_REMOVE, rowKey: props.rowKey });

  return (
    <section className={`mr-4 ${styles.unlockedElement}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        extraClass={`ml-2 noselect ${styles.constructorElement}`}
        text={props.name}
        price={props.price}
        handleClose={removeClicked}
        thumbnail={props.image}
      />
    </section>);
});
ConstructorUnlockedElement.propTypes = constructorUnlockedElementPropTypes;

export default BurgerConstructor;