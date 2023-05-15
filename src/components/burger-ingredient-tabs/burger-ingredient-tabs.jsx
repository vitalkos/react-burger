import React, { useRef, useState, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerIngredientTabsPropTypes } from './burger-ingredient-tabs.type';
import styles from './burger-ingredient-tabs.module.css';
import { ingredientTypeItems } from '../../core/const/ingredient-type-items.const';

const BurgerIngredientTabs = (props) => {
    const tabs = ingredientTypeItems;
    const [currentTabKey, setCurrentTabKey] = useState(props.selectedItemKey);
    
    const prevTabKeyRef = useRef();
    const prevSelectedItemKey = useRef();

    const setCurrent = (tabKey) => {
        props.onTabClicked({ key: tabKey });
        setCurrentTabKey(tabKey);
    }

    useEffect(() => {
        (prevTabKeyRef.current === currentTabKey &&
            prevSelectedItemKey.current !== props.selectedItemKey) &&
            setCurrentTabKey(props.selectedItemKey);

        prevTabKeyRef.current = currentTabKey;
        prevSelectedItemKey.current = props.selectedItemKey;
    }, [currentTabKey, props.selectedItemKey]);

    return (
        <div className={styles.tabListContainer}>
            {tabs.map(tab => (
                <section key={tab.key} className={styles.tabContainer}>
                    <Tab value={tab.key} active={currentTabKey === tab.key} onClick={setCurrent}>{tab.name}</Tab>
                </section>))}
        </div>)

}

BurgerIngredientTabs.propTypes = burgerIngredientTabsPropTypes;

export default BurgerIngredientTabs;