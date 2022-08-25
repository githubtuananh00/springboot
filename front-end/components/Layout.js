import Container from 'react-bootstrap/Container'
import NavbarMenu from './NavbarMenu'
import Head from 'next/head'

const Layout = ({ children }) => {
	return (
		<>
			<Container>
				<Head>
					<title>Spring boot tutorial</title>
				</Head>
				<NavbarMenu />

				<main className='w-100 mx-auto'>{children}</main>

				<br></br>
			</Container>
		</>
	)
}

export default Layout
