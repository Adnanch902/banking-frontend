import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Loading({ message = 'Loading...', size = 'sm', className = '' }) {
  return (
    <div className={`d-flex align-items-center gap-2 ${className}`} role="status" aria-live="polite">
      <Spinner animation="border" size={size} role="status" aria-label="Loading">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <span>{message}</span>
    </div>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  className: PropTypes.string,
};

export default Loading;
