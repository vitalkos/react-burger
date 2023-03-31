import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const AppHeader = React.memo(() => {
    return (
        <div className={styles.headerContainer}>
            <section className={`mt-4 mb-4 ml-30 ${styles.section}`}>
                <HeaderButton className='mr-2' text='Конструктор' icon={BurgerIcon} isActive={true} />
                <HeaderButton text='Лента заказов' icon={ListIcon} isActive={false} />
            </section>
            <section className={`${styles.section} ${styles.logoSection}`}>
                <Logo />
            </section>
            <section className={`mr-30 ${styles.section} ${styles.rightSection}`}>
                <HeaderButton text='Личный кабинет' icon={ProfileIcon} isActive={false} />
            </section>
        </div>)
})

const HeaderButton = (props) => {
    return (
        <div className={`${props.className} ${styles.headerButtonContainer}`}>
            <section className='ml-5 mr-2'>
                <props.icon type={props.isActive ? 'primary' : 'secondary'}></props.icon>
            </section>
            <p className={`mr-5 text_type_main-default noselect ${!props.isActive && 'text_color_inactive'}`}>{props.text}</p>
        </div>
    );
}

HeaderButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    isActive: PropTypes.bool.isRequired,
    className: PropTypes.string
};

export default AppHeader;