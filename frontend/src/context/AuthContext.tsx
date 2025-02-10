import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
	token: string | null;
	login: (token: string) => void;
	logout: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const navigate = useNavigate();

	const isTokenValid = (token: string): boolean => {
		try {
			const decoded: any = jwtDecode(token);
			if (!decoded.exp) return false;

			const currentTime = Math.floor(Date.now() / 1000);
			return decoded.exp > currentTime;
		} catch (error) {
			console.error("Invalid token:", error);
			return false;
		}
	};

	useEffect(() => {
		const savedToken = localStorage.getItem("token");
		if (savedToken) {
			setToken(savedToken);
		}
	}, []);

	const login = (token: string) => {
		if (isTokenValid(token)) {
			setToken(token);
			localStorage.setItem("token", token);
			console.log("Token is valid:", token);
			navigate("/dashboard");
		} else {
			console.error("Invalid or expired token!");
			logout();
		}
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem("token");
		navigate("/signin");
	};

	const isAuthenticated = !!token && isTokenValid(token);

	return (
		<AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
