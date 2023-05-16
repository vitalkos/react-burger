import React, { FC } from 'react';
import { useDrop, useDrag } from "react-dnd";
import styles from './constructor-unlocked-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DndArea } from '../../core/models/dnd-area.model';

/** redux */
import { useDispatch } from 'react-redux';
import { deleteSelectedIngredient, moveSelectedIngredient } from '../../services/actions';
import { TIngredientProp } from '../../core/models/ingredient-prop.model';

type TConstructorUnlockedElementProps = TIngredientProp & {
  rowKey: number
};

const ConstructorUnlockedElement: FC<TConstructorUnlockedElementProps> = React.memo((props) => {
  const dispatch = useDispatch();
  const removeClicked = () =>
    dispatch(deleteSelectedIngredient(props.rowKey));

  const [{ isDragging }, dragRef] = useDrag({
    type: DndArea.constructor,
    item: { key: props.rowKey },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, dropRef] = useDrop({
    accept: DndArea.constructor,
    hover: ({ key }: { key: number}) => key !== props.rowKey &&
      dispatch(moveSelectedIngredient(key, props.rowKey))

  });

  const draggingStyle = {
    opacity: 0
  }

  return (
    <section className={`mr-4 ${styles.unlockedElement}`} style={isDragging ? draggingStyle : {}}
      ref={(item) => dragRef(dropRef(item))}>
      <DragIcon type="primary" />
      <ConstructorElement
        extraClass={`ml-2 noselect ${styles.constructorElement}`}
        text={props.name}
        price={props.price}
        handleClose={removeClicked}
        thumbnail={props.image}
      />
    </section>);
});

export default ConstructorUnlockedElement;