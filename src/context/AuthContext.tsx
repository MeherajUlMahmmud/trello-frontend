import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { deleteLocalStorage, loadLocalStorage, saveLocalStorage } from '../utils/persistLocalStorage';

interface AuthContextType {
	user: any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
	tokens: any;
	login: (user: any, tokens: any) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<any | null>(null);
	const [tokens, setTokens] = useState<any | null>(null);

	useEffect(() => {
		// Check if user data is stored in localStorage
		const storedUser = loadLocalStorage('user');
		const storedTokens = loadLocalStorage('tokens');

		if (storedUser && storedTokens) {
			setUser(storedUser);
			setTokens(storedTokens);
		} else {
			logout();
		}
	}, []);

	const login = (user: any, tokens: any) => {
		setUser(user);
		setTokens(tokens);

		saveLocalStorage('user', user);
		saveLocalStorage('tokens', tokens);
	};

	const logout = () => {
		setUser(null);
		setTokens(null);

		deleteLocalStorage('user');
		deleteLocalStorage('tokens');
	};

	return (
		<AuthContext.Provider value={{ user, setUser, tokens, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
