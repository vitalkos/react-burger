import React from 'react';
import { useDrop, useDrag } from "react-dnd";
import styles from './constructor-unlocked-element.module.css';
import { constructorUnlockedElementPropTypes } from './constructor-unlocked-element.type';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DndArea } from '../../core/types/dnd-area.type';

/** redux */
import { useDispatch } from 'react-redux';
import { deleteSelectedIngredient, moveSelectedIngredient } from '../../services/actions';

const ConstructorUnlockedElement = React.memo((props) => {
  const dispatch = useDispatch();
  const removeClicked = () =>
    dispatch(deleteSelectedIngredient(props.rowKey));

  const [{ isDragging }, dragRef] = useDrag({
    type: DndArea.CONSTRUCTOR,
    item: { key: props.rowKey },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, dropRef] = useDrop({
    accept: DndArea.CONSTRUCTOR,
    hover: ({ key }) => key !== props.rowKey &&
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
ConstructorUnlockedElement.propTypes = constructorUnlockedElementPropTypes;

export default ConstructorUnlockedElement;