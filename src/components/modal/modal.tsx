import React, { useEffect, useRef, FC } from 'react';
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("modal");
const ESC_KEYCODE = 27;

type TModalProps = {
    onClose: Function,
    children: React.ReactNode,
    header?: string
}

const Modal: FC<TModalProps> = (props) => {
    const closeClicked: () => void = () =>
        props.onClose();

    const closeClickedRef = useRef(closeClicked);
    useEffect(() => {
        const closeClicked = closeClickedRef.current;
        const escapeClickHandler = (e: { keyCode : number }) => {
            e = e || window.event;
            e.keyCode === ESC_KEYCODE && closeClicked();
        }
        document.addEventListener("keydown", escapeClickHandler);
        return () => {
            document.removeEventListener("keydown", escapeClickHandler);
        }
    }, []);


    return modalRoot ? ReactDOM.createPortal(
        (
            <div className={styles.modalContainer} data-testid="modal_container">
                <ModalOverlay onClick={closeClicked} />
                <section className={styles.modalContent}>
                    {!props.header ?
                        (<section className={`mt-15 mr-10 ${styles.closeButtonWithoutHeader} ${styles.closeButtonContainer}`} data-testid="modal_empty_header_close_button">
                            <CloseIcon type="primary" onClick={closeClicked} />
                        </section>) : (
                            <section className={`pl-10 pr-10 mt-10 pt-4 pb-4 ${styles.modalHeaderContainer}`}>
                                <p className={`noselect text text_type_main-large ${styles.modalHeaderContainer}`}>
                                    {props.header}
                                </p>
                                <section className={styles.closeButtonContainer} data-testid="modal_close_button">
                                    <CloseIcon type="primary" onClick={closeClicked} />
                                </section>
                            </section>
                        )}
                    <section className={`${styles.modalDataContainer} ${!props.header ? 'mt-30' : ''}`}>
                        {props.children}
                    </section>
                </section>
            </div>), modalRoot) : null;
}

export default Modal;