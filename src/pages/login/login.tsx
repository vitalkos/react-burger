import React, { FC, useState, SyntheticEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

/** redux */
import { useDispatch } from '../../services/hooks';
import { login } from '../../services/actions';

export const LoginPage: FC = () => {
    const dispatch = useDispatch();
    const [data, setValue] = useState({ email: '', password: '', emailValid: false, passwordValid: false });

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setValue({ ...data, [e.target.name]: e.target.value, [e.target.name + 'Valid']: e.target.validity.valid });

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(login(data.email, data.password));
    };

    return (
        <div className={styles.loginContainer}>
            <p className='mb-6 noselect text text_type_main-medium'>Вход</p>
            <form onSubmit={submit} className={styles.loginContainer}>
                <EmailInput value={data.email} name="email" onChange={onChange} extraClass='mb-6' data-testid='email_input' />
                <PasswordInput value={data.password} name="password" onChange={onChange} extraClass='mb-6' data-testid='password_input' />
                <Button htmlType="submit" size="medium" extraClass='mb-20' data-testid='login_button'
                    disabled={!data.email || !data.password || !data.emailValid || !data.passwordValid}>
                    Войти
                </Button>
            </form>
            <p className='mb-4 noselect text text_type_main-default text_color_inactive'>
                Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
            </p>
            <p className='noselect text text_type_main-default text_color_inactive'>
                Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
            </p>
        </div>
    );
}