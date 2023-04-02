import React, { useState } from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItemTypeKeys } from '../../core/types/ingredient-item.type';
import data from '../../utils/data.json';
import { mapJsonDataList } from '../../core/mappers/data.mapper';

/** components */
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  const items = mapJsonDataList(data);

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
