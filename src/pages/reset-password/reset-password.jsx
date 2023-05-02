import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import styles from './reset-password.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { ResetPasswordClient } from '../../core/clients/reset-password';

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const email = location.state?.email;

    const onCodeChange = e =>
        setCode(e.target.value || '');

    const onPasswordChange = e =>
        setPassword(e.target.value || '');

    const save = (e) => {
        e.preventDefault();
        if (!code || !password) return;
        setIsLoading(true);
        ResetPasswordClient
            .reset(password, code)
            .then(r => {
                setIsLoading(false);
                navigate('/login');
            })
            .catch(err => setIsLoading(false))
    }

    return !email ? (<Navigate to="/forgot-password" replace />) : (
        <div className={styles.loginContainer}>
            <p className='mb-6 noselect text text_type_main-medium'>Восстановление пароля</p>
            <form onSubmit={save} className={styles.loginContainer}>
                <PasswordInput
                    value={password}
                    onChange={onPasswordChange}
                    disabled={isLoading}
                    extraClass='mb-6' placeholder='Введите новый пароль' />
                <Input
                    value={code}
                    onChange={onCodeChange}
                    disabled={isLoading}
                    extraClass='mb-6' placeholder='Введите код из письма' />
                <Button htmlType="submit" size="medium"
                    disabled={isLoading} extraClass='mb-20'>Сохранить</Button>
            </form>
            <p className='mb-4 noselect text text_type_main-default text_color_inactive'>
                Вспомнили пароль? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}