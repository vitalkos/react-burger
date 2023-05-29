import React, { FC, useState, SyntheticEvent, ChangeEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './register.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

/** redux */
import { useDispatch, useSelector } from '../../services/hooks';
import { register } from '../../services/actions';

export const RegisterPage: FC = () => {
    const isAuthorized = useSelector(store => !!store.auth.user);
    const dispatch = useDispatch();
    const [data, setValue] = useState({ name: '', email: '', password: '', nameValid: false, emailValid: false, passwordValid: false });

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setValue({ ...data, [e.target.name]: e.target.value, [e.target.name + 'Valid']: e.target.validity.valid });

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(register(data.name, data.email, data.password));
    }
    if (isAuthorized)
        return (<Navigate to={'/'} />);
    return (
        <div className={styles.loginContainer}>
            <p className='mb-6 noselect text text_type_main-medium'>Регистрация</p>
            <form onSubmit={submit} className={styles.loginContainer}>
                <Input value={data.name} name="name" onChange={onChange} extraClass='mb-6' placeholder='Имя' />
                <EmailInput value={data.email} name="email" onChange={onChange} extraClass='mb-6' />
                <PasswordInput value={data.password} name="password" onChange={onChange} extraClass='mb-6' />
                <Button htmlType="submit" size="medium" extraClass='mb-20'
                    disabled={!data.name || !data.email || !data.password || !data.nameValid || !data.emailValid || !data.passwordValid}>
                    Зарегистрироваться
                </Button>
            </form>
            <p className='mb-4 noselect text text_type_main-default text_color_inactive'>
                Уже зарегистрированы? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}