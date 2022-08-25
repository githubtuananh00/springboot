import Link from 'next/link'
import { memo, useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { StudentContext } from '../../context/StudentContext'
import Button from 'react-bootstrap/Button'
import AlertMessage from '../../components/AlertMessage'
import { useRouter } from 'next/router'
import Pagination from 'react-bootstrap/Pagination'

const TableCustomer = ({ dataSearch, limitId }) => {
	const { getAllStudent, deleteStudent } = useContext(StudentContext)

	const [alert, setAlert] = useState(null)

	const [props, setProps] = useState([])
	// console.log(props)

	const router = useRouter()
	// if (dataSearch !== null) {
	useEffect(() => {
		getAllStudent().then((students) => {
			// 		listData=student

			if (students.success) {
				return setProps(students.data)
			}
		})
	}, [])

	// } else {
	// 	return setProps(dataSearch)
	// }

	const onClickDelete = async (id) => {
		try {
			const response = await deleteStudent(id)
			if (response.success) {
				setAlert({ type: 'info', message: response.message })
				router.reload()
				setTimeout(() => {
					setAlert(null)
				}, 3000)
			}
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}
	const length = Math.ceil(props.length / 3)
	const loadData = (data) => {
		return data.map((student, index) => (
			<tr key={student.student_id}>
				<td>{index + 1}</td>
				<td>{student.studentCode}</td>
				<td>{student.studentName}</td>
				<td>{student.dateOfBirth}</td>
				<td>{student.studentAddress}</td>
				<td>{student.averageScore}</td>

				<td style={{ cursor: 'pointer' }}>
					<Link href={`/RegisterUpdate/${student.infoId}`}>Edit</Link>{' '}
					-{' '}
					{/* <Link href={`Delete/${student.infoId}`}>
								Delete
							</Link> */}
					<Button onClick={() => onClickDelete(student.infoId)}>
						Delete
					</Button>
				</td>
			</tr>
		))
	}
	const loadDataLimit = (data, limit) => {
		return data.slice(limit * 3 - 3, limit * 3).map((student, index) => (
			<tr key={student.student_id}>
				<td>{index + 3 * limit - 2}</td>
				<td>{student.studentCode}</td>
				<td>{student.studentName}</td>
				<td>{student.dateOfBirth}</td>
				<td>{student.studentAddress}</td>
				<td>{student.averageScore}</td>

				<td style={{ cursor: 'pointer' }}>
					<Link href={`/RegisterUpdate/${student.infoId}`}>Edit</Link>{' '}
					-{' '}
					{/* <Link href={`Delete/${student.infoId}`}>
								Delete
							</Link> */}
					<Button onClick={() => onClickDelete(student.infoId)}>
						Delete
					</Button>
				</td>
			</tr>
		))
	}
	const onClickPagination = (event) => {
		const limit = event.target.text
		// return loadData(props, limit)
		router.push(`/dashboard/${limit}`)
		// console.log(limit)
	}

	return (
		<>
			<AlertMessage alertInfo={alert} />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>No</th>
						<th>Code</th>
						<th>Name</th>
						<th>Birthday</th>
						<th>Address</th>
						<th>Score</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{dataSearch
						? loadData(dataSearch)
						: loadDataLimit(props, limitId)}
				</tbody>
			</Table>
			<br></br>
			<Pagination style={{ marginLeft: 'auto', marginRight: 'auto' }}>
				<Pagination.First />
				<Pagination.Prev />
				<Pagination.Ellipsis />
				{props.slice(0, length).map((_, index) => (
					<Pagination.Item
						key={_.student_id}
						onClick={onClickPagination}
					>
						{index + 1}
					</Pagination.Item>
				))}

				{/* <Pagination.Item>{2}</Pagination.Item>
				<Pagination.Item>{3}</Pagination.Item> */}

				<Pagination.Ellipsis />
				<Pagination.Next />
				<Pagination.Last />
				{}
			</Pagination>
		</>
	)
}

export default memo(TableCustomer)
