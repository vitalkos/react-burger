import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { modalPropTypes } from './modal.type';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("modal");
const ESC_KEYCODE = 27;

const Modal = (props) => {
    const closeClicked = () =>
        props.onClose();

    const closeClickedRef = useRef(closeClicked);
    useEffect(() => {
        const closeClicked = closeClickedRef.current;
        const escapeClickHandler = (e) => {
            e = e || window.event;
            e.keyCode === ESC_KEYCODE && closeClicked();
        }
        document.addEventListener("keydown", escapeClickHandler);
        return () => {
            document.removeEventListener("keydown", escapeClickHandler);
        }
    }, []);


    return ReactDOM.createPortal(
        (
            <div className={styles.modalContainer}>
                <ModalOverlay onClick={closeClicked} />
                <section className={styles.modalContent}>
                    {!props.header ?
                        (<section className={`mt-15 mr-10 ${styles.closeButtonWithoutHeader} ${styles.closeButtonContainer}`}>
                            <CloseIcon type="primary" onClick={closeClicked} />
                        </section>) : (
                            <section className={`pl-10 pr-10 mt-10 pt-4 pb-4 ${styles.modalHeaderContainer}`}>
                                <p className={`noselect text text_type_main-large ${styles.modalHeaderContainer}`}>
                                    {props.header}
                                </p>
                                <section className={styles.closeButtonContainer}>
                                    <CloseIcon type="primary" onClick={closeClicked} />
                                </section>
                            </section>
                        )}
                    <section className={`${styles.modalDataContainer} ${!props.header ? 'mt-30' : ''}`}>
                        {props.children}
                    </section>
                </section>
            </div>), modalRoot)
}

Modal.propTypes = modalPropTypes;

export default Modal;