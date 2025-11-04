import React, { useEffect, useState } from 'react';
import { Accordion, Card, Alert, Spinner, Table, Badge } from 'react-bootstrap';
import { getAllCustomersWithAccounts } from '../services/customerApi';

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
          setError(err.response?.data || 'Failed to load customers');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2">
        <Spinner animation="border" size="sm" />
        <span>Loading customers…</span>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2 className="mb-3">Customers & Accounts</h2>
      {customers.length === 0 ? (
        <Alert variant="info" className="mb-0">No customers found.</Alert>
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
                              <td className="text-end">{a.balance}</td>
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


