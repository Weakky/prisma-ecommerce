import React from 'react';
import proptypes from 'prop-types';
import { GoPlus, GoDash } from 'react-icons/lib/go';

import '../styles/resume.css';

const Resume = props => {
  return (
    <div>
      {props.data.available ? (
        <div className="Resume-container">
          <GoPlus className="Resume-icon" style={{ color: 'rgba(26, 188, 156, 1)' }} />
          <p className="Resume-name">{props.data.productName}</p>
          <p className="Resume-message">
            Ce produit est maintenant disponible en{' '}
            <span className="Resume-taxon">{props.data.name}</span>
          </p>
        </div>
      ) : (
        <div
          style={{ backgroundColor: 'rgba(204, 97, 85, 0.1)' }}
          className="Resume-container"
        >
          <GoDash className="Resume-icon" style={{ color: 'rgba(204, 97, 85, 1)' }} />
          <p className="Resume-name">{props.data.productName}</p>
          <p className="Resume-message">
            Ce produit n'est plus disponible en{' '}
            <span className="Resume-taxon">{props.data.name}</span>
          </p>
        </div>
      )}
    </div>
  );
};

Resume.proptypes = {
  data: proptypes.object.isRequired,
};

export default Resume;
