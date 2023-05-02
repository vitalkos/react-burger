import React, { useState } from 'react';
import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

/** redux */
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../services/actions';

const Profile = () => {
    const { user, editUserRequestPending } = useSelector(store => ({
        user: store.auth.user,
        editUserRequestPending: store.auth.editUserRequest
    }));

    const [form, setValue] = useState({ name: user.name, email: user.email, password: '' });
    const dispatch = useDispatch();

    const onChange = e => 
        setValue({ ...form, [e.target.name]: e.target.value});

    const save = (e) => {
        e.preventDefault();
        const data = {};
        form.name !== user.name && (data.name = form.name);
        form.email !== user.email && (data.email = form.email);
        !!form.password && (data.password = form.password);
        dispatch(editUser(data));
    }

    const cancel = (e) => {
        e.preventDefault();
        setValue({name: user.name, email: user.email, password: ''})
    }
    return (
        <form onSubmit={save} className={styles.profileContainer}>
            <Input
                placeholder='Имя'
                icon={'EditIcon'}
                name="name"
                value={form.name}
                onChange={onChange}
                disabled={editUserRequestPending}
                extraClass='mb-6' />
            <Input
                placeholder='Логин'
                icon={'EditIcon'}
                name="email"
                value={form.email}
                onChange={onChange}
                disabled={editUserRequestPending}
                type='email'
                extraClass='mb-6' />
            <Input
                placeholder='Пароль'
                icon={'EditIcon'}
                name="password"
                value={form.password}
                onChange={onChange}
                disabled={editUserRequestPending}
                type='password' />
            {(form.name !== user.name || form.email !== user.email || !!form.password) &&
                (<section className={`mt-20 ${styles.editButtonsContainer}`}>
                    <Button htmlType="submit" size="medium" extraClass='mb-20' disabled={editUserRequestPending}>
                        Сохранить
                    </Button>
                    <Button htmlType="button" size="medium" onClick={cancel} extraClass='ml-5' disabled={editUserRequestPending}>
                        Отмена
                    </Button>
                </section>)}
        </form>
    );
}

export default Profile;