import React from 'react';
import { useDrop } from "react-dnd";
import styles from './burger-constructor-items.module.css';
import { ingredientItemTypeKeys } from '../../core/types/ingredient-item.type';
import { burgerConstructorItemsPropTypes } from './burger-constructor-items.type';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorUnlockedElement from '../constructor-unlocked-element/constructor-unlocked-element';
import { DndArea } from '../../core/types/dnd-area.type';

/** redux */
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedIngredient } from '../../services/actions';
import { IngredientRepository } from '../../core/repositories/ingredient.repository';

const BurgerConstructorItems = React.memo(() => {
  const dispatch = useDispatch();
  const items = useSelector(store => store.selectedIngredients.items);
  const [{ isHover }, dropTarget] = useDrop({
    accept: DndArea.INGREDIENT,
    drop(item) {
      onDropHandler(item);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const onDropHandler = async (e) => {
    if (!e.id)
      return;
    try {
      const item = await IngredientRepository.get(e.id, { useLargeImage: false });
      item && dispatch(addSelectedIngredient(item));
    }
    catch { }
  }

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

  const hoverStyle = {
    background: '#00FF0009',
    outlineOffset: '-2px',
    outline: '1px solid green'
  };
  return (<div className={styles.burgerConstructorItemsContainer}
    ref={dropTarget} style={isHover ? hoverStyle : {}}>
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