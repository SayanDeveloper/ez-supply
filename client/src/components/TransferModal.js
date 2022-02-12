import React, {useState, useContext, useRef} from 'react';
import { GlobalContext } from '../context/provider';

function TransferModal({con}) {
    // states
    const [newOwner, setNewOwner] = useState("");
    const [receiverDesig, setReceiverDesig] = useState("none");

    // context
    const {transfer, modalID, web3Ac} = useContext(GlobalContext);
    // eslint-disable-next-line
    const [transferMod, setTransferMod] = transfer;
    // eslint-disable-next-line
    const [modalId, setModalId] = modalID;
    // eslint-disable-next-line
    const [acct, setAcct] = web3Ac;
    // refs
    const theModal = useRef();
    const modalBg = useRef();

    // function
    const animateFade = () => {
        modalBg.current.style.opacity = "0";
        theModal.current.style.transform = "translate(-50%,-50%) scale(0.3)";
        theModal.current.style.opacity = "0";
        setTimeout(() => {
            setTransferMod(false);
        }, 300);
    }

    const transferHandling = async () => {
        if (receiverDesig === "none") {
            alert("Please choose receiver category");
            return;
        }
        try {
            if (con) {
                con.methods.changeOwner(
                    modalId[1],
                    `${newOwner} (${receiverDesig})`,
                    newOwner
                ).send({from: acct})
                .then(res => {
                    setTransferMod(false);
                    console.log("Successful");
                })
                .catch(err => {
                    alert(err.message);
                })
            }
        }   catch(err) {
            alert("Invalid receiver id");
        }
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
                <div className='current-owner'>Current Owner: {modalId[4]}</div>
                <div className='recipient-input'>
                    <h4 className='text-center'>Enter the wallet address of recipient</h4>
                    <input 
                        type="text"
                        value={newOwner}
                        onChange={(e) => setNewOwner(e.target.value)}
                    />
                    <h4 className='text-center'>Type of receiver : </h4>
                    <select value={receiverDesig} onChange={(e) => setReceiverDesig(e.target.value)}  required={true}>
                        <option value="none" disabled={true}>Please Choose a category</option>
                        <option value="distributor">Distributor</option>
                        <option value="retailer">Retailer</option>
                        <option value="customer">Customer</option>
                    </select>
                    <button onClick={transferHandling}>Send</button>
                </div>
            </div>
        </div>
    </>
    );
}

export default TransferModal;
