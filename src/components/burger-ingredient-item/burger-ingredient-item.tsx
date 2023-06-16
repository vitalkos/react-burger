import React, { FC } from 'react';
import { useDrag } from "react-dnd";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient-item.module.css';
import { DndArea } from '../../core/models/dnd-area.model';
import { TIngredientProp } from '../../core/models/ingredient-prop.model';

type TBurgerIngredientItemProps = TIngredientProp & {
    onClick: Function,
    count?: number
}

const BurgerIngredientItem: FC<TBurgerIngredientItemProps> = React.memo((props) => {
    const [{ isDrag }, dragRef] = useDrag({
        type: DndArea.ingredient,
        item: { id: props.id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const clicked = () =>
        props.onClick({ id: props.id });

    return (
        <div className={styles.ingredientItemContainer} style={isDrag ? { outline: '1px solid #ffee0030' } : {}} title={props.name} onClick={clicked} ref={dragRef} data-testid={`ingredient_item_${props.id}`}>
            <img className={`ml-4 mr-4 mb-1 ${styles.ingredientItemImage}`} src={props.image} alt={props.name} />
            <section className={`mb-1 ${styles.ingredientItemCost}`}>
                <p className="mr-2 noselect text text_type_digits-default">{props.price}</p>
                <CurrencyIcon type="primary" />
            </section>
            <p className={`${styles.ingredientItemText} noselect text text_type_main-default`}>{props.name}</p>
            {!!props.count && <Counter count={props.count} size="default" extraClass="noselect" />}
        </div>
    )
})

export default BurgerIngredientItem;