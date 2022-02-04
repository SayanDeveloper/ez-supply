import React, {useState} from 'react';
import ProductDetails from './ProductDetails';

function EachProduct() {
    const [openDetails, setOpendetails] = useState(false);
    return (
    <div className='each-prod'>
        {openDetails ?
        <ProductDetails />
        : ""
        }
        <div className='owned-prod-detail'>
        <div className='prod-name overflow-dotted'>Iphone 20 max pro ultra ultimate </div>
        <div className='manu-id-row'>
            <div className='manufacturer-name overflow-dotted'>Manufacturer: Sample organisation</div>
            <div className='prod-id'>Product Id: 12345678</div>
        </div>
        </div>
        <div className='transfer-btn'>Transfer</div>
    </div>
    );
}

export default EachProduct;
