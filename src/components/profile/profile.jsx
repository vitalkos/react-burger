import React from 'react';
import styles from './profile.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

const Profile = () => {
    const iconClicked = () => {
        alert(123);
    }
    return (
        <div className={`${styles.profileContainer}`}>
            <Input
                placeholder='Имя'
                icon={'EditIcon'}
                disabled={true}
                onIconClick={iconClicked}
                extraClass='mb-6' />
            <Input
                placeholder='Логин'
                icon={'EditIcon'}
                disabled={true}
                onIconClick={iconClicked}
                extraClass='mb-6' />
            <Input
                placeholder='Пароль'
                icon={'EditIcon'}
                disabled={true}
                onIconClick={iconClicked}
                type='password' />
        </div>
    );
}

export default Profile;