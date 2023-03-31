import React, { useState } from 'react';
import styles from './App.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

const App = () => {
  const [ingredients, setIngredients] = useState([] as any);
  
  const ingredientAdded = (e: any) => {
    const key = Math.max(...ingredients.map((t: any) => t.key));
    const newItem = { ...e.item, key: key >= 0 ? (key + 1) : 0 };
    setIngredients((prevState: any) => ([...prevState, newItem]));
  };

  const ingredientRemoved = (e: any) => 
    setIngredients([...ingredients.filter((t: any) => t.key !== e.rowKey)]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.appHeader}>
        <AppHeader />
      </div>
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
