import React, { useEffect, useReducer } from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItemTypeKeys } from '../../core/types/ingredient-item.type';
import { IngredientRepository } from '../../core/repositories/ingredient.repository';

/** components */
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { OrderContext } from '../../core/context/order.context';

const ORDER_ITEMS_SET_RAND = 'ORDER_ITEMS_SET_RAND';
export const ORDER_ITEMS_ADD = 'ORDER_ITEMS_ADD';
export const ORDER_ITEMS_REMOVE = 'ORDER_ITEMS_REMOVE';
export const ORDER_ID_SET = 'ORDER_ID_SET';
export const ORDER_ID_CLEAR = 'ORDER_ID_CLEAR';

const App = () => {
  const [order, dispatchOrder] = useReducer((state, action) => {
    const totalCost = (ingredients) => {
      const cost = ingredients.map(t => t.price).reduce((p, c) => p + c, 0);
      const singleBunPrice = ingredients.find(t => t.type === ingredientItemTypeKeys.bun)?.price;
      return singleBunPrice ? (cost + singleBunPrice) : cost;
    }
    switch (action.type) {
      case ORDER_ITEMS_SET_RAND:
        if (!action.items || action.items.length === 0 || !action.count)
          return { ...state };

        const result = [];
        const bun = action.items.find(t => t.type === ingredientItemTypeKeys.bun);
        bun && result.push({ ...bun, rowKey: 1 });

        const otherItems = action.items.filter(t => t.type !== ingredientItemTypeKeys.bun);
        [...new Array(action.count)].forEach((el, index) =>
          result.push({ ...otherItems[Math.floor(Math.random() * otherItems.length)], rowKey: index + 2 }));

        return { ...state, items: result, totalCost: totalCost(result) };


      case ORDER_ITEMS_ADD:
        if (!action.items || action.items.length === 0 || !action.id)
          return { ...state };

        const addedItem = action.items.find(t => t.id === action.id);
        if (!addedItem)
          return { ...state };

        const currentIngredients = [...state.items];
        if (addedItem.type === ingredientItemTypeKeys.bun &&
          state.items.some(t => t.type === ingredientItemTypeKeys.bun)) {
          const existedBun = state.items.find(t => t.type === ingredientItemTypeKeys.bun);
          if (existedBun) {
            if (existedBun?.id === addedItem.id)
              return { ...state };
            currentIngredients.filter(t => t.rowKey !== existedBun.rowKey);
          }
        }

        const key = Math.max(...currentIngredients.map(t => t.rowKey));
        const newItem = { ...addedItem, rowKey: key >= 0 ? (key + 1) : 0 };
        currentIngredients.push(newItem);
        return { ...state, items: currentIngredients, totalCost: totalCost(currentIngredients) };


      case ORDER_ITEMS_REMOVE:
        if (!action.rowKey) return { ...state };
        const items = [...state.items].filter(t => t.rowKey !== action.rowKey)
        return { ...state, items: items, totalCost: totalCost(items) };

      case ORDER_ID_SET:
        return { ...state, id: action.id };

      case ORDER_ID_CLEAR:
        return { ...state, id: null };

      default:
        console.error(`Некорректно указан тип значения: ${action.type}`);
    }
  }, { items: [], totalCost: null, id: null });

  useEffect(() => {
    IngredientRepository.getAll()
      .then(items => items?.length > 0 &&
        dispatchOrder({ type: ORDER_ITEMS_SET_RAND, items, count: 16 })
      )
  }, []);

  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <AppHeader />
      </header>
      <OrderContext.Provider value={[order, dispatchOrder]}>
        <main className={`ml-20 mr-20 ${styles.appMain}`}>
          <section className={`mr-5 ${styles.appSection}`}>
            <BurgerIngredients />
          </section>
          <section className={`ml-5 ${styles.appSection}`}>
            <BurgerConstructor />
          </section>
        </main>
      </OrderContext.Provider>
    </div>
  );
}

export default App;
