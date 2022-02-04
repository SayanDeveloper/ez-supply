import React from 'react';
import '../styles/loaderAnimation.css';

function SolidLoader() {
  return (
    <div className="solid-loader-bg">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
    </div>
  );
}

export default SolidLoader;
