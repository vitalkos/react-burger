import React from 'react';
import styles from './burger-constructor.module.css';
import { ingredientItemTypeKeys } from '../../core/types/ingredient-item.type';
import {
  burgerConstructorPropTypes
  , burgerConstructorItemsPropTypes
  , constructorUnlockedElementPropTypes
} from './burger-constructor.type'
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = React.memo((props) => {
  const totalCost = () => {
    const cost = props.ingredients.map(t => t.price).reduce((p, c) => p + c, 0);
    const singleBunPrice = props.ingredients.find(t => t.type === ingredientItemTypeKeys.bun)?.price;
    return singleBunPrice ? (cost + singleBunPrice) : cost;
  }
  const ingredientRemoveClicked = (e) =>
    props.itemRemoved(e);
  return (
    <div className={`mt-25 ${styles.burgerConstructorContainer}`}>
      <section className={styles.itemsContainer}>
        <BurgerConstructorItems items={props.ingredients} onItemRemoved={ingredientRemoveClicked} />
      </section>
      <section className='mb-10 mt-10 mr-4'>
        <section className={styles.orderContainer}>
          <p className="mr-1 noselect text text_type_digits-default">{totalCost()}</p>
          <CurrencyIcon type="primary" />
          <Button extraClass='ml-10' htmlType="button" type="primary" size="small">
            Оформить заказ
          </Button>
        </section>
      </section>
    </div>);
});
BurgerConstructor.propTypes = burgerConstructorPropTypes;

const BurgerConstructorItems = React.memo((props) => {
  const lockedItem = props.items.find(t => t.type === ingredientItemTypeKeys.bun);

  const unlockedItems =
    props.items.filter(t => t.type !== ingredientItemTypeKeys.bun)?.map(t => ({
      id: t.id,
      name: t.name,
      price: t.price,
      image: t.image,
      rowKey: t.rowKey
    }));


  const itemRemoved = (e) => {
    props.onItemRemoved(e);
  }
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
          (<ConstructorUnlockedElement key={item.rowKey} {...item} onRemoveClick={itemRemoved} />))}
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
  const removeClicked = () =>
    props.onRemoveClick({ key: props.id, rowKey: props.rowKey });

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