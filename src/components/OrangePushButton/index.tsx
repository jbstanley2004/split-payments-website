import React from 'react';
import './style.css';

interface OrangePushButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const OrangePushButton = ({ children, ...props }: OrangePushButtonProps) => {
  return (
    <button className="orange-push-button" {...props}>
      <div className="button-outer">
        <div className="button-inner">
          <span>{children}</span>
        </div>
      </div>
    </button>
  );
};

export default OrangePushButton;
