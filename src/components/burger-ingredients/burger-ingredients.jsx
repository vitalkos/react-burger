import React, { useRef, useState } from 'react';
import { burgerIngredientsPropTypes } from './burger-ingredients.type';
import styles from './burger-ingredients.module.css';
import { ingredientItemTypes } from '../../core/types/ingredient-item.type';
import BurgerIngredientTabs from '../burger-ingredient-tabs/burger-ingredient-tabs';
import BurgerIngredientItems from '../burger-ingredient-items/burger-ingredient-items';

const BurgerIngredients = React.memo(() => {
    const [selectedGroupKey, setSelectedGroupKey] = useState(ingredientItemTypes[0].key);
    const itemsComponentRef = useRef();

    const tabClicked = (e) =>
        itemsComponentRef.current?.find(t => t.key === e.key)?.ref?.current?.scrollIntoView();

    const groupScrolled = (e) =>
        setSelectedGroupKey(e.key);

    return (<>
        <p className='mt-10 mb-5 noselect text text_type_main-large'>Соберите бургер</p>
        <BurgerIngredientTabs selectedItemKey={selectedGroupKey} onTabClicked={tabClicked} />
        <BurgerIngredientItems selectedGroupKey={selectedGroupKey} ref={itemsComponentRef}
            onGroupScrolled={groupScrolled} />
    </>);

});
BurgerIngredients.propTypes = burgerIngredientsPropTypes;

export default BurgerIngredients;