import React from 'react';
import './style.css';
import liquidStyles from '../LiquidGlass.module.css';

const OrangePushButton = ({ children }) => {
  return (
    <button className={`orange-push-button ${liquidStyles.glassButton}`}>
      <div className="button-outer">
        <div className="button-inner">
          <span>{children}</span>
        </div>
      </div>
    </button>
  );
};

export default OrangePushButton;
