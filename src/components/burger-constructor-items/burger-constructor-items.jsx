import React from 'react';
import styles from './burger-constructor-items.module.css';
import { ingredientItemTypeKeys } from '../../core/types/ingredient-item.type';
import { burgerConstructorItemsPropTypes } from './burger-constructor-items.type';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorUnlockedElement from '../constructor-unlocked-element/constructor-unlocked-element';

/** redux */
import { useSelector } from 'react-redux';

const BurgerConstructorItems = React.memo(() => {
  const items = useSelector(store => store.selectedIngredients.items);

  const lockedItem = React.useMemo(() =>
    items.find(t => t.type === ingredientItemTypeKeys.bun), [items])

  const unlockedItems = React.useMemo(() =>
    items.filter(t => t.type !== ingredientItemTypeKeys.bun)?.map(t => ({
      id: t.id,
      name: t.name,
      price: t.price,
      image: t.image,
      rowKey: t.rowKey
    })), [items]);

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