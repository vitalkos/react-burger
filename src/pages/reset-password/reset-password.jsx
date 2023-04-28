import React from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export const ResetPasswordPage = () => {
    return (
        <div className={styles.loginContainer}>
            <p className='mb-6 noselect text text_type_main-medium'>Восстановление пароля</p>
            <PasswordInput extraClass='mb-6' placeholder='Введите новый пароль' />
            <Input extraClass='mb-6' placeholder='Введите код из письма' />
            <Button size="medium" extraClass='mb-20'>Сохранить</Button>
            <p className='mb-4 noselect text text_type_main-default text_color_inactive'>
                Вспомнили пароль? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}