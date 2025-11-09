import React from 'react';
import './style.css';

const OrangePushButton = ({ children }) => {
  return (
    <button className="orange-push-button">
      <div className="button-outer">
        <div className="button-inner">
          <span>{children}</span>
        </div>
      </div>
    </button>
  );
};

export default OrangePushButton;
