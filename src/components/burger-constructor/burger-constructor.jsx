import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.json';

class BurgerConstructor extends React.Component {
  items = data;
  get totalCost() {
    return this.items.map(t => t.price).reduce((p, c) => p + c, 0);
  }
  render() {
    return (<div className='mt-25' style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <section style={{ height: '100%', overflow: 'hidden' }}>
        <BurgerConstructorItems items={this.items} />
      </section>
      <section className='mb-10 mt-10 mr-4'>
        <section style={{ display: 'inline-flex', alignItems: 'center', float: 'right' }}>
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

class BurgerConstructorItems extends React.Component {
  get lockedItem() {
    return this.props.items.find(t => t.type === 'bun');
  }
  get unlockedItems() {
    return this.props.items.filter(t => t.type !== 'bun');
  }
  render() {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', height: '100%' }}>
      {!!this.lockedItem &&
        <section className='ml-8 mr-4'>
          <ConstructorElement
            extraClass={`${styles.constructorElement}`}
            type="top"
            isLocked={true}
            text={`${this.lockedItem.name} (верх)`}
            price={this.lockedItem.price}
            thumbnail={this.lockedItem.image}
          />
        </section>}

      {!!this.unlockedItems && (
        <section className='custom-scroll' style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', overflowY: 'overlay' }}>
          {this.unlockedItems.map(item =>
          (
            <ConstructorUnlockedElement key={item._id} {...item} />
            /*             <section key={item._id} className='mr-4' style={{ display: 'flex', alignItems: 'center' }}>
                          <DragIcon type="primary" />
                          <ConstructorElement
                            extraClass={`ml-2 ${styles.constructorElement}`}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                          />
                        </section> */
          ))}
        </section>
      )}

      {!!this.lockedItem &&
        <section className='ml-8 mr-4'>
          <ConstructorElement
            extraClass={`${styles.constructorElement}`}
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

class ConstructorUnlockedElement extends React.Component {
  get lockedItem() {
    return this.props.items.find(t => t.type === 'bun');
  }
  get unlockedItems() {
    return this.props.items.filter(t => t.type !== 'bun');
  }
  render() {
    return (
      <section className='mr-4' style={{ display: 'flex', alignItems: 'center' }}>
        <DragIcon type="primary" />
        <ConstructorElement
          extraClass={`ml-2 ${styles.constructorElement}`}
          text={this.props.name}
          price={this.props.price}
          thumbnail={this.props.image}
        />
      </section>)
  };
}


export default BurgerConstructor;