import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import styles from './profile.module.css';

/** redux */
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/actions';

export const ProfilePage = () => {
    const [selectedSection, setSelectedSection] = useState();
    const dispatch = useDispatch();
    const sections = [
        {
            name: 'Профиль',
            route: '/profile',
            description: 'В этом разделе вы можете изменить свои персональные данные'
        }, {
            name: 'История заказов',
            route: '/profile/orders',
            description: ''
        }, {
            name: 'Выход',
            route: '/profile/exit',
            onClick: () => dispatch(logout()),
            description: ''
        }
    ];
    const sectionClicked = (e, index) => {
        const section = sections[index];
        if (!section)
            return;

        if (section?.onClick) {
            e.preventDefault();
            section.onClick();
            return;
        }
        setSelectedSection(section);
    }


    return (
        <div className={styles.profileSectionsContainer}>
            <section className={`pt-30 mr-15 ${styles.leftSection}`}>
                {sections.map((section, index) => (
                    <NavLink end key={index} to={section.route} onClick={(e) => sectionClicked(e, index)}
                        className={({ isActive }) => `mb-10 noselect text text_type_main-medium ${styles.navLink} ${!isActive ? 'text_color_inactive' : styles.navLinkActive}`}>
                        {section.name}
                    </NavLink>
                ))}
                <p className={`mt-10 noselect text text_type_main-default text_color_inactive ${styles.descriptionText}`}>
                    {selectedSection?.description}
                </p>
            </section>
            <section className={`pt-30 ${styles.rightSection}`}>
                <Outlet />
            </section>
        </div>
    );
}