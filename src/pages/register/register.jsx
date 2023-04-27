import React from 'react';
import styles from './register.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export const RegisterPage = () => {
    return (
        <div className={styles.loginContainer}>
            <p className='mb-6 noselect text text_type_main-medium'>Регистрация</p>
            <Input extraClass='mb-6' placeholder='Имя' />
            <EmailInput extraClass='mb-6' />
            <PasswordInput extraClass='mb-6' />
            <Button size="medium" extraClass='mb-20'>Зарегистрироваться</Button>
            <p className='mb-4 noselect text text_type_main-default text_color_inactive'>
                Уже зарегистрированы? <a href='#'>Войти</a>
            </p>
        </div>
    );
}