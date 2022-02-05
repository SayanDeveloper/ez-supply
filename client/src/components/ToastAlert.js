import React from 'react';
import '../styles/main.css';

function ToastAlert({message}) {
    return (
    <div className='toast-alert'>
        {message}
    </div>
    );
}

export default ToastAlert;
