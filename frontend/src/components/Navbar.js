import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../UserContext';
import { useNavigate, Link } from "react-router-dom";

export default function MyNavbar() {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

 

  const handleLogOut = async () => {
    await setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow">
      <Container>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Navbar.Brand style={{ fontSize: '2em', textShadow: "0, 0, 10px, #fff", color: '#0d6efd' }}>PMS</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        {
          user && (user.role === "MO" || user.role === "Hospital_O") && (
            <Link to='/allocation' className='text-dark' style={{ textDecoration: 'none', }}>
              <Nav.Link href="/allocation" style={{ fontSize: '1.4em', fontWeight: 400 }}>Allocation</Nav.Link>
            </Link>
          )
        }
        {
          user && (user.role === "Hospital_O") && (
            <Link to='/' className='text-dark mx-4' style={{ textDecoration: 'none', }}>
              <Nav.Link href="/" style={{ fontSize: '1.4em', fontWeight: 400 }}>Update Staff</Nav.Link>
            </Link>
          )
        }
        {
          user && (user.role === "Admin") && (
            <Link to='/addhospital' className='text-dark' style={{ textDecoration: 'none', }}>
              <Nav.Link href="/addhospital" style={{ fontSize: '1em', fontWeight: 400 }}>Add Hospital</Nav.Link>
            </Link>
          )
        }
        {
          user && (user.role === "Admin") && (
            <Link to='/addlab' className='text-dark mx-4' style={{ textDecoration: 'none', }}>
              <Nav.Link href="/addlab" style={{ fontSize: '1em', fontWeight: 400 }}>Add Laboratory</Nav.Link>
            </Link>
          )
        }
        {
          user && (user.role === "Admin") && (
            <Link to='/addmedical' className='text-dark' style={{ textDecoration: 'none', }}>
              <Nav.Link href="/addmedical" style={{ fontSize: '1em', fontWeight: 400 }}>Add Medical Store</Nav.Link>
            </Link>
          )
        }
        {
          user && (user.role === "Chemist") && (
            <Link to='/' className='text-dark' style={{ textDecoration: 'none', }}>
              <Nav.Link href="/" style={{ fontSize: '1em', fontWeight: 400 }}>Update Stock</Nav.Link>
            </Link>
          )
        }
        {
          user && (user.role === "Lab_O") && (
            <Link to='/' className='text-dark' style={{ textDecoration: 'none', }}>
              <Nav.Link href="/" style={{ fontSize: '1em', fontWeight: 400 }}>Update Samples</Nav.Link>
            </Link>
          )
        }
        <Navbar.Collapse className="justify-content-end">
          {
            user && (
              <Link className='btn btn-sm btn-dark'>
                <Nav.Link style={{ fontSize: '1.2em', fontWeight: 400 }} onClick={() => handleLogOut()}>LogOut</Nav.Link>
              </Link>
            )
          }
          {
            !user && (
              <Link to="/login" className='btn btn-sm btn-dark' style={{ textDecoration: 'none', fontSize: '1.2em', fontWeight: 400 }}> <Nav.Link href={'/login'}>Login</Nav.Link></Link>
            )
          }
          <Navbar.Text>

          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}