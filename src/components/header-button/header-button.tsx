import React, { FC } from 'react';
import styles from './header-button.module.css';
import { NavLink } from 'react-router-dom';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

type THeaderButtonProps = {
    route: string,
    text: string,
    icon: FC<TIconProps>,
    className?: string
}

const HeaderButton: FC<THeaderButtonProps> = (props) => {
    return (
        <NavLink to={props.route} className={`pl-5 pr-5 ${styles.headerButtonContainer} ${props.className || ''}`}>
            {({ isActive }) => (
                <>
                    <props.icon type={isActive ? 'primary' : 'secondary'}></props.icon>
                    <p className={`ml-2 text_type_main-default noselect ${!isActive && 'text_color_inactive'}`}>{props.text}</p>
                </>
            )}
        </NavLink>
    );
}

export default HeaderButton;