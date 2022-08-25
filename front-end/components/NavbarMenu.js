import Link from 'next/link'
import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { AuthContext } from '../context/AuthContext'

const NavbarMenu = () => {
	const {
		authState: { user, isAuthenticated },
		logoutUser,
	} = useContext(AuthContext)
	const logout = () => logoutUser()

	return (
		<Navbar bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand href='#home'>Spring boot tutorial</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Link href='/' passHref>
							<Nav.Link>Home</Nav.Link>
						</Link>
						{/* <Nav.Link href='#link'>Link</Nav.Link> */}
						<Link href='/dashboard' passHref>
							<Nav.Link>Dashboard</Nav.Link>
						</Link>
					</Nav>
				</Navbar.Collapse>
				{isAuthenticated && (
					<Navbar.Collapse className='justify-content-end'>
						<Navbar.Text>Welcome {user} </Navbar.Text>
					</Navbar.Collapse>
				)}
				<Navbar.Collapse>
					<Nav className='me-auto'>
						{isAuthenticated ? (
							<Link href='/login' passHref>
								<Nav.Link onClick={logout}>Logout</Nav.Link>
							</Link>
						) : (
							<>
								<Link href='/login' passHref>
									<Nav.Link>Login</Nav.Link>
								</Link>
								<Link href='/register' passHref>
									<Nav.Link>Register</Nav.Link>
								</Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default NavbarMenu
