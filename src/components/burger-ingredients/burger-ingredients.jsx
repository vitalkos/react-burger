import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerIngredientsPropTypes
, burgerIngredientTabsPropTypes
, burgerIngredientItemsPropTypes
, burgerIngredientItemPropTypes } from './burger-ingredients.type'
import styles from './burger-ingredients.module.css';
import { ingredientItemTypes } from '../../core/types/ingredient-item.type';
import data from '../../utils/data.json';
import React from 'react';
import { mapJsonDataList } from '../../core/mappers/data.mapper'

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
BurgerIngredients.propTypes = burgerIngredientsPropTypes;

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
BurgerIngredientTabs.propTypes = burgerIngredientTabsPropTypes;

class BurgerIngredientItems extends React.Component {
    groups = ingredientItemTypes.map(itemType => ({
        key: itemType.key,
        name: itemType.name,
        ref: React.createRef(),
        items: mapJsonDataList(data, { useLargeImage: true })
            .filter(t => t.type === itemType.key)
    }));
    containerRef = React.createRef();
    selectedGroupKey = this.props.selectedGroupKey;
    calcItemsCount = (items) => items.map(t => t.id).reduce((t, v) => { t[v] = (t[v] || 0) + 1; return t; }, {});
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
                this.props.onGroupScrolled({ key: this.selectedGroupKey });
            }
        });
    }

    itemClicked = (e) =>
        this.props.onItemClick(e);

    render() {
        return (
            <div className={`custom-scroll mt-10 mb-10 ${styles.ingredientItemsContainer}`} ref={this.containerRef}>
                {this.groups.map((group, groupIndex) =>
                    <section key={group.key} className={groupIndex !== 0 ? 'mt-10' : ''}>
                        <p className='noselect text text_type_main-medium' ref={group.ref}>{group.name}</p>
                        <section className={styles.ingredientGroupContainer}>
                            {group.items.map(t => ({
                                id: t.id,
                                name: t.name,
                                image: t.image,
                                price: t.price,
                                count: this.itemsCount[t.id]
                            })).map((item, itemIndex) => (
                                <section key={item.id} className={`ml-4 mr-3 ${styles.ingredientGroupItemContainer} ${(itemIndex === 0 || itemIndex === 1) ? 'mt-6' : 'mt-8'}`}>
                                    <BurgerIngredientItem {...item} onClick={this.itemClicked} />
                                </section>
                            ))}
                        </section>
                    </section>)}
            </div>);
    }
}
BurgerIngredientItems.propTypes = burgerIngredientItemsPropTypes;

class BurgerIngredientItem extends React.PureComponent {
    clicked = () => {
        this.props.onClick({ id: this.props.id });
    }
    render() {
        return (
            <div className={styles.ingredientItemContainer} title={this.props.name} onClick={this.clicked}>
                <img className={`ml-4 mr-4 mb-1 ${styles.ingredientItemImage}`} src={this.props.image} alt={this.props.name} />
                <section className={`mb-1 ${styles.ingredientItemCost}`}>
                    <p className="mr-2 noselect text text_type_digits-default">{this.props.price}</p>
                    <CurrencyIcon type="primary" />
                </section>
                <p className={`${styles.ingredientItemText} noselect text text_type_main-default`}>{this.props.name}</p>
                {!!this.props.count && <Counter count={this.props.count} size="default" extraClass="noselect" />}
            </div>
        )
    }
}
BurgerIngredientItem.propTypes = burgerIngredientItemPropTypes;

export default BurgerIngredients;