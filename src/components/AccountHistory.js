import React, { useState } from 'react';
import { Form, Button, Alert, Card, Table, FloatingLabel, Row, Col } from 'react-bootstrap';
import { getAccountHistory } from '../services/customerApi';
import { isValidAccountNumber, sanitizeString } from '../utils/validation';
import { getErrorMessage } from '../utils/errorHandler';
import { formatDate, formatCurrency } from '../utils/formatters';
import { ERROR_MESSAGES } from '../constants';
import Loading from './Loading';
import EmptyState from './EmptyState';

function AccountHistory() {
  const [number, setNumber] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFetch = async (e) => {
    e.preventDefault();
    const numTrimmed = sanitizeString(number);
    if (!isValidAccountNumber(numTrimmed)) {
      setError(ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { data } = await getAccountHistory(numTrimmed);
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err) || ERROR_MESSAGES.FETCH_HISTORY_ERROR);
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

      {loading && <Loading message="Loading transaction history..." />}
      {!loading && history.length > 0 && (
        <Card className="shadow-sm" aria-label="Transaction history">
          <Card.Body>
            <Card.Title>Transactions</Card.Title>
            <Table striped bordered hover responsive size="sm" className="mb-0" role="table" aria-label="Transaction history table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Type</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {history.map((tx, idx) => (
                  <tr key={tx.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{formatDate(tx.timestamp)}</td>
                    <td>{tx.type}</td>
                    <td>{formatCurrency(tx.amount)}</td>
                    <td>{formatCurrency(tx.balanceAfter)}</td>
                    <td>{tx.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
      {!loading && history.length === 0 && number && (
        <EmptyState
          title="No transactions found"
          message={`No transaction history available for account ${number}.`}
        />
      )}

      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
    </div>
  );
}

export default AccountHistory;


