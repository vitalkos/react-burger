import React from 'react';
import styles from './app-header.module.css';
import { headerButtonPropTypes } from './app-header.type'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = React.memo(() => {
    return (
        <div className={styles.headerContainer}>
            <section className={`mt-4 mb-4 ml-15 ${styles.section}`}>
                <HeaderButton className='mr-2' text='Конструктор' icon={BurgerIcon} isActive={true} />
                <HeaderButton text='Лента заказов' icon={ListIcon} isActive={false} />
            </section>
            <section className={`${styles.section} ${styles.logoSection}`}>
                <Logo />
            </section>
            <section className={`mr-15 ${styles.section} ${styles.rightSection}`}>
                <HeaderButton text='Личный кабинет' icon={ProfileIcon} isActive={false} />
            </section>
        </div>)
})

const HeaderButton = (props) => {
    return (
        <a className={`pl-5 pr-5 ${styles.headerButtonContainer} ${props.className || ''}`}>
            <props.icon type={props.isActive ? 'primary' : 'secondary'}></props.icon>
            <p className={`ml-2 text_type_main-default noselect ${!props.isActive && 'text_color_inactive'}`}>{props.text}</p>
        </a>
    );
}

HeaderButton.propTypes = headerButtonPropTypes;

export default AppHeader;