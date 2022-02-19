import React, {useState, useEffect, useContext, useRef} from 'react';
import { GlobalContext } from '../context/provider';
import QRCode from 'react-qr-code';

function ProductDetails() {
    // states
    const [prevOwners, setPrevOwners] = useState();

    // context
    const {modal, modalID} = useContext(GlobalContext);
    const [modalOpen, setModalOpen] = modal;
    const [modalId, setModalId] = modalID;

    // refs
    const theModal = useRef();
    const modalBg = useRef();

    // function
    useEffect(() => {
        setPrevOwners(modalId[5].slice(3));
    }, [])
    
    
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
                <div className='prod-id'><span className='det-title'>Product ID :</span> {modalId[1]}</div>
                <div className='manu-name'><span className='det-title'>Manufacturer :</span> {modalId[2]}</div>
                <div className='manu-date'><span className='det-title'>Mfg. Date : </span>{modalId[3]}</div>
                <div className='current-owner'><span className='det-title'>Current Owner :</span> {modalId[4]}</div>
                <div className='previous-owners'>
                    {prevOwners ?
                        <>
                            <span className='det-title'>Previous Owners : </span>
                            {prevOwners}
                        </>
                        : ""
                    }
                    </div>
                <div className='qr-code'>
                    <QRCode value={modalId[1]} />
                </div>
            </div>
        </div>
    </>
    );
}

export default ProductDetails;
