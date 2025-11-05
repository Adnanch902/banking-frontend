import React, { useEffect, useState } from 'react';
import { Accordion, Card, Alert, Table, Badge } from 'react-bootstrap';
import { getAllCustomersWithAccounts } from '../services/customerApi';
import { getErrorMessage } from '../utils/errorHandler';
import { formatCurrency } from '../utils/formatters';
import { ERROR_MESSAGES } from '../constants';
import Loading from './Loading';
import EmptyState from './EmptyState';

function CustomersWithAccounts() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await getAllCustomersWithAccounts();
        if (mounted) {
          setCustomers(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(getErrorMessage(err) || ERROR_MESSAGES.LOAD_CUSTOMERS_ERROR);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return <Loading message="Loading customers…" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2 className="mb-3">Customers & Accounts</h2>
      {customers.length === 0 ? (
        <EmptyState
          title="No customers found"
          message="There are no customers in the system yet. Create a customer to get started."
        />
      ) : (
        <Accordion alwaysOpen>
          {customers.map((c, idx) => (
            <Accordion.Item eventKey={String(idx)} key={c.customerId || idx}>
              <Accordion.Header>
                <div className="d-flex w-100 justify-content-between">
                  <span>#{c.customerId} — {c.name}</span>
                  <Badge bg="secondary">{(c.accounts?.length) || 0} accounts</Badge>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {(c.accounts && c.accounts.length > 0) ? (
                  <Card className="shadow-sm">
                    <Card.Body className="p-0">
                      <Table striped bordered hover responsive size="sm" className="mb-0">
                        <thead>
                          <tr>
                            <th>Account #</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th className="text-end">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {c.accounts.map((a) => (
                            <tr key={a.accountNumber}>
                              <td>{a.accountNumber}</td>
                              <td>{a.accountType}</td>
                              <td>{a.status}</td>
                              <td className="text-end">{formatCurrency(a.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                ) : (
                  <div className="text-muted">No accounts for this customer.</div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
}

export default CustomersWithAccounts;


