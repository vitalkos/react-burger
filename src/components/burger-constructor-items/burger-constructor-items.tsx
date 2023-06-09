import React, { FC } from 'react';
import { useDrop } from "react-dnd";
import styles from './burger-constructor-items.module.css';
import { IngredientType } from '../../core/models/ingredient-type.model';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorUnlockedElement from '../constructor-unlocked-element/constructor-unlocked-element';
import { DndArea } from '../../core/models/dnd-area.model';

/** redux */
import { useDispatch, useSelector } from '../../services/hooks';
import { addSelectedIngredient } from '../../services/actions';

const BurgerConstructorItems: FC = React.memo(() => {
  const dispatch = useDispatch();

  const { items, selectedItems } = useSelector(store => ({
    items: store.ingredients.items
    , selectedItems: store.selectedIngredients.items
  }));
  const [{ isHover }, dropTarget] = useDrop({
    accept: DndArea.ingredient,
    drop(item) {
      onDropHandler(item as { id: string });
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const onDropHandler = async (e: { id: string }) => {
    if (!e.id)
      return;
    try {
      const item = items.find(t => t.id === e.id);
      item && dispatch(addSelectedIngredient(item));
    }
    catch { }
  }

  const lockedItem = React.useMemo(() =>
    selectedItems.find(t => t.type === IngredientType.bun), [selectedItems])

  const unlockedItems = React.useMemo(() =>
    selectedItems.filter(t => t.type !== IngredientType.bun)?.map(t => ({
      id: t.id,
      name: t.name,
      price: t.price,
      image: t.image,
      rowKey: t.rowKey
    })), [selectedItems]);

  const hoverStyle = {
    background: '#00FF0009',
    outlineOffset: '-2px',
    outline: '1px solid green'
  };
  return (<div className={styles.burgerConstructorItemsContainer} data-testid="constructor_drop_container"
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
      <section className={`custom-scroll ${styles.unlockedItemsContainer}`}  data-testid="constructor_existed_items_container">
        {unlockedItems.map(item => !!item.rowKey ?
          (<ConstructorUnlockedElement key={item.rowKey} {...item} rowKey={item.rowKey}/>) : null)}
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
});

export default BurgerConstructorItems;