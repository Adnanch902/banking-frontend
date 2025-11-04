import React, { useState } from 'react';
import { getCustomer } from '../services/customerApi';
import { Form, Button, Alert, Card, FloatingLabel } from 'react-bootstrap';

function InquireCustomer() {
  const [id, setId] = useState('');
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idTrimmed = id.trim();
    setValidated(true);
    if (!idTrimmed) {
      setError('Customer ID is required');
      setCustomer(null);
      return;
    }
    try {
      const response = await getCustomer(idTrimmed);
      setCustomer(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Error inquiring customer');
      setCustomer(null);
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
        <Button type="submit">Inquire</Button>
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
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
}

export default InquireCustomer;