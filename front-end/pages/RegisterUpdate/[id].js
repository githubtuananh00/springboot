import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import AlertMessage from '../../components/AlertMessage'
import Layout from '../../components/Layout'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { StudentContext } from '../../context/StudentContext'
import { useRouter } from 'next/router'

const DetailStudent = () => {
	useEffect(() => {
		getAStudent(id).then((student) => setEditForm(student))
	}, [])

	const router = useRouter()
	const { id } = router.query

	const { updateStudent, getAStudent } = useContext(StudentContext)
	const [alert, setAlert] = useState(null)
	const studentNameRef = useRef()

	const onChangeForm = (event) => {
		setEditForm({
			...editForm,
			[event.target.name]: event.target.value,
		})
	}

	const valid = (message) => {
		setAlert({
			type: 'info',
			message: message,
		})
		setTimeout(() => setAlert(null), 3000)
		studentNameRef.current.focus()
		setEditForm({
			dateOfBirth: '',
			averageScore: '',
			studentAddress: '',
			studentName: '',
			student_id: '',
			studentCode: '',
		})
	}
	const [editForm, setEditForm] = useState({
		dateOfBirth: '',
		averageScore: '',
		studentAddress: '',
		studentName: '',
		student_id: '',
		studentCode: '',
	})
	const {
		dateOfBirth,
		averageScore,
		studentAddress,
		studentName,
		student_id,
		studentCode,
	} = editForm
	// getAStudent(id)
	const onSubmit = async (event) => {
		event.preventDefault()
		try {
			const response = await updateStudent(id, editForm)
			console.log(response)
			if (response.success) {
				valid(response.message)
				setTimeout(() => {
					router.back()
				}, 1000)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Layout>
			<br></br>
			<h1>Edit Student</h1>
			<Form onSubmit={onSubmit}>
				<AlertMessage alertInfo={alert} />
				<Form.Group className='mb-3'>
					<Form.Label>StudentId</Form.Label>
					<Form.Control
						type='text'
						placeholder='Student Id'
						value={student_id}
						disabled
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Student Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Student Code'
						value={studentCode}
						disabled
						required
					/>
				</Form.Group>
				{/* </Form>
			<br></br>
			<Form onSubmit={onSubmitFormAll}> */}
				<br></br>
				<Form.Group className='mb-3'>
					<Form.Label>Student Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Student Name'
						name='studentName'
						onChange={onChangeForm}
						value={studentName}
						required
						ref={studentNameRef}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>BirthDay</Form.Label>
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
					<Form.Label>Address</Form.Label>
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
					<Form.Label>Average Score</Form.Label>
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

export default DetailStudent

// export const getStaticProps = async ({ params }) => {
// 	const student1 = await getAStudent(params.id)
// 	return {
// 		props: {
// 			student1,
// 		},
// 		revalidate: 1, // khi phía db thay đổi dữ liệu thì bên phía font-end cũng dc rerender lại
// 	}
// }
