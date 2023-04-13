import React, { useRef, useEffect } from 'react';
import { burgerIngredientItemsPropTypes } from './burger-ingredient-items.type';
import Modal from '../modal/modal';
import styles from './burger-ingredient-items.module.css';
import { ingredientItemTypes } from '../../core/types/ingredient-item.type';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';
import { IngredientRepository } from '../../core/repositories/ingredient.repository';

/** redux */
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsAll, setIngredientDetails, clearIngredientDetails } from '../../services/actions';

const BurgerIngredientItems = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const { items, selectedItems, detailsItemId } = useSelector(store => ({
        items: store.ingredients.items
        , selectedItems: store.selectedIngredients.items
        , detailsItemId: store.ingredientDetails.id
    }));

    const groups = ingredientItemTypes.map(itemType => ({
        key: itemType.key,
        name: itemType.name,
        ref: null,
        items: items.filter(t => t.type === itemType.key)
    }));

    groups[0].ref = useRef();
    groups[1].ref = useRef();
    groups[2].ref = useRef();

    const containerRef = useRef();

    ref.current = groups.map(t => ({ key: t.key, ref: t.ref }));

    const calcItemsCount = (items) => items.map(t => t.id).reduce((t, v) => { t[v] = (t[v] || 0) + 1; return t; }, {});
    const itemsCount = calcItemsCount(selectedItems);

    let selectedGroupKey = props.selectedGroupKey;
    const scrolledGroupHandlerRef = useRef(() => {
        const container = containerRef.current;
        const sections = groups.map(t => t.ref.current);
        const containerPosition = container.getBoundingClientRect();
        const positions = sections.map(section => section.getBoundingClientRect());
        positions.forEach((position, index) => {
            if (position.top < containerPosition.top && position.bottom > 0 &&
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
        dispatch(getIngredientsAll());
        return () => {
            container.removeEventListener("scroll", scrolledGroupHandler);
        }
    }, [dispatch]);

    const itemClicked = async (e) => {
        if (!e.id)
            return;
        try {
            const item = await IngredientRepository.getDetails(e.id, { useLargeImage: true });
            item && dispatch(setIngredientDetails(item));
        }
        catch { }
    }
    const closeDetails = () =>
        dispatch(clearIngredientDetails());


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
                                <BurgerIngredientItem {...item} onClick={itemClicked} />
                            </section>
                        ))}
                    </section>
                </section>)}
            {detailsItemId && (
                <Modal header='Детали ингредиента' onClose={closeDetails}>
                    <IngredientDetails id={detailsItemId} />
                </Modal>)}
        </div>);
})

BurgerIngredientItems.propTypes = burgerIngredientItemsPropTypes;

export default BurgerIngredientItems;