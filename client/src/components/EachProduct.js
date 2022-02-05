import React, {useState, useContext} from 'react';
import { GlobalContext } from '../context/provider';
import ProductDetails from './ProductDetails';
import TransferModal from './TransferModal';

function EachProduct() {
    // Context
    const {modal, transfer} = useContext(GlobalContext);
    const [modalOpen, setModalOpen] = modal;
    const [transferMod, setTransferMod] = transfer;

    return (
    <div className='each-prod'>
        {modalOpen ?
        <ProductDetails />
        : ""
        }
        {transferMod ?
        <TransferModal />
        : ""
        }
        <div className='owned-prod-detail' onClick={() => setModalOpen(true)}>
            <div className='prod-name overflow-dotted'>Iphone 20 max pro ultra ultimate </div>
            <div className='manu-id-row'>
                <div className='manufacturer-name overflow-dotted'>Manufacturer: Sample organisation</div>
                <div className='prod-id'>Product Id: 12345678</div>
            </div>
        </div>
        <div className='transfer-btn' onClick={() => setTransferMod(true)}>Transfer</div>
    </div>
    );
}

export default EachProduct;
