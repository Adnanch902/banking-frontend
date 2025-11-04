import React, { useState } from 'react';
import { Form, Button, Alert, Card, FloatingLabel, Row, Col } from 'react-bootstrap';
import { createAccount, inquireAccount, deposit, withdraw, closeAccount } from '../services/customerApi';

function Account() {
  const [createForm, setCreateForm] = useState({ customerId: '', type: 'SAVINGS' });
  const [number, setNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [closeNumber, setCloseNumber] = useState('');
  const [validated, setValidated] = useState({ create: false, inquire: false, amount: false, close: false });

  const onCreate = async (e) => {
    e.preventDefault();
    setValidated((v) => ({ ...v, create: true }));
    const idTrimmed = String(createForm.customerId || '').trim();
    const typeTrimmed = String(createForm.type || '').trim();
    if (!idTrimmed || !typeTrimmed) {
      setError('Provide Customer ID and Account Type');
      setResult(null);
      return;
    }
    try {
      const { data } = await createAccount({ customerId: idTrimmed, type: createForm.type });
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Error creating account');
      setResult(null);
    }
  };

  const onInquire = async (e) => {
    e.preventDefault();
    setValidated((v) => ({ ...v, inquire: true }));
    const numTrimmed = String(number || '').trim();
    const numValid = /^[0-9A-Za-z_-]+$/.test(numTrimmed);
    if (!numTrimmed || !numValid) {
      setError('Provide a valid account number');
      setResult(null);
      return;
    }
    try {
      const { data } = await inquireAccount(number);
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Error inquiring account');
      setResult(null);
    }
  };

  const onDeposit = async (e) => {
    e.preventDefault();
    setValidated((v) => ({ ...v, amount: true }));
    const numTrimmed = String(number || '').trim();
    const numValid = /^[0-9A-Za-z_-]+$/.test(numTrimmed);
    const amountNum = Number(amount);
    if (!numTrimmed || !numValid || !isFinite(amountNum) || amountNum <= 0) {
      setError('Provide a valid account number and a positive amount');
      setResult(null);
      return;
    }
    try {
      const { data } = await deposit({ number, amount });
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Error depositing');
      setResult(null);
    }
  };

  const onWithdraw = async (e) => {
    e.preventDefault();
    setValidated((v) => ({ ...v, amount: true }));
    const numTrimmed = String(number || '').trim();
    const numValid = /^[0-9A-Za-z_-]+$/.test(numTrimmed);
    const amountNum = Number(amount);
    if (!numTrimmed || !numValid || !isFinite(amountNum) || amountNum <= 0) {
      setError('Provide a valid account number and a positive amount');
      setResult(null);
      return;
    }
    try {
      const { data } = await withdraw({ number, amount });
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Error withdrawing');
      setResult(null);
    }
  };

  const onClose = async (e) => {
    e.preventDefault();
    const targetNumber = closeNumber || number;
    setValidated((v) => ({ ...v, close: true }));
    const numTrimmed = String(targetNumber || '').trim();
    const numValid = /^[0-9A-Za-z_-]+$/.test(numTrimmed);
    if (!numTrimmed || !numValid) {
      setError('Provide a valid account number');
      setResult(null);
      return;
    }
    if (!targetNumber) return;
    const confirmClose = window.confirm(`Close account #${targetNumber}? This action cannot be undone.`);
    if (!confirmClose) return;
    try {
      const { data } = await closeAccount(targetNumber);
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Error closing account');
      setResult(null);
    }
  };

  return (
    <div>
      <h2>Account Operations</h2>

      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Title>Create Account</Card.Title>
          <Form onSubmit={onCreate}>
            <Row className="g-3">
              <Col md={6}>
                <FloatingLabel controlId="customerId" label="Customer ID">
                  <Form.Control
                    type="text"
                    placeholder="Customer ID"
                    value={createForm.customerId}
                    onChange={(e) => setCreateForm({ ...createForm, customerId: e.target.value })}
                    required
                    isInvalid={validated.create && !String(createForm.customerId || '').trim()}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid customer ID like CUST-2025-000001.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="accountType" label="Account Type">
                  <Form.Select
                    value={createForm.type}
                    onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                    required
                    isInvalid={validated.create && !String(createForm.type || '').trim()}
                  >
                    <option value="SAVINGS">SAVINGS</option>
                    <option value="CURRENT">CURRENT</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Select an account type.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <div className="mt-3">
              <Button type="submit">Create</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Title>Inquire / Deposit / Withdraw / Close</Card.Title>
          <Form className="mb-3" noValidate validated={validated.inquire} onSubmit={onInquire}>
            <Row className="g-3 align-items-end">
              <Col md={6}>
                <FloatingLabel controlId="accountNumber" label="Account Number">
                  <Form.Control
                    type="text"
                    placeholder="ACCT1001"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                    pattern="[0-9A-Za-z_-]+"
                    isInvalid={validated.inquire && (!String(number || '').trim() || !/^[0-9A-Za-z_-]+$/.test(String(number || '').trim()))}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid account number.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md="auto">
                <Button type="submit" className="me-2">Inquire</Button>
              </Col>
            </Row>
          </Form>
          <Form className="mb-2" noValidate validated={validated.amount} onSubmit={onDeposit}>
            <Row className="g-3 align-items-end">
              <Col md={6}>
                <FloatingLabel controlId="amount" label="Amount">
                  <Form.Control
                    type="number"
                    placeholder="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="0.01"
                    step="0.01"
                    isInvalid={validated.amount && (!(Number(amount) > 0))}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a positive amount.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md="auto">
                <Button type="submit" className="me-2">Deposit</Button>
                <Button variant="warning" onClick={onWithdraw}>Withdraw</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Title>Close Account</Card.Title>
          <Form noValidate validated={validated.close} onSubmit={onClose}>
            <Row className="g-3 align-items-end">
              <Col md={6}>
                <FloatingLabel controlId="closeAccountNumber" label="Account Number">
                  <Form.Control
                    type="text"
                    placeholder="ACCT1001"
                    value={closeNumber}
                    onChange={(e) => setCloseNumber(e.target.value)}
                    required
                    pattern="[0-9A-Za-z_-]+"
                    isInvalid={validated.close && (!String(closeNumber || '').trim() || !/^[0-9A-Za-z_-]+$/.test(String(closeNumber || '').trim()))}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid account number.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md="auto">
                <Button variant="secondary" type="submit">Close</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {result && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Result</Card.Title>
            <pre className="mb-0">{JSON.stringify(result, null, 2)}</pre>
          </Card.Body>
        </Card>
      )}
      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
    </div>
  );
}

export default Account;


