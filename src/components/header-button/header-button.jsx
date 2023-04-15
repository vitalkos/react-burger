import React from 'react';
import styles from './header-button.module.css';
import { headerButtonPropTypes } from './header-button.type'

const HeaderButton = (props) => {
    return (
        <a className={`pl-5 pr-5 ${styles.headerButtonContainer} ${props.className || ''}`}>
            <props.icon type={props.isActive ? 'primary' : 'secondary'}></props.icon>
            <p className={`ml-2 text_type_main-default noselect ${!props.isActive && 'text_color_inactive'}`}>{props.text}</p>
        </a>
    );
}

HeaderButton.propTypes = headerButtonPropTypes;

export default HeaderButton;