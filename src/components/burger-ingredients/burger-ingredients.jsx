import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import data from '../../utils/data.json';
import React from 'react';


const itemTypes = [{
    key: 'bun',
    name: 'Булки'
}, {
    key: 'sauce',
    name: 'Соусы'
}, {
    key: 'main',
    name: 'Начинки'
}];

class BurgerIngredients extends React.Component {
    render() {
        return (<>
            <p className='mt-10 mb-5 noselect text text_type_main-large'>Соберите бургер</p>
            <BurgerIngredientTabs />
            <BurgerIngredientItems />
        </>);
    }
}

class BurgerIngredientTabs extends React.Component {
    tabs = itemTypes;
    state = { current: this.tabs[0].key };
    setCurrent = (tabKey) =>
        this.setState({ ...this.state, current: tabKey });

    render() {
        return (
            <div className={styles.tabListContainer}>
                {this.tabs.map(tab => (
                    <section key={tab.key} className={styles.tabContainer}>
                        <Tab value={tab.key} active={this.state.current === tab.key} onClick={this.setCurrent}>{tab.name}</Tab>
                    </section>))}
            </div>);
    }
}

class BurgerIngredientItems extends React.Component {
    groups = itemTypes.map(itemType => ({
        key: itemType.key,
        name: itemType.name,
        ref: null,
        items: data.filter(t => t.type === itemType.key)
    }));
    render() {
        return (
            <div className='custom-scroll mt-10 mb-10' style={{ height: '100%', overflow: 'auto' }}>
                {this.groups.map(group =>
                    <section key={group.key} className='mb-10'>
                        <p className='mb-6 noselect text text_type_main-medium' >{group.name}</p>
                        <section style={{ display: 'flex',flexWrap: 'wrap' }}>
                        {group.items.map(item => (
                            <section key={item._id} className='ml-4 mr-3 mb-8' style={{ background: 'gray', width: 'calc(50% - 28px)' }}>
                                <BurgerIngredientItem data={item} />
                            </section>
                        ))}
                        </section>
                    </section>)}
            </div>);
    }
}

class BurgerIngredientItem extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img className='ml-4 mr-4 mb-1' style={{ width: 'calc(100% - 32px)'}} src={this.props.data.image} alt={this.props.data.name} />
                <section className='mb-1' style={{ display: 'inline-flex' }}>
                    <p className="mr-2 noselect text text_type_digits-default">{this.props.data.price}</p>
                    <CurrencyIcon type="primary" />
                </section>
                <p style={{background: 'green', width: '100%', textAlign: 'center'}} className="pb-6 noselect text text_type_main-default">{this.props.data.name}</p>
            </div>
        )
    }
}

export default BurgerIngredients;