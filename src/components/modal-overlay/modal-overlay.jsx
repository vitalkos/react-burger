import React from 'react';
import styles from './modal-overlay.module.css';
import { modalOverlayPropTypes } from './modal-overlay.type';

const ModalOverlay = (props) => {
    const overlayClassName = 'modal-overlay';
    const clicked = (e) =>
        e.target.classList.contains(overlayClassName) && props.onClick();

    return (
        <div className={`${styles.overlayContainer} ${overlayClassName}`} onClick={clicked}>
            {props.children}
        </div>)
}

ModalOverlay.propTypes = modalOverlayPropTypes;

export default ModalOverlay;