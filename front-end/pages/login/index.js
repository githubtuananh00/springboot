import { useContext, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Layout from '../../components/Layout'

import AlertMessage from '../../components/AlertMessage'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
	// Context
	const { loginUser } = useContext(AuthContext)
	const usernameInput = useRef()
	const router = useRouter()
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: '',
	})
	const [alert, setAlert] = useState(null)
	const { username, password } = loginForm
	const onChangeLoginForm = (e) =>
		setLoginForm({
			...loginForm,
			[e.target.name]: e.target.value,
		})

	const onSubmitLogin = async (e) => {
		e.preventDefault()
		try {
			const response = await loginUser(loginForm)

			console.log(response)
			if (response.success) {
				router.push('/dashboard')
				setLoginForm({ username: '', password: '' })
				usernameInput.current.focus()
			} else {
				setAlert({
					type: 'danger',
					message: response.message,
				})
				setLoginForm({ username: '', password: '' })
				usernameInput.current.focus()
				setTimeout(() => setAlert(null), 3000)
			}
		} catch (error) {
			console.log(error)
			// if (!error.response.data.success) {
			// 	setAlert({
			// 		type: 'danger',
			// 		message: error.response.data.message,
			// 	})
			// 	setLoginForm({ username: '', password: '' })
			// 	usernameInput.current.focus()
			// 	setTimeout(() => setAlert(null), 3000)
			// }
		}
	}

	return (
		<Layout>
			<h1>Login</h1>
			<Form onSubmit={onSubmitLogin}>
				<AlertMessage alertInfo={alert} />
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control
						ref={usernameInput}
						type='text'
						placeholder='Username'
						name='username'
						required
						onChange={onChangeLoginForm}
						value={username}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						onChange={onChangeLoginForm}
						value={password}
					/>
				</Form.Group>

				<Button variant='primary' type='submit'>
					Login
				</Button>
				<Link href='/register'>
					<Button
						variant='info'
						className='ml-2'
						style={{ marginLeft: '100px' }}
					>
						Register
					</Button>
				</Link>
			</Form>
		</Layout>
	)
}

export default Login
