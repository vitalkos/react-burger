import React, { useState } from 'react';
import styles from './App.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItemTypeKeys } from './core/types/ingredient-item.type';

/** components */
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

const App = () => {
  const [ingredients, setIngredients] = useState([] as any);

  const ingredientAdded = (e: any) => {
    if (e.item.type === ingredientItemTypeKeys.bun &&
      ingredients.some((t: any) => t.type === ingredientItemTypeKeys.bun)) {
      const existedBun = ingredients.find((t: any) => t.type === ingredientItemTypeKeys.bun);
      if (existedBun._id === e.item._id)
        return;
      ingredientRemoved({ rowKey: existedBun.key });
    }
    const key = Math.max(...ingredients.map((t: any) => t.key));
    const newItem = { ...e.item, key: key >= 0 ? (key + 1) : 0 };
    setIngredients((prevState: any) => ([...prevState, newItem]));
  };


  const ingredientRemoved = (e: { rowKey: string }) =>
    setIngredients([...ingredients.filter((t: any) => t.key !== e.rowKey)]);

  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <AppHeader />
      </header>
      <main className={`ml-30 mr-30 ${styles.appMain}`}>
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
