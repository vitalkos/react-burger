import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItemTypeKeys } from '../../core/types/ingredient-item.type';
import { IngredientRepository } from '../../core/repositories/ingredient.repository';

/** components */
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    IngredientRepository.getAll()
      .then(items => {
        if (!items || items.length === 0)
          return;
        const fillRandomSelectedItems = () => {
          const result = [];
          const bun = items.find(t => t.type === ingredientItemTypeKeys.bun);
          bun && result.push({ ...bun, rowKey: 1 });
          const otherItems = items.filter(t => t.type !== ingredientItemTypeKeys.bun);
          result.push({ ...otherItems[Math.floor(Math.random() * otherItems.length)], rowKey: 2 });
          result.push({ ...otherItems[Math.floor(Math.random() * otherItems.length)], rowKey: 3 });
          result.push({ ...otherItems[Math.floor(Math.random() * otherItems.length)], rowKey: 4 });
          result.push({ ...otherItems[Math.floor(Math.random() * otherItems.length)], rowKey: 5 });
          result.push({ ...otherItems[Math.floor(Math.random() * otherItems.length)], rowKey: 6 });
          return result;
        }
        setIngredients(fillRandomSelectedItems());
        setItems(items);
      })
  }, []);

  const ingredientAdded = (e) => {
    const addedItem = items.find(t => t.id === e.id);
    if (!addedItem) return;
    if (addedItem.type === ingredientItemTypeKeys.bun &&
      ingredients.some(t => t.type === ingredientItemTypeKeys.bun)) {
      const existedBun = ingredients.find(t => t.type === ingredientItemTypeKeys.bun);
      if (existedBun) {
        if (existedBun?.id === addedItem.id)
          return;
        ingredientRemoved({ rowKey: existedBun.rowKey });
      }
    }
    const key = Math.max(...ingredients.map(t => t.rowKey));
    const newItem = { ...addedItem, rowKey: key >= 0 ? (key + 1) : 0 };
    setIngredients(prevState => ([...prevState, newItem]));
  };

  const ingredientRemoved = (e) =>
    setIngredients([...ingredients.filter(t => t.rowKey !== e.rowKey)]);

  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <AppHeader />
      </header>
      <main className={`ml-20 mr-20 ${styles.appMain}`}>
        <section className={`mr-5 ${styles.appSection}`}>
          <BurgerIngredients itemAdded={ingredientAdded} ingredients={ingredients} />
        </section>
        <section className={`ml-5 ${styles.appSection}`}>
          <BurgerConstructor itemRemoved={ingredientRemoved} ingredients={ingredients} />
        </section>
      </main>
    </div>
  );
}

export default App;
