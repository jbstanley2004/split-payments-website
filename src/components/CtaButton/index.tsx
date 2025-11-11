import React from 'react';
import './style.css';

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'nav';
}

const CtaButton = ({ children, variant, ...props }: CtaButtonProps) => {
  const buttonClasses = ['cta-push-button'];
  if (variant) {
    buttonClasses.push(`cta-push-button--${variant}`);
  }
  return (
    <button className={buttonClasses.join(' ')} {...props}>
      <div className="button-outer">
        <div className="button-inner">
          <span>{children}</span>
        </div>
      </div>
    </button>
  );
};

export default CtaButton;
