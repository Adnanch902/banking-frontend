import React, { useState } from 'react';
import { Form, Button, Alert, Card, FloatingLabel, Row, Col } from 'react-bootstrap';
import { createAccount, inquireAccount, deposit, withdraw, closeAccount } from '../services/customerApi';
import { isValidAccountNumber, isValidAmount, sanitizeString, isRequired } from '../utils/validation';
import { getErrorMessage } from '../utils/errorHandler';
import { ERROR_MESSAGES, ACCOUNT_TYPES, DEFAULTS } from '../constants';

function Account() {
  const [createForm, setCreateForm] = useState({ customerId: '', type: DEFAULTS.ACCOUNT_TYPE });
  const [number, setNumber] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [closeNumber, setCloseNumber] = useState('');
  const [validated, setValidated] = useState({ create: false, inquire: false, deposit: false, withdraw: false, close: false });
  const [loading, setLoading] = useState({ create: false, inquire: false, deposit: false, withdraw: false, close: false });

  const onCreate = async (e) => {
    e.preventDefault();
    setValidated((v) => ({ ...v, create: true }));
    const idTrimmed = sanitizeString(createForm.customerId);
    const typeTrimmed = sanitizeString(createForm.type);
    if (!isRequired(idTrimmed) || !isRequired(typeTrimmed)) {
      setError('Provide Customer ID and Account Type');
      setResult(null);
      return;
    }
    try {
      setLoading((l) => ({ ...l, create: true }));
      setError(null);
      const { data } = await createAccount({ customerId: idTrimmed, type: createForm.type });
      setResult(data);
      setCreateForm({ customerId: '', type: DEFAULTS.ACCOUNT_TYPE });
      setValidated((v) => ({ ...v, create: false }));
    } catch (err) {
      setError(getErrorMessage(err) || ERROR_MESSAGES.CREATE_ACCOUNT_ERROR);
      setResult(null);
    } finally {
      setLoading((l) => ({ ...l, create: false }));
    }
  };

  const onInquire = async (e) => {
    e.preventDefault();
    setValidated((v) => ({ ...v, inquire: true }));
    const numTrimmed = sanitizeString(number);
    if (!isValidAccountNumber(numTrimmed)) {
      setError(ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
      setResult(null);
      return;
    }
    try {
      setLoading((l) => ({ ...l, inquire: true }));
      setError(null);
      const { data } = await inquireAccount(number);
      setResult(data);
    } catch (err) {
      setError(getErrorMessage(err) || ERROR_MESSAGES.INQUIRE_ACCOUNT_ERROR);
      setResult(null);
    } finally {
      setLoading((l) => ({ ...l, inquire: false }));
    }
  };

  const onDeposit = async (e) => {
    e.preventDefault();
    setValidated((v) => ({ ...v, deposit: true }));
    const numTrimmed = sanitizeString(number);
    const amountNum = Number(depositAmount);
    if (!isValidAccountNumber(numTrimmed) || !isValidAmount(amountNum)) {
      setError('Provide a valid account number and a positive amount');
      setResult(null);
      return;
    }
    try {
      setLoading((l) => ({ ...l, deposit: true }));
      setError(null);
      const { data } = await deposit({ number, amount: depositAmount });
      setResult(data);
      setDepositAmount('');
      setValidated((v) => ({ ...v, deposit: false }));
    } catch (err) {
      setError(getErrorMessage(err) || ERROR_MESSAGES.DEPOSIT_ERROR);
      setResult(null);
    } finally {
      setLoading((l) => ({ ...l, deposit: false }));
    }
  };

  const onWithdraw = async (e) => {
    e.preventDefault();
    setValidated((v) => ({ ...v, withdraw: true }));
    const numTrimmed = sanitizeString(number);
    const amountNum = Number(withdrawAmount);
    if (!isValidAccountNumber(numTrimmed) || !isValidAmount(amountNum)) {
      setError('Provide a valid account number and a positive amount');
      setResult(null);
      return;
    }
    try {
      setLoading((l) => ({ ...l, withdraw: true }));
      setError(null);
      const { data } = await withdraw({ number, amount: withdrawAmount });
      setResult(data);
      setWithdrawAmount('');
      setValidated((v) => ({ ...v, withdraw: false }));
    } catch (err) {
      setError(getErrorMessage(err) || ERROR_MESSAGES.WITHDRAW_ERROR);
      setResult(null);
    } finally {
      setLoading((l) => ({ ...l, withdraw: false }));
    }
  };

  const onClose = async (e) => {
    e.preventDefault();
    const targetNumber = closeNumber || number;
    setValidated((v) => ({ ...v, close: true }));
    const numTrimmed = sanitizeString(targetNumber);
    if (!isValidAccountNumber(numTrimmed)) {
      setError(ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
      setResult(null);
      return;
    }
    // Confirmation dialog to prevent accidental account closure
    const confirmClose = window.confirm(`Are you sure you want to close account ${targetNumber}? This action cannot be undone.`);
    if (!confirmClose) {
      setValidated((v) => ({ ...v, close: false }));
      return;
    }
    try {
      setLoading((l) => ({ ...l, close: true }));
      setError(null);
      const { data } = await closeAccount(targetNumber);
      setResult(data);
      setCloseNumber('');
      setNumber('');
    } catch (err) {
      setError(getErrorMessage(err) || ERROR_MESSAGES.CLOSE_ACCOUNT_ERROR);
      setResult(null);
    } finally {
      setLoading((l) => ({ ...l, close: false }));
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
                    isInvalid={validated.create && !isRequired(sanitizeString(createForm.customerId))}
                    disabled={loading.create}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid customer ID.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="accountType" label="Account Type">
                  <Form.Select
                    value={createForm.type}
                    onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                    required
                    disabled={loading.create}
                  >
                    <option value={ACCOUNT_TYPES.SAVINGS}>{ACCOUNT_TYPES.SAVINGS}</option>
                    <option value={ACCOUNT_TYPES.CURRENT}>{ACCOUNT_TYPES.CURRENT}</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <div className="mt-3">
              <Button type="submit" disabled={loading.create}>
                {loading.create ? 'Creating...' : 'Create'}
              </Button>
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
                    placeholder="MAY-001-20-00000001"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                    isInvalid={validated.inquire && !isValidAccountNumber(sanitizeString(number))}
                    disabled={loading.inquire}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid account number.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md="auto">
                <Button type="submit" disabled={loading.inquire}>
                  {loading.inquire ? 'Inquiring...' : 'Inquire'}
                </Button>
              </Col>
            </Row>
          </Form>
          <Form className="mb-3" noValidate validated={validated.deposit} onSubmit={onDeposit}>
            <Row className="g-3 align-items-end">
              <Col md={4}>
                <FloatingLabel controlId="depositAccountNumber" label="Account Number">
                  <Form.Control
                    type="text"
                    placeholder="Account Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                    disabled={loading.deposit}
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="depositAmount" label="Amount">
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                    isInvalid={validated.deposit && !isValidAmount(Number(depositAmount))}
                    disabled={loading.deposit}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid positive amount.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md="auto">
                <Button type="submit" variant="success" disabled={loading.deposit}>
                  {loading.deposit ? 'Depositing...' : 'Deposit'}
                </Button>
              </Col>
            </Row>
          </Form>
          <Form className="mb-2" noValidate validated={validated.withdraw} onSubmit={onWithdraw}>
            <Row className="g-3 align-items-end">
              <Col md={4}>
                <FloatingLabel controlId="withdrawAccountNumber" label="Account Number">
                  <Form.Control
                    type="text"
                    placeholder="Account Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                    disabled={loading.withdraw}
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="withdrawAmount" label="Amount">
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    required
                    isInvalid={validated.withdraw && !isValidAmount(Number(withdrawAmount))}
                    disabled={loading.withdraw}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid positive amount.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md="auto">
                <Button type="submit" variant="warning" disabled={loading.withdraw}>
                  {loading.withdraw ? 'Withdrawing...' : 'Withdraw'}
                </Button>
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
                    placeholder="MAY-001-20-00000001"
                    value={closeNumber}
                    onChange={(e) => setCloseNumber(e.target.value)}
                    required
                    isInvalid={validated.close && !isValidAccountNumber(sanitizeString(closeNumber))}
                    disabled={loading.close}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid account number.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md="auto">
                <Button variant="secondary" type="submit" disabled={loading.close}>
                  {loading.close ? 'Closing...' : 'Close'}
                </Button>
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


