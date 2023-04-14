import React from 'react';
import styles from './app-header.module.css';
import HeaderButton from '../header-button/header-button';
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
});

export default AppHeader;