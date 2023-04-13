import React from 'react';
import styles from './constructor-unlocked-element.module.css';
import { constructorUnlockedElementPropTypes } from './constructor-unlocked-element.type';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

/** redux */
import { useDispatch } from 'react-redux';
import { deleteSelectedIngredient } from '../../services/actions';

const ConstructorUnlockedElement = React.memo((props) => {
  const dispatch = useDispatch();
  const removeClicked = () =>
    dispatch(deleteSelectedIngredient(props.rowKey));

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