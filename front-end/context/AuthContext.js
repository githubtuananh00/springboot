import axios from 'axios'
import { createContext, useEffect, useReducer } from 'react'
import { LOCAL_STORAGE_TOKEN_NAME } from '../constant'
import { apiUrl } from '../pages/constants'
import { authReducer } from '../reducers/authReducers'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		isAuthenticated: false,
		authLoading: true,
		user: null,
	})

	// Authenticate user
	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}

		try {
			const response = await axios.get(`${apiUrl}/api/auth`)
			// console.log(response)
			if (response.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: {
						isAuthenticated: true,
						user: response.data.data,
					},
				})
			}
		} catch (error) {
			console.log(error)
			// localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			// setAuthToken(null)
			// dispatch({
			// 	type: 'SET_AUTH',
			// 	payload: { isAuthenticated: false, user: null },
			// })
		}
	}

	useEffect(() => {
		loadUser()
	}, [])

	// Login
	const loginUser = async (userForm) => {
		try {
			const response = await axios.post(`${apiUrl}/api/login`, userForm)

			console.log(response)
			if (response.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.data.jwt
				)
				// router.push('/dashboard')
				// setLoginForm({ username: '', password: '' })
				// usernameInput.current.focus()
			}
			await loadUser()
			return response.data
		} catch (error) {
			// console.log(error.response.data)
			// if (!error.response.data.success) {
			// 	// setAlert({
			// 	// 	type: 'danger',
			// 	// 	message: error.response.data.message,
			// 	// })
			// 	// setLoginForm({ username: '', password: '' })
			// 	// usernameInput.current.focus()
			// 	// setTimeout(() => setAlert(null), 3000)
			// }
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
			// console.log(error)
		}
	}

	// Register
	const registerUser = async (userForm) => {
		try {
			const response = await axios.post(
				`${apiUrl}/api/register`,
				userForm
			)

			// console.log(response)
			// if (response.data.success) {
			// 	setAlert({
			// 		type: 'success',
			// 		message: response.data.message,
			// 	})
			// 	setRegisterForm({
			// 		username: '',
			// 		password: '',
			// 		confirmPassword: '',
			// 	})
			// 	refUsername.current.focus()
			// 	setTimeout(() => {
			// 		routes.push('/login')
			// 	}, 1000)
			// }

			return response.data
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
			// console.log(error)
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	// Logout
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null },
		})
	}
	// d

	// Context data
	const authContextData = { loginUser, registerUser, logoutUser, authState }

	// Return provider
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
