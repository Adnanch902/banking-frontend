import React, { useState } from 'react';
import { createCustomer } from '../services/customerApi';
import { Form, Button, Alert, Card, FloatingLabel } from 'react-bootstrap';

function CreateCustomer() {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    try {
      setLoading(true);
      const { data } = await createCustomer({ name });
      // Backend returns { customerId, name }
      setSuccess(`Customer created with ID: ${data.customerId}`);
      setError(null);
      setName('');
    } catch (err) {
      setError(err.response?.data || 'Error creating customer');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-3">Create Customer</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="customerName" label="Customer Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <div className="d-flex gap-2">
              <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
              <Button variant="outline-secondary" type="button" onClick={() => { setName(''); setError(null); setSuccess(null); }} disabled={loading}>Clear</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      {success && <Alert className="mt-3" variant="success">{success}</Alert>}
      {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
    </div>
  );
}

export default CreateCustomer;