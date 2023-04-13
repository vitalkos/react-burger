import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app.module.css';

/** components */
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const App = () => {
  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <AppHeader />
      </header>
      <main className={`ml-20 mr-20 ${styles.appMain}`}>
        <DndProvider backend={HTML5Backend}>
          <section className={`mr-5 ${styles.appSection}`}>
            <BurgerIngredients />
          </section>
          <section className={`ml-5 ${styles.appSection}`}>
            <BurgerConstructor />
          </section>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
