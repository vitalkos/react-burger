import React from 'react';
import styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export const LoginPage = () => {
    return (
        <div className={styles.loginContainer}>
            <p className='mb-6 noselect text text_type_main-medium'>Вход</p>
            <EmailInput extraClass='mb-6' />
            <PasswordInput extraClass='mb-6' />
            <Button size="medium" extraClass='mb-20'>Войти</Button>
            <p className='mb-4 noselect text text_type_main-default text_color_inactive'>
                Вы - новый пользователь? <a href='#'>Зарегистрироваться</a>
            </p>
            <p className='noselect text text_type_main-default text_color_inactive'>
                Забыли пароль? <a href='#'>Восстановить пароль</a>
            </p>
        </div>
    );
}