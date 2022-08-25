import { useContext, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import AlertMessage from '../../components/AlertMessage'
import Link from 'next/link'
import axios from 'axios'
import { apiUrl } from '../constants'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/AuthContext'

const Register = () => {
	const routes = useRouter()
	// Context
	const { registerUser } = useContext(AuthContext)
	const refUsername = useRef()
	const [alert, setAlert] = useState(null)
	const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	})
	const { username, password, confirmPassword } = registerForm
	const onChangRegisterForm = (e) => {
		setRegisterForm({
			...registerForm,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmitRegister = async (e) => {
		e.preventDefault()
		try {
			validRegister()

			const response = await registerUser(registerForm)

			console.log(response)
			if (response.success) {
				setAlert({
					type: 'success',
					message: response.message,
				})
				setRegisterForm({
					username: '',
					password: '',
					confirmPassword: '',
				})
				refUsername.current.focus()
				setTimeout(() => {
					routes.push('/login')
				}, 1000)
			} else {
				setAlert({
					type: 'danger',
					message: response.message,
				})
				setRegisterForm({
					username: '',
					password: '',
					confirmPassword: '',
				})
				refUsername.current.focus()
				setTimeout(() => setAlert(null), 3000)
			}
		} catch (error) {
			// console.log(error.response.data)
			// if (!error.response.data.success) {
			// 	setAlert({
			// 		type: 'danger',
			// 		message: error.response.data.message,
			// 	})
			// 	setRegisterForm({
			// 		username: '',
			// 		password: '',
			// 		confirmPassword: '',
			// 	})
			// 	refUsername.current.focus()
			// 	setTimeout(() => setAlert(null), 3000)
			// }
			console.log(error)
		}
	}
	const validRegister = () => {
		if (username.length * password.length * confirmPassword.length === 0) {
			setAlert({
				type: 'danger',
				message: 'Mission username or password',
			})
			setTimeout(() => setAlert(null), 3000)
			return false
		}
		if (password !== confirmPassword) {
			setAlert({
				type: 'danger',
				message: 'Passwords do not match',
			})
			setTimeout(() => setAlert(null), 3000)
			return false
		}
	}

	return (
		<Layout>
			<h1>Register</h1>
			<Form onSubmit={onSubmitRegister}>
				<AlertMessage alertInfo={alert} />
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control
						ref={refUsername}
						type='text'
						placeholder='Username'
						name='username'
						required
						onChange={onChangRegisterForm}
						value={username}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						onChange={onChangRegisterForm}
						value={password}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						required
						onChange={onChangRegisterForm}
						value={confirmPassword}
					/>
				</Form.Group>

				<Link href='/login'>
					<Button variant='info' className='ml-2'>
						Back
					</Button>
				</Link>
				<Button
					variant='primary'
					type='submit'
					style={{ marginLeft: '100px' }}
				>
					Register
				</Button>
			</Form>
		</Layout>
	)
}

export default Register
