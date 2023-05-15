import React, { useRef, useState } from 'react';
import { ingredientTypeItems } from '../../core/const/ingredient-type-items.const';
import BurgerIngredientTabs from '../burger-ingredient-tabs/burger-ingredient-tabs';
import BurgerIngredientItems from '../burger-ingredient-items/burger-ingredient-items';

const BurgerIngredients = React.memo(() => {
    const [selectedGroupKey, setSelectedGroupKey] = useState(ingredientTypeItems[0].key);
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

export default BurgerIngredients;