import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateCustomer from './components/CreateCustomer';
import InquireCustomer from './components/InquireCustomer';
import Account from './components/Account';
import AccountHistory from './components/AccountHistory';
import Home from './components/Home';
import CustomersWithAccounts from './components/CustomersWithAccounts';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/ToastContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" role="navigation" aria-label="Main navigation">
            <Container>
              <Navbar.Brand as={Link} to="/" aria-label="Banking App Home">Banking App</Navbar.Brand>
              <Navbar.Toggle aria-controls="main-nav" aria-label="Toggle navigation" />
              <Navbar.Collapse id="main-nav">
                <Nav className="me-auto" role="menubar">
                  <Nav.Link as={Link} to="/create" role="menuitem">Create Customer</Nav.Link>
                  <Nav.Link as={Link} to="/inquire" role="menuitem">Inquire Customer</Nav.Link>
                  <Nav.Link as={Link} to="/customers" role="menuitem">Customers</Nav.Link>
                  <Nav.Link as={Link} to="/accounts" role="menuitem">Accounts</Nav.Link>
                  <Nav.Link as={Link} to="/history" role="menuitem">Account History</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <main role="main">
            <Container className="pb-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateCustomer />} />
                <Route path="/inquire" element={<InquireCustomer />} />
                <Route path="/customers" element={<CustomersWithAccounts />} />
                <Route path="/accounts" element={<Account />} />
                <Route path="/history" element={<AccountHistory />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </main>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;