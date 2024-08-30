import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { appName } from '../../utils/constants'
import { dashboardRoute, forgotPasswordRoute, signUpRoute } from '../../utils/app_routes'
import { saveLocalStorage } from '../../utils/persistLocalStorage'
import { authRepository } from '../../repositories/auth';
import { ButtonType } from '../../types/Button';
import { useAuth } from '../../context/AuthContext';

import '../../styles/auth.scss';

import ErrorMessage from '../../components/Common/ErrorMessage';
import Button from '../../components/Common/Button';

const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	});
	const [loading, setLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const { login } = useAuth();

	const handleChangeLoginData = (e: any) => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value
		})
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (loading) return;

		setIsError(false);
		setErrorMessage('');
		setLoading(true);

		try {
			const response = await authRepository.login(loginData);
			console.log(response);
			setLoading(false);
			const userData = response.data.user;
			const tokenData = response.data.tokens;

			// Save the user information in the context
			login(userData, tokenData);

			// navigate('/');
			navigate(location?.state?.from?.pathname || dashboardRoute);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			setIsError(true);
			setErrorMessage(error.response.data.detail);
		}
	};

	return (
		<div className='authPage maxWidth'>
			<div className="authContainer">
				<div className="loginPage">
					<div className="headerSection">
						<h1>{appName}</h1>
						<h3>
							Sign in to start your session
						</h3>
					</div>
					<form method="post" className='loginForm'
						onSubmit={(e) => handleSubmit(e)}
					>
						<div className="inputField">
							<input
								type="email"
								className="input"
								placeholder="Email Address"
								name="email"
								onChange={(e) => handleChangeLoginData(e)}
								required
								autoFocus
							/>
						</div>
						<div className="inputField">
							<input
								type="password"
								className="input"
								placeholder="Password"
								name="password"
								onChange={(e) => handleChangeLoginData(e)}
								required
							/>
						</div>

						<small className="forgotPassword align-right">
							<a href={forgotPasswordRoute}>
								Forgot your password?
							</a>
						</small>
						{
							!loading && isError && <ErrorMessage errorMessage={errorMessage} />
						}

						<div className="actionsSection">
							<Button
								text={loading ? 'Loading...' : 'Sign In'}
								type={ButtonType.Submit}
								isDisabled={loading}
								className={`button w-100 ${loading && 'disabled'}`}
								style={{
									backgroundColor: '#007bff',
								}}
							/>
						</div>
					</form>

					<small className="signUp align-center">
						<a href={signUpRoute} className=''>
							Don't have an account? Sign Up
						</a>
					</small>
				</div>
			</div>
		</div>
	)
}

export default LoginPage;
