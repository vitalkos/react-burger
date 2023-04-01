import React from 'react';
import styles from './burger-constructor.module.css';
import { ingredientItemTypeKeys } from '../../core/types/ingredient-item.type';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.PureComponent {
  get totalCost() {
    const cost = this.props.ingredients.map(t => t.price).reduce((p, c) => p + c, 0);
    const singleBunPrice = this.props.ingredients.find(t => t.type === ingredientItemTypeKeys.bun)?.price;
    return singleBunPrice ? (cost + singleBunPrice) : cost;
  }

  ingredientRemoveClicked = (e) =>
    this.props.itemRemoved(e);

  render() {
    return (
      <div className={`mt-25 ${styles.burgerConstructorContainer}`}>
        <section className={styles.itemsContainer}>
          <BurgerConstructorItems items={this.props.ingredients} onItemRemoved={this.ingredientRemoveClicked} />
        </section>
        <section className='mb-10 mt-10 mr-4'>
          <section className={styles.orderContainer}>
            <p className="mr-1 noselect text text_type_digits-default">{this.totalCost}</p>
            <CurrencyIcon type="primary" />
            <Button extraClass='ml-10' htmlType="button" type="primary" size="small">
              Оформить заказ
            </Button>
          </section>
        </section>
      </div>);
  }
}

class BurgerConstructorItems extends React.PureComponent {
  get lockedItem() {
    return this.props.items.find(t => t.type === ingredientItemTypeKeys.bun);
  }
  get unlockedItems() {
    return this.props.items.filter(t => t.type !== ingredientItemTypeKeys.bun);
  }

  itemRemoved = (e) => {
    this.props.onItemRemoved(e);
  }

  render() {
    return (<div className={styles.burgerConstructorItemsContainer}>
      {!!this.lockedItem &&
        <section className='ml-8 mr-4'>
          <ConstructorElement
            extraClass={`noselect ${styles.constructorElement}`}
            type="top"
            isLocked={true}
            text={`${this.lockedItem.name} (верх)`}
            price={this.lockedItem.price}
            thumbnail={this.lockedItem.image}
          />
        </section>}

      {!!this.unlockedItems && (
        <section className={`custom-scroll ${styles.unlockedItemsContainer}`}>
          {this.unlockedItems.map(item =>
            (<ConstructorUnlockedElement key={item.key} rowKey={item.key} {...item} onRemoveClick={this.itemRemoved} />))}
        </section>
      )}

      {!!this.lockedItem &&
        <section className='ml-8 mr-4'>
          <ConstructorElement
            extraClass={`noselect ${styles.constructorElement}`}
            type="bottom"
            isLocked={true}
            text={`${this.lockedItem.name} (низ)`}
            price={this.lockedItem.price}
            thumbnail={this.lockedItem.image}
          />
        </section>}
    </div>);
  }
}

class ConstructorUnlockedElement extends React.PureComponent {
  removeClicked = () =>
    this.props.onRemoveClick({ key: this.props._id, rowKey: this.props.rowKey });

  render() {
    return (
      <section className={`mr-4 ${styles.unlockedElement}`}>
        <DragIcon type="primary" />
        <ConstructorElement
          extraClass={`ml-2 noselect ${styles.constructorElement}`}
          text={this.props.name}
          price={this.props.price}
          handleClose={this.removeClicked}
          thumbnail={this.props.image}
        />
      </section>)
  };
}


export default BurgerConstructor;