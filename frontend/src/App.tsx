import './App.css'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Dashboard } from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route element={<ProtectedRoute />} >
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
				<Route path="/" element={<Navigate to="/dashboard" replace />} />
			</Routes>
			<Toaster duration={2000} expand richColors theme='dark' />
		</Router>
	)
}

export default App
