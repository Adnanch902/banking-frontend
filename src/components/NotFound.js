import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="mt-5 text-center" role="main" aria-labelledby="not-found-title">
      <Card className="shadow-sm">
        <Card.Body className="p-5">
          <h1 className="display-1 fw-bold text-muted" aria-label="404 Error">404</h1>
          <h2 id="not-found-title" className="mb-3">Page Not Found</h2>
          <p className="lead text-muted mb-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg" aria-label="Return to home page">
            Go Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFound;
