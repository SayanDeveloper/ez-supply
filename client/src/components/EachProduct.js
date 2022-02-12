import React, {useContext} from 'react';
import { GlobalContext } from '../context/provider';
import Web3 from 'web3';

function EachProduct({prodId, prodName, con}) {
    // Context
    const {modal, transfer, web3Ac, modalID, soft} = useContext(GlobalContext);
    const [softLoading, setSoftLoading] = soft;
    const [modalOpen, setModalOpen] = modal;
    const [transferMod, setTransferMod] = transfer;
    const [acct, setAcct] = web3Ac;
    const [modalId, setModalId] = modalID;

    // functions
    const showProdDetails = async () => {
        setSoftLoading(true);
        if (con) {
            con.methods.verifyProduct(prodId).call({from: acct})
            .then(res => {
                setModalId(Object.values(res));
                setModalOpen(true);
                setSoftLoading(false);
            })
            .catch(err => {
                setSoftLoading(false);
                alert(err.message);
            })
        }
    }

    const transferModalHandling = async () => {
        setSoftLoading(true);
        if (con) {
            con.methods.verifyProduct(prodId).call({from: acct})
            .then(res => {
                setModalId(Object.values(res));
                setTransferMod(true);
                setSoftLoading(false);
            })
            .catch(err => {
                setSoftLoading(false);
                alert(err.message);
            })
        }
    }
    if (prodId == 0) {
        return(
            <></>
        );
    }
    return (
    <div className='each-prod'>
        <div className='owned-prod-detail' onClick={showProdDetails}>
            <div className='prod-name overflow-dotted'>{Web3.utils.toAscii(prodName)}</div>
            <div className='manu-id-row'>
                <div className='prod-id'>Product Id: {prodId}</div>
            </div>
        </div>
        <div className='transfer-btn' onClick={transferModalHandling}>Transfer</div>
    </div>
    );
}

export default EachProduct;
