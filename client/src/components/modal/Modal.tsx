import { ReactNode, FC } from 'react';

import { ModalContainer } from './modalContainer.styled';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, closeModal, children }) => {
    if (!isOpen) return null;

    const handleModalContainerClick = (e: { stopPropagation: () => void; }) => e.stopPropagation();


    return (
        <ModalContainer onClick={closeModal}>
            <div className= "modal" onClick={handleModalContainerClick}>
                <button
                    type='button'
                    className= "modal_close_button"
                    onClick={closeModal}
                    aria-label="Close Modal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </button>
                {children}
            </div>
        </ModalContainer>
    );
};

export default Modal;
