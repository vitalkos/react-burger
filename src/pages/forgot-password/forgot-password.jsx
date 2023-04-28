import React from 'react';
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export const ForgotPasswordPage = () => {
    return (
        <div className={styles.loginContainer}>
            <p className='mb-6 noselect text text_type_main-medium'>Восстановление пароля</p>
            <EmailInput extraClass='mb-6' placeholder='Укажите e-mail'/>
            <Button size="medium" extraClass='mb-20'>Восстановить</Button>
            <p className='mb-4 noselect text text_type_main-default text_color_inactive'>
                Вспомнили пароль? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}