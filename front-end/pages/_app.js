import 'bootstrap/dist/css/bootstrap.min.css'
import AuthContextProvider from '../context/AuthContext'
import StudentContextProvider from '../context/StudentContext'

function MyApp({ Component, pageProps }) {
	return (
		<StudentContextProvider>
			<AuthContextProvider>
				<Component {...pageProps} />
			</AuthContextProvider>
		</StudentContextProvider>
	)
}

export default MyApp
