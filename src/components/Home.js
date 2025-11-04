import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="py-5 bg-dark text-light rounded-3 mb-4" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 40%, #020e28 100%)' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={7} className="mb-4 mb-md-0">
              <h1 className="display-5 fw-bold">Welcome to Your Banking Hub</h1>
              <p className="lead opacity-75 mb-4">Securely manage customers and accounts, track transactions, and act with confidence.</p>
              <div className="d-flex gap-2">
                <Button as={Link} to="/create" variant="light">Create Customer</Button>
                <Button as={Link} to="/accounts" variant="outline-light">Open Account</Button>
              </div>
            </Col>
            <Col md={5}>
              <Card bg="transparent" text="light" className="border-0">
                <Card.Body className="p-4 rounded-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="d-flex align-items-center mb-3">
                    <Badge bg="success" className="me-2">Live</Badge>
                    <div className="small opacity-75">Instant authentication & secure APIs</div>
                  </div>
                  <div className="small opacity-75">Powered by JWT auth, RESTful endpoints, and a clean React UI. Start by creating a customer, then manage accounts and view transaction history.</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Container>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Customer Management</Card.Title>
                <Card.Text>Create and inquire customers with a streamlined experience and instant feedback.</Card.Text>
                <Button as={Link} to="/create" variant="primary" size="sm">Create Customer</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Account Operations</Card.Title>
                <Card.Text>Open, deposit, withdraw, close, and inquire accounts with just a click.</Card.Text>
                <Button as={Link} to="/accounts" variant="primary" size="sm">Manage Accounts</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Transaction History</Card.Title>
                <Card.Text>View real-time transactions with clear details and running balances.</Card.Text>
                <Button as={Link} to="/history" variant="primary" size="sm">View History</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col md={8}>
                    <h5 className="mb-1">Built for reliability</h5>
                    <div className="text-muted">JWT-protected REST APIs • Robust error handling • Responsive UI</div>
                  </Col>
                  <Col md={4} className="text-md-end mt-3 mt-md-0">
                    <Button as={Link} to="/inquire" variant="outline-primary">Inquire Customer</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;


