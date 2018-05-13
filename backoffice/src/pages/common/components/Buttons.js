import React from 'react';
import proptypes from 'prop-types';
import _ from 'lodash';

import Button from './Button';
import '../styles/Buttons.css';

const Buttons = ({ buttons }) => (
  <div className="Buttons-container">
    {_.map(buttons, (button, key) => (
      <Button
        key={key}
        color={button.color}
        callback={button.callback}
        icon={button.icon}
        label={button.label}
      />
    ))}
  </div>
);

Buttons.proptypes = {
  buttons: proptypes.array.isRequired,
};

export default Buttons;
