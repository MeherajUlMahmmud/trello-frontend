import React, { useState } from 'react'
import { appName } from '../../utils/constants'
import { forgotPasswordRoute, signUpRoute } from '../../utils/app_routes'
import { useLocation, useNavigate } from 'react-router-dom'
import { saveLocalStorage } from '../../utils/persistLocalStorage'
import { authRepository } from '../../repositories/auth'
import ErrorMessage from '../../components/Common/ErrorMessage'
import '../../styles/auth.scss'

const LoginPage = () => {

	const navigate = useNavigate();
	const location = useLocation();

	const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	});
	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')


	const handleChangeLoginData = (e: any) => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value
		})
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (loading) return;

		setIsError(false);
		setErrorMessage('');
		setLoading(true);

		authRepository.login(loginData.email, loginData.password)
			.then((res: any) => {
				// console.log(res);
				setLoading(false)

				saveLocalStorage("user", res.data.user);
				saveLocalStorage("tokens", res.data.tokens);
				// navigate('/');
				navigate(location?.state?.from?.pathname || '/');
			})
			.catch((err: any) => {
				setLoading(false);
				// console.log(err?.response);
				// console.log(err?.response?.status);
				setErrorMessage(err?.response?.data?.detail)
				setIsError(true)
			});
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

						<small className="">
							<a href={forgotPasswordRoute}>
								Forgot your password?
							</a>
						</small>
						{
							!loading && isError && <ErrorMessage errorMessage={errorMessage} />
						}

						<div className="actionsSection">
							{/* <Button
								text={loading ? 'Loading...' : 'Sign In'}
								type={"submit"}
								isDisabled={loading}
								className={`button ${loading && 'disabled'}`}
							/> */}
						</div>
					</form>

					<small className="">
						<a href={signUpRoute} className=''>
							Don't have an account? Sign Up
						</a>
					</small>
				</div>
			</div>
		</div>
	)
}

export default LoginPage

function useDocumentTitle(title: string) {
	throw new Error('Function not implemented.')
}
