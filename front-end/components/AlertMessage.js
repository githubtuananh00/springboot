import Alert from 'react-bootstrap/Alert'

const AlertMessage = ({ alertInfo }) => {
	return alertInfo === null ? null : (
		<Alert variant={alertInfo.type}>{alertInfo.message}</Alert>
	)
}

export default AlertMessage
