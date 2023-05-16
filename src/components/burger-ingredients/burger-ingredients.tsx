import React, { useRef, useState, FC } from 'react';
import { ingredientTypeItems } from '../../core/const/ingredient-type-items.const';
import BurgerIngredientTabs from '../burger-ingredient-tabs/burger-ingredient-tabs';
import BurgerIngredientItems, { TBurgerIngredientItemsRef } from '../burger-ingredient-items/burger-ingredient-items';
import { IngredientType } from '../../core/models/ingredient-type.model';

const BurgerIngredients: FC = React.memo(() => {
    const [selectedGroupKey, setSelectedGroupKey] = useState<IngredientType>(ingredientTypeItems[0].key);
    const itemsComponentRef = useRef<TBurgerIngredientItemsRef[] | null>(null);

    const tabClicked = (e: { key: IngredientType }) =>
        itemsComponentRef.current?.find(t => t.key === e.key)?.ref?.current?.scrollIntoView();

    const groupScrolled = (e: { key: IngredientType }) =>
        setSelectedGroupKey(e.key);

    return (<>
        <p className='mt-10 mb-5 noselect text text_type_main-large'>Соберите бургер</p>
        <BurgerIngredientTabs selectedItemKey={selectedGroupKey} onTabClicked={tabClicked} />
        <BurgerIngredientItems selectedGroupKey={selectedGroupKey} ref={itemsComponentRef}
            onGroupScrolled={groupScrolled} />
    </>);

});

export default BurgerIngredients;