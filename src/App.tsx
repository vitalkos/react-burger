import React, { useState } from 'react';
import styles from './App.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItemTypeKeys } from './core/types/ingredient-item.type';
import data from './utils/data.json';

/** components */
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

//models
import SelectedIngredientItem from './core/models/selected-ingredient-item.model';
import { mapJsonDataList } from './core/mappers/data.mapper';
import IngredientItem from './core/models/ingredient-item.model';

const App = () => {
  const [ingredients, setIngredients] = useState([] as SelectedIngredientItem[]);

  const items = mapJsonDataList(data) as IngredientItem[];

  const ingredientAdded = (e: { id: any }) => {
    const addedItem = items.find((t: any) => t.id === e.id);
    if (!addedItem) return;
    if (addedItem.type === ingredientItemTypeKeys.bun &&
      ingredients.some((t: SelectedIngredientItem) => t.type === ingredientItemTypeKeys.bun)) {
      const existedBun = ingredients.find((t: any) => t.type === ingredientItemTypeKeys.bun);
      if (existedBun) {
        if (existedBun?.id === addedItem.id)
          return;
        ingredientRemoved({ rowKey: existedBun.rowKey });
      }
    }
    const key = Math.max(...ingredients.map((t: SelectedIngredientItem) => t.rowKey));
    const newItem = { ...addedItem, rowKey: key >= 0 ? (key + 1) : 0 };
    setIngredients((prevState: any) => ([...prevState, newItem]));
  };


  const ingredientRemoved = (e: { rowKey: string }) =>
    setIngredients([...ingredients.filter((t: SelectedIngredientItem) => t.rowKey !== e.rowKey)]);

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
