import React, { useContext } from 'react';
import styles from './constructor-unlocked-element.module.css';
import { constructorUnlockedElementPropTypes } from './constructor-unlocked-element.type';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../core/context/order.context';
import { ORDER_ITEMS_REMOVE } from '../app/app';

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

export default ConstructorUnlockedElement;