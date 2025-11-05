import React, { useState } from 'react';
import { createCustomer } from '../services/customerApi';
import { Form, Button, Alert, Card, FloatingLabel } from 'react-bootstrap';
import { isRequired, sanitizeString } from '../utils/validation';
import { getErrorMessage } from '../utils/errorHandler';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';
import { useToast } from './ToastContainer';

function CreateCustomer() {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { success: showToastSuccess, error: showToastError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameTrimmed = sanitizeString(name);
    if (!isRequired(nameTrimmed)) {
      setError(ERROR_MESSAGES.REQUIRED_FIELD);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { data } = await createCustomer({ name: nameTrimmed });
      const successMsg = SUCCESS_MESSAGES.CUSTOMER_CREATED(data.customerId);
      setSuccess(successMsg);
      showToastSuccess(successMsg);
      setName('');
    } catch (err) {
      const errorMsg = getErrorMessage(err) || ERROR_MESSAGES.CREATE_CUSTOMER_ERROR;
      setError(errorMsg);
      showToastError(errorMsg);
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
      {success && <Alert className="mt-3" variant="success" role="alert" aria-live="polite">{success}</Alert>}
      {error && <Alert className="mt-3" variant="danger" role="alert" aria-live="assertive">{error}</Alert>}
    </div>
  );
}

export default CreateCustomer;