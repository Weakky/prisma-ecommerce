import React from 'react';
import proptypes from 'prop-types';

import '../styles/button.css';

const Button = props => {
  return (
    <div className="Button-container">
      <button
        style={{ border: 0, backgroundColor: props.color }}
        className="Button-link"
        onClick={() => props.callback()}
      >
        {props.icon}
        <span className="Button-link-label">{props.label}</span>
      </button>
    </div>
  );
};

Button.proptypes = {
  color: proptypes.string,
  callback: proptypes.func,
  icon: proptypes.element,
  label: proptypes.string,
};

export default Button;
