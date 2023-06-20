import React, { useRef, useEffect, MutableRefObject } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styles from './burger-ingredient-items.module.css';
import { ingredientTypeItems } from '../../core/const/ingredient-type-items.const';
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';
import { TIngredient } from '../../core/models/ingredient.model';
import { TSelectedIngredient } from '../../core/models/selected-ingredient.model';
import { IngredientType } from '../../core/models/ingredient-type.model';
/** redux */
import { useSelector } from '../../services/hooks';

type TBurgerIngredientItemsProps = {
    selectedGroupKey: string,
    onGroupScrolled: Function
}

export type TBurgerIngredientItemsRef = {
    key: IngredientType,
    ref: MutableRefObject<HTMLParagraphElement | null> | null
}

const BurgerIngredientItems = React.forwardRef<TBurgerIngredientItemsRef[], TBurgerIngredientItemsProps>((props, ref) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { items, selectedItems } = useSelector(store => ({
        items: store.ingredients.items
        , selectedItems: store.selectedIngredients.items
    }));

    const groups: {
        key: IngredientType,
        ref: MutableRefObject<HTMLParagraphElement | null> | null,
        name: string,
        items: TIngredient[]
    }[] = ingredientTypeItems.map(itemType => ({
        key: itemType.key,
        name: itemType.name,
        ref: null,
        items: items.filter(t => t.type === itemType.key)
    }));

    groups[0].ref = useRef<HTMLParagraphElement>(null);
    groups[1].ref = useRef<HTMLParagraphElement>(null);
    groups[2].ref = useRef<HTMLParagraphElement>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    if (typeof ref === 'function')
        ref(groups.map(t => ({ key: t.key, ref: t.ref })));
    else
        ref && (ref.current = groups.map(t => ({ key: t.key, ref: t.ref })));

    const calcItemsCount = (items: readonly TSelectedIngredient[]) =>
        items.map(t => t.id).reduce((t: { [name: string]: number }, v) => { t[v] = (t[v] || 0) + 1; return t; }, {});
    const itemsCount: { [name: string]: number } = calcItemsCount(selectedItems);

    let selectedGroupKey = props.selectedGroupKey;
    const scrolledGroupHandlerRef = useRef(() => {
        const container = containerRef.current;
        if (!container) return;
        const sections = groups.map(t => t.ref?.current);
        const containerPosition = container.getBoundingClientRect();
        const positions = sections.map(section => section?.getBoundingClientRect());
        positions.forEach((position, index) => {
            if (position && position.top < containerPosition.top && position.bottom > 0 &&
                groups[index].key !== selectedGroupKey) {
                selectedGroupKey = groups[index].key;
                props.onGroupScrolled({ key: selectedGroupKey });
            }
        });
    })

    useEffect(() => {
        const container = containerRef.current;
        const scrolledGroupHandler = scrolledGroupHandlerRef.current;
        container?.addEventListener('scroll', scrolledGroupHandler);
        return () => {
            container?.removeEventListener("scroll", scrolledGroupHandler);
        }
    }, []);

    const itemClicked = (e: { id: string }) => {
        e?.id && navigate(`/ingredients/${e.id}`, { state: { backgroundLocation: location } })
    }

    return (
        <div className={`custom-scroll mt-10 mb-10 ${styles.ingredientItemsContainer}`} ref={containerRef}>
            {groups.map((group, groupIndex) =>
                <section key={group.key} className={groupIndex !== 0 ? 'mt-10' : ''}>
                    <p className='noselect text text_type_main-medium' ref={group.ref}>{group.name}</p>
                    <section className={styles.ingredientGroupContainer}>
                        {group.items.map(t => ({
                            id: t.id,
                            name: t.name,
                            image: t.image,
                            price: t.price,
                            count: itemsCount[t.id]
                        })).map((item, itemIndex) => (
                            <section key={item.id} className={`ml-4 mr-3 ${styles.ingredientGroupItemContainer} ${(itemIndex === 0 || itemIndex === 1) ? 'mt-6' : 'mt-8'}`}>
                                <BurgerIngredientItem {...item} onClick={itemClicked}/>
                            </section>
                        ))}
                    </section>
                </section>)}
        </div>);
})

export default BurgerIngredientItems;