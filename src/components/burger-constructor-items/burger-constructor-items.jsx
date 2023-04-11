import React, { useContext } from 'react';
import styles from './burger-constructor-items.module.css';
import { ingredientItemTypeKeys } from '../../core/types/ingredient-item.type';
import { burgerConstructorItemsPropTypes } from './burger-constructor-items.type';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../core/context/order.context';
import ConstructorUnlockedElement from '../constructor-unlocked-element/constructor-unlocked-element';

const BurgerConstructorItems = React.memo(() => {
  const [order] = useContext(OrderContext);
  const lockedItem = React.useMemo(() =>
    order.items.find(t => t.type === ingredientItemTypeKeys.bun), [order])

  const unlockedItems = React.useMemo(() =>
    order.items.filter(t => t.type !== ingredientItemTypeKeys.bun)?.map(t => ({
      id: t.id,
      name: t.name,
      price: t.price,
      image: t.image,
      rowKey: t.rowKey
    })), [order]);

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

export default BurgerConstructorItems;