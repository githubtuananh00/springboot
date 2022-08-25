import React, { useContext, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Link from 'next/link'
import { StudentContext } from '../../context/StudentContext'
import AlertMessage from '../../components/AlertMessage'

const RegUpd = () => {
	const { saveStudent, saveStudentInfo } = useContext(StudentContext)
	const [alert, setAlert] = useState(null)
	const studentNameRef = useRef()
	const [regUpdForm, setregUpdForm] = useState({
		dateOfBirth: '',
		averageScore: '',
		studentAddress: '',
	})
	const [student, setStudent] = useState({
		student_id: '',
		studentName: '',
		studentCode: '',
	})
	const { dateOfBirth, averageScore, studentAddress } = regUpdForm
	const { studentName } = student
	const onChangeForm = (event) => {
		setregUpdForm({
			...regUpdForm,
			[event.target.name]: event.target.value,
		})
	}
	const onChangeFormStudent = (event) => {
		setStudent({
			...student,
			studentName: event.target.value,
		})
	}

	const onSubmitFormAddStudent = async (event) => {
		event.preventDefault()
		try {
			const response = await saveStudent({ studentName })
			console.log(response)
			if (response.success) {
				setStudent({
					...response.data,
				})
				setAlert({ type: 'info', message: response.message })
				setTimeout(() => {
					setAlert(null)
				}, 3000)
			}
		} catch (error) {}
	}

	const onSubmitFormAll = async (event) => {
		event.preventDefault()
		try {
			const data = {
				student,
				...regUpdForm,
			}
			const response = await saveStudentInfo(data)
			console.log(response)
			if (response.success) {
				setAlert({
					type: 'info',
					message: response.message,
				})
				setTimeout(() => setAlert(null), 3000)
				valid()
				studentNameRef.current.focus()
			} else {
				setAlert({
					type: 'danger',
					message: response.message,
				})
				setTimeout(() => setAlert(null), 3000)
				valid()
			}
		} catch (error) {
			console.log(error)
		}
	}
	const valid = () => {
		setStudent({
			student_id: '',
			studentName: '',
			studentCode: '',
		})
		setregUpdForm({
			dateOfBirth: '',
			averageScore: '',
			studentAddress: '',
		})
		studentNameRef.current.focus()
	}

	// console.log(new ObjectId(date.toString(16) + 1e16))
	return (
		<Layout>
			<br></br>
			<h1>Student</h1>
			<Form onSubmit={onSubmitFormAddStudent}>
				<AlertMessage alertInfo={alert} />
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Student Code'
						style={{
							width: '80%',
							display: 'inline',
							marginRight: '20px',
						}}
						value={student.studentCode}
						disabled
						required
					/>
					<Button variant='primary' type='submit'>
						Generate Code
					</Button>
				</Form.Group>
			</Form>
			<Form onSubmit={onSubmitFormAll}>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Student Name'
						name='studentName'
						onChange={onChangeFormStudent}
						value={studentName}
						required
						ref={studentNameRef}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='date'
						placeholder='Birthday'
						name='dateOfBirth'
						onChange={onChangeForm}
						value={dateOfBirth}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Address'
						name='studentAddress'
						onChange={onChangeForm}
						value={studentAddress}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Average Score'
						name='averageScore'
						onChange={onChangeForm}
						value={averageScore}
						required
					/>
				</Form.Group>

				<Link href='/dashboard'>
					<Button variant='primary'>Back</Button>
				</Link>
				<Button variant='primary' type='submit'>
					Save
				</Button>
			</Form>
		</Layout>
	)
}

export default RegUpd
