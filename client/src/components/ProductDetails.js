import React from 'react';

function ProductDetails() {
  return (
    <>
        <div className='modal-dark-bg'></div>
        <div className='product-details-modal'>
            <div className='close-option'><i className="fa fa-times" aria-hidden="true"></i></div>
            <div className='prod-modal-det-container'>
                <h3 className='text-center'>
                    Product name
                </h3>
                <div className='prod-id'>Product ID: 12345678</div>
                <div className='manu-name'>Manufacturer: Sample organisation</div>
                <div className='manu-date'>Mfg. Date: 01/01/01</div>
                <div className='current-owner'>Current Owner: 0x234feb234bd3 (Distributor)</div>
                <div className='qr-code'>
                    <img src='./images/sample-qr.png' />
                </div>
            </div>
        </div>
    </>
    );
}

export default ProductDetails;
