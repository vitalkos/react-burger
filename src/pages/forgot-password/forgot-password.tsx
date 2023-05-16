import React, { FC, useState, ChangeEvent, SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { ResetPasswordClient } from '../../core/clients/reset-password';


export const ForgotPasswordPage: FC = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value || '');

    const restore = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsLoading(true);
        ResetPasswordClient
            .sendEmailCode(email)
            .then(r => {
                setIsLoading(false);
                navigate('/reset-password', { state: { email } })
            })
            .catch(err => setIsLoading(false))
    }

    return (
        <div className={styles.loginContainer}>
            <p className='mb-6 noselect text text_type_main-medium'>Восстановление пароля</p>
            <form onSubmit={restore} className={styles.loginContainer}>
                <EmailInput
                    extraClass='mb-6'
                    value={email}
                    onChange={onChange}
                    disabled={isLoading}
                    placeholder='Укажите e-mail' />
                <Button htmlType="submit" size="medium"
                    disabled={isLoading} extraClass='mb-20'>Восстановить</Button>
            </form>
            <p className='mb-4 noselect text text_type_main-default text_color_inactive'>
                Вспомнили пароль? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}