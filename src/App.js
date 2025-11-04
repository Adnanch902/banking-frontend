import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateCustomer from './components/CreateCustomer';
import InquireCustomer from './components/InquireCustomer';
import Account from './components/Account';
import AccountHistory from './components/AccountHistory';
import Home from './components/Home';
import CustomersWithAccounts from './components/CustomersWithAccounts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Banking App</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/create">Create Customer</Nav.Link>
              <Nav.Link as={Link} to="/inquire">Inquire Customer</Nav.Link>
              <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
              <Nav.Link as={Link} to="/accounts">Accounts</Nav.Link>
              <Nav.Link as={Link} to="/history">Account History</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="pb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCustomer />} />
          <Route path="/inquire" element={<InquireCustomer />} />
          <Route path="/customers" element={<CustomersWithAccounts />} />
          <Route path="/accounts" element={<Account />} />
          <Route path="/history" element={<AccountHistory />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;