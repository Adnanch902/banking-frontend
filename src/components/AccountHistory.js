import React, { useState } from 'react';
import { Form, Button, Alert, Card, Table, FloatingLabel, Row, Col } from 'react-bootstrap';
import { getAccountHistory } from '../services/customerApi';

function AccountHistory() {
  const [number, setNumber] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFetch = async (e) => {
    e.preventDefault();
    if (!number) {
      setError('Account number is required');
      return;
    }
    try {
      setLoading(true);
      const { data } = await getAccountHistory(number);
      setHistory(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Error fetching history');
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Account History</h2>
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Form onSubmit={onFetch}>
            <Row className="g-3 align-items-end">
              <Col md={6}>
                <FloatingLabel controlId="accountNumber" label="Account Number">
                  <Form.Control
                    type="text"
                    placeholder="MAY-001-20-00000001"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col md="auto">
                <Button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Fetch History'}</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {history.length > 0 && (
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Transactions</Card.Title>
            <Table striped bordered hover responsive size="sm" className="mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {history.map((tx, idx) => (
                  <tr key={tx.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{tx.timestamp || ''}</td>
                    <td>{tx.type}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.balanceAfter}</td>
                    <td>{tx.description || ''}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
    </div>
  );
}

export default AccountHistory;


