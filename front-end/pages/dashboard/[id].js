import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import TableCustomer from './TableCustomer'
import Link from 'next/link'
import { StudentContext } from '../../context/StudentContext'
import AlertMessage from '../../components/AlertMessage'
import { AuthContext } from '../../context/AuthContext'

const DashboardId = () => {
	const {
		authState: { isAuthenticated, authLoading },
	} = useContext(AuthContext)
	const { searchFormStudent, getAllStudent } = useContext(StudentContext)
	const router = useRouter()
	const { id } = router.query

	const [alert, setAlert] = useState(null)
	const searchRef = useRef()

	useEffect(() => {
		isAuthenticated
			? router.push(`/dashboard/${id}`)
			: router.push('/login')
	}, [])
	const [searchForm, setSearchForm] = useState({
		studentCode: '',
		studentName: '',
		dateOfBirth: '',
	})
	const { studentName, studentCode, dateOfBirth } = searchForm

	const onChangeForm = (event) => {
		// event.preventDefault()
		setSearchForm({
			...searchForm,
			[event.target.name]: event.target.value,
		})
	}
	const [dataSearch, setDataSearch] = useState(null)
	const onSubmitForm = async (event) => {
		event.preventDefault()
		try {
			let data = {
				...searchForm,
			}
			if (!studentName) data = { ...data, studentName: null }
			if (!studentCode) data = { ...data, studentCode: null }
			if (!dateOfBirth) data = { ...data, dateOfBirth: null }

			if (
				data.dateOfBirth === null &&
				data.studentCode === null &&
				data.studentName === null
			) {
				const response = await getAllStudent()
				if (response.success) {
					setDataSearch(response.data)
				}
				// console.log(response.data)
			} else {
				const response = await searchFormStudent(data)
				console.log(response)

				if (response.success) {
					if (response.data.length === 0) {
						setAlert({
							type: 'danger',
							message: 'Cannot find Student',
						})
						defaultForm()
					} else {
						setAlert({
							type: 'info',
							message: response.message,
						})
						defaultForm()
						setDataSearch(response.data)
						// console.log(response.data.length)
					}
				}
			}
		} catch (error) {
			console.log(error)
		}
	}
	const defaultForm = () => {
		setSearchForm({
			studentCode: '',
			studentName: '',
			dateOfBirth: '',
		})
		setTimeout(() => {
			setAlert(null)
		}, 3000)
		searchRef.current.focus()
	}
	if (!isAuthenticated && authLoading)
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)

	return (
		<Layout>
			<br></br>
			<Form onSubmit={onSubmitForm}>
				<AlertMessage alertInfo={alert} />
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Student Code'
						name='studentCode'
						onChange={onChangeForm}
						value={studentCode}
						ref={searchRef}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Student Name'
						style={{
							width: '80%',
							display: 'inline',
							marginRight: '20px',
						}}
						onChange={onChangeForm}
						value={studentName}
						name='studentName'
					/>
					<Button variant='primary' type='submit'>
						Search
					</Button>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='date'
						placeholder='Birth Day'
						style={{
							width: '80%',
							display: 'inline',
							marginRight: '20px',
						}}
						onChange={onChangeForm}
						value={dateOfBirth}
						name='dateOfBirth'
					/>
					<Link href='/RegisterUpdate'>
						<Button>Add Student</Button>
					</Link>
				</Form.Group>
			</Form>
			<TableCustomer dataSearch={dataSearch} limitId={id} />
		</Layout>
	)
}

export default DashboardId
