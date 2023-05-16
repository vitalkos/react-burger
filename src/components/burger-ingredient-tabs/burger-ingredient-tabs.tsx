import React, { useRef, useState, useEffect, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient-tabs.module.css';
import { ingredientTypeItems } from '../../core/const/ingredient-type-items.const';

type TBurgerIngredientTabsProps = {
    selectedItemKey: string,
    onTabClicked: Function
}

const BurgerIngredientTabs: FC<TBurgerIngredientTabsProps> = (props) => {
    const tabs = ingredientTypeItems;
    const [currentTabKey, setCurrentTabKey] = useState<string>(props.selectedItemKey);
    
    const prevTabKeyRef = useRef<string | null>(null);
    const prevSelectedItemKey = useRef<string | null>(null);

    const setCurrent = (tabKey: string) => {
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

export default BurgerIngredientTabs;