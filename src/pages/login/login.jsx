import React from 'react';
import { Link } from 'react-router-dom';
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
                Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
            </p>
            <p className='noselect text text_type_main-default text_color_inactive'>
                Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
            </p>
        </div>
    );
}