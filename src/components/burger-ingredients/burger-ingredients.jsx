import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { ingredientItemTypes } from '../../core/types/ingredient-item.type';
import data from '../../utils/data.json';
import React from 'react';

class BurgerIngredients extends React.PureComponent {

    itemsComponentRef = React.createRef();
    state = { selectedGroupKey: ingredientItemTypes[0].key }

    tabClicked = (e) =>
        this.itemsComponentRef.current?.groups
            .find(t => t.key === e.key)?.ref?.current?.scrollIntoView();

    groupScrolled = (e) =>
        this.setState({ ...this.state, selectedGroupKey: e.key });

    ingredientClicked = (e) =>
        this.props.itemAdded(e);

    render() {
        return (<>
            <p className='mt-10 mb-5 noselect text text_type_main-large'>Соберите бургер</p>
            <BurgerIngredientTabs selectedItemKey={this.state.selectedGroupKey} onTabClicked={this.tabClicked} />
            <BurgerIngredientItems selectedGroupKey={this.state.selectedGroupKey} selectedItems={this.props.ingredients} ref={this.itemsComponentRef}
                onGroupScrolled={this.groupScrolled} onItemClick={this.ingredientClicked} />
        </>);
    }
}

class BurgerIngredientTabs extends React.Component {
    tabs = ingredientItemTypes;
    state = { current: this.props.selectedItemKey };
    setCurrent = (tabKey) => {
        this.props.onTabClicked({ key: tabKey });
        this.setState({ ...this.state, current: tabKey });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.current !== this.state.current) return true;
        nextProps.selectedItemKey !== this.state.current && this.setState({ ...this.state, current: nextProps.selectedItemKey });
        return nextProps.selectedItemKey !== this.state.current;
    }

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
    groups = ingredientItemTypes.map(itemType => ({
        key: itemType.key,
        name: itemType.name,
        ref: React.createRef(),
        items: data.filter(t => t.type === itemType.key)
    }));
    containerRef = React.createRef();
    selectedGroupKey = this.props.selectedGroupKey;
    calcItemsCount = (items) => items.map(t => t._id).reduce((t, v) => { t[v] = (t[v] || 0) + 1; return t; }, {});
    itemsCount = this.calcItemsCount(this.props.selectedItems);

    componentDidMount() {
        const container = this.containerRef.current;
        container?.addEventListener('scroll', this.scrolledGroupHandler);
    }
    shouldComponentUpdate(nextProps, nextState) {
        (nextProps.selectedGroupKey !== this.selectedGroupKey) &&
            (this.selectedGroupKey = nextProps.selectedGroupKey);
        this.itemsCount = this.calcItemsCount(nextProps.selectedItems);
        return true;
    }



    componentWillUnmount() {
        const container = this.containerRef.current;
        container.removeEventListener("scroll", this.scrolledGroupHandler);
    }

    scrolledGroupHandler = () => {
        const container = this.containerRef.current;
        const sections = this.groups.map(t => t.ref.current);
        const containerPosition = container.getBoundingClientRect();
        const positions = sections.map(section => section.getBoundingClientRect());
        positions.forEach((position, index) => {
            if (position.top < containerPosition.top && position.bottom > 0 &&
                this.groups[index].key !== this.selectedGroupKey) {
                this.selectedGroupKey = this.groups[index].key;
                this.props.onGroupScrolled({ key: this.selectedGroupKey })
                console.log(this.groups[index].name);
            }
        });
    }

    itemClicked = (e) =>
        this.props.onItemClick(e);

    render() {
        return (
            <div className='custom-scroll mt-10 mb-10' style={{ height: '100%', overflow: 'auto' }} ref={this.containerRef}>
                {this.groups.map((group, groupIndex) =>
                    <section key={group.key} className={groupIndex !== 0 ? 'mt-10' : ''}>
                        <p className='noselect text text_type_main-medium' ref={group.ref}>{group.name}</p>
                        <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {group.items.map((item, itemIndex) => (
                                <section key={item._id} className={`ml-4 mr-3 ${(itemIndex === 0 || itemIndex === 1) ? 'mt-6' : 'mt-8'}`} style={{ width: 'calc(50% - 28px)' }}>
                                    <BurgerIngredientItem data={item} count={this.itemsCount[item._id]} onClick={this.itemClicked} />
                                </section>
                            ))}
                        </section>
                    </section>)}
            </div>);
    }
}

class BurgerIngredientItem extends React.PureComponent {
    clicked = () => {
        this.props.onClick({ item: this.props.data });
    }
    render() {
        return (
            <div className={styles.ingredientItemContainer} title={this.props.data.name} onClick={this.clicked}>
                <img className='ml-4 mr-4 mb-1' style={{ width: 'calc(100% - 32px)' }} src={this.props.data.image_large} alt={this.props.data.name} />
                <section className='mb-1' style={{ display: 'inline-flex' }}>
                    <p className="mr-2 noselect text text_type_digits-default">{this.props.data.price}</p>
                    <CurrencyIcon type="primary" />
                </section>
                <p className={`${styles.ingredientItemText} noselect text text_type_main-default`}>{this.props.data.name}</p>
                {!!this.props.count && <Counter count={this.props.count} size="default" extraClass="noselect" />}
            </div>
        )
    }
}

export default BurgerIngredients;