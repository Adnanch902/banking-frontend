import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function EmptyState({
  title = 'No data available',
  message = 'There is nothing to display here.',
  actionLabel,
  onAction,
  icon,
}) {
  return (
    <Card className="shadow-sm">
      <Card.Body className="text-center p-5">
        {icon && <div className="mb-3">{icon}</div>}
        <h5 className="text-muted mb-2">{title}</h5>
        <p className="text-muted mb-4">{message}</p>
        {actionLabel && onAction && (
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  icon: PropTypes.node,
};

export default EmptyState;
