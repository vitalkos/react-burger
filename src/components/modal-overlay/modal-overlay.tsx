import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
    onClick: Function
};

const ModalOverlay: FC<TModalOverlayProps> = (props) => {
    const clicked: () => void = () =>
        props.onClick();

    return (
        <div className={styles.overlayContainer} onClick={clicked}>
        </div>)
}

export default ModalOverlay;