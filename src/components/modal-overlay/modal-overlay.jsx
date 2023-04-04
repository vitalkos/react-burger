import React from 'react';
import styles from './modal-overlay.module.css';
import { modalOverlayPropTypes } from './modal-overlay.type';

const ModalOverlay = (props) => {
    const clicked = () =>
        props.onClick();

    return (
        <div className={styles.overlayContainer} onClick={clicked}>
        </div>)
}

ModalOverlay.propTypes = modalOverlayPropTypes;

export default ModalOverlay;