import React, { useState } from 'react';
import { getCustomer } from '../services/customerApi';
import { Form, Button, Alert, Card, FloatingLabel } from 'react-bootstrap';
import { isValidCustomerId, sanitizeString } from '../utils/validation';
import { getErrorMessage } from '../utils/errorHandler';
import { ERROR_MESSAGES } from '../constants';

function InquireCustomer() {
  const [id, setId] = useState('');
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idTrimmed = sanitizeString(id);
    setValidated(true);
    if (!isValidCustomerId(idTrimmed)) {
      setError(ERROR_MESSAGES.INVALID_CUSTOMER_ID);
      setCustomer(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await getCustomer(idTrimmed);
      setCustomer(response.data);
    } catch (err) {
      setError(getErrorMessage(err) || ERROR_MESSAGES.INQUIRE_CUSTOMER_ERROR);
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-3">Inquire Customer</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="mb-3">
        <FloatingLabel controlId="customerId" label="Customer ID" className="mb-3">
          <Form.Control
            type="text"
            placeholder="CUST-2025-000001"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            isInvalid={validated && !id.trim()}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid customer ID like CUST-2025-000001.
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button type="submit" disabled={loading}>
          {loading ? 'Inquiring...' : 'Inquire'}
        </Button>
      </Form>
      {customer && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Customer Details</Card.Title>
            <p>ID: {customer.customerId}</p>
            <p>Name: {customer.name}</p>
          </Card.Body>
        </Card>
      )}
      {error && <Alert variant="danger" role="alert" aria-live="assertive">{error}</Alert>}
    </div>
  );
}

export default InquireCustomer;