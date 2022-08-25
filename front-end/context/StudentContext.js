import axios from 'axios'
import { createContext, useEffect, useReducer } from 'react'

import { apiUrl } from '../pages/constants'

export const StudentContext = createContext()
const StudentContextProvider = ({ children }) => {
	// const [StudentState, dispatch] = useReducer(StudentReducer, {
	// 	isStudententicated: false,
	// 	StudentLoading: true,
	// 	user: null,
	// })

	const getAllStudent = async () => {
		try {
			const response = await axios.get(`${apiUrl}/student/all`)
			// console.log(response)
			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}
	const saveStudent = async (data) => {
		try {
			const response = await axios.post(
				`${apiUrl}/student/addStudent`,
				data
			)
			// console.log(response.data)
			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	const saveStudentInfo = async (data) => {
		try {
			const response = await axios.post(
				`${apiUrl}/student/addStudentInfo`,
				data
			)
			// console.log(response)
			if (response.data.success) return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}
	const updateStudent = async (id, data) => {
		try {
			const response = await axios.put(`${apiUrl}/student/${id}`, data)
			// console.log(response)
			return response.data
		} catch (error) {
			console.log(response)
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}
	const getAStudent = async (id) => {
		try {
			const response = await axios.get(`${apiUrl}/student/${id}`)

			if (response.data.success) return response.data.data
		} catch (error) {
			console.log(error)
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}
	const deleteStudent = async (id) => {
		try {
			const response = await axios.delete(
				`${apiUrl}/student/delete/${id}`
			)
			console.log(response)
			return response.data
		} catch (error) {
			console.log(error)
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}
	const searchFormStudent = async (data) => {
		try {
			const response = await axios.post(`${apiUrl}/student/search`, data)
			// console.log(response)
			return response.data
		} catch (error) {
			console.log(error)
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	// Context data
	const StudentContextData = {
		getAllStudent,
		saveStudent,
		saveStudentInfo,
		updateStudent,
		getAStudent,
		deleteStudent,
		searchFormStudent,
	}

	// Return provider
	return (
		<StudentContext.Provider value={StudentContextData}>
			{children}
		</StudentContext.Provider>
	)
}

export default StudentContextProvider
