import React, { FC } from 'react';
import styles from './app-header.module.css';
import HeaderButton from '../header-button/header-button';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
/** redux */
import { useSelector } from '../../services/hooks';

const AppHeader: FC = React.memo(() => {
    const userName: string = useSelector((store: any) => store.auth.user?.name);
    return (
        <div className={styles.headerContainer}>
            <section className={`mt-4 mb-4 ml-15 ${styles.section}`}>
                <HeaderButton className='mr-2' route='/' text='Конструктор' icon={BurgerIcon} />
                <HeaderButton route='/orders' text='Лента заказов' icon={ListIcon} />
            </section>
            <section className={`${styles.section} ${styles.logoSection}`}>
                <Logo />
            </section>
            <section className={`mr-15 ${styles.section} ${styles.rightSection}`}>
                <HeaderButton route='/profile' text={userName || 'Личный кабинет'} icon={ProfileIcon} />
            </section>
        </div>)
});

export default AppHeader;