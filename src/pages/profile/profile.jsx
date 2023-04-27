import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import styles from './profile.module.css';

export const ProfilePage = () => {
    const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
    const navigate = useNavigate();

    const sections = [
        {
            name: 'Профиль',
            onClick: () => navigate('/profile'),
            description: 'В этом разделе вы можете изменить свои персональные данные'
        }, {
            name: 'История заказов',
            onClick: () => navigate('/profile/orders'),
            description: ''
        }, {
            name: 'Выход',
            onClick: () => alert('exit test'),
            description: ''
        }
    ];
    const sectionClicked = (index) => {
        /* setSelectedSectionIndex(index);
        sections[index]?.onClick(); */
    }

    return (
        <div className={styles.profileSectionsContainer}>
            <section className={`pt-30 mr-15 ${styles.leftSection}`}>
                {sections.map((section, index) => (
                    <p key={index} onClick={() => sectionClicked(index)}
                        className={`mb-10 noselect text text_type_main-medium ${selectedSectionIndex !== index ? 'text_color_inactive' : ''}`}>
                        {section.name}
                    </p>
                ))}
                <p className={`mt-10 noselect text text_type_main-default text_color_inactive ${styles.descriptionText}`}>
                    {sections[selectedSectionIndex].description}
                </p>
            </section>
            <section className={styles.rightSection}>
                <Outlet />
            </section>
        </div>
    );
}