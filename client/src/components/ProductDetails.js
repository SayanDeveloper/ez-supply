import React, {useContext, useRef} from 'react';
import { GlobalContext } from '../context/provider';

function ProductDetails() {
    // context
    const {modal, modalID} = useContext(GlobalContext);
    const [modalOpen, setModalOpen] = modal;
    const [modalId, setModalId] = modalID;

    // refs
    const theModal = useRef();
    const modalBg = useRef();

    // function
    const animateFade = () => {
        modalBg.current.style.opacity = "0";
        theModal.current.style.transform = "translate(-50%,-50%) scale(0.3)";
        theModal.current.style.opacity = "0";
        setTimeout(() => {
            setModalOpen(false);
        }, 300);
    }

    return (
    <>
        <div className='modal-dark-bg' ref={modalBg} onClick={animateFade}></div>
        <div className='product-details-modal' ref={theModal}>
            <div className='close-option'><i onClick={animateFade} className="fa fa-times" aria-hidden="true"></i></div>
            <div className='prod-modal-det-container'>
                <h3 className='text-center'>
                    {modalId[0]}
                </h3>
                <div className='prod-id'>Product ID: {modalId[1]}</div>
                <div className='manu-name'>Manufacturer: {modalId[2]}</div>
                <div className='manu-date'>Mfg. Date: {modalId[3]}</div>
                <div className='current-owner'>Current Owner: {modalId[4]}</div>
                <div className='qr-code'>
                    <img src='./images/sample-qr.png' alt='qr-code' />
                </div>
            </div>
        </div>
    </>
    );
}

export default ProductDetails;
