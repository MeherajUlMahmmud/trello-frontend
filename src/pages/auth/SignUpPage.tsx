import { useState } from 'react';

import { authRepository } from '../../repositories/auth';
import { loginRoute } from '../../utils/app_routes';
import { appName } from '../../utils/constants';
import { ButtonType } from '../../types/Button';

import '../../styles/auth.scss';

import Button from '../../components/Common/Button';
import ErrorMessage from '../../components/Common/ErrorMessage';

const SignUpPage = () => {
	const [signUpData, setSignUpData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password1: '',
		password2: ''
	});
	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')


	const handleChangeSignUpData = (e: any) => {
		const { name, value } = e.target;
		setSignUpData({
			...signUpData,
			[name]: value
		})
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (loading) return;

		console.log("handleSubmit");

		setIsError(false);
		setErrorMessage('');
		setLoading(true);

		try {
			const response = await authRepository.signUp(signUpData);
			console.log(response);
			setLoading(false);
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
				<div className="signUpPage">
					<div className="headerSection">
						<h1>{appName}</h1>
						<h3>
							Get Started
						</h3>
					</div>
					<form method="post" className='loginForm'
						onSubmit={(e) => handleSubmit(e)}
					>
						<div className="inputField">
							<input
								type="text"
								className="input"
								placeholder="First Name"
								name="first_name"
								onChange={(e) => handleChangeSignUpData(e)}
								required
								autoFocus
							/>
						</div>
						<div className="inputField">
							<input
								type="text"
								className="input"
								placeholder="Last Name"
								name="last_name"
								onChange={(e) => handleChangeSignUpData(e)}
								required
							/>
						</div>
						<div className="inputField">
							<input
								type="email"
								className="input"
								placeholder="Email Address"
								name="email"
								onChange={(e) => handleChangeSignUpData(e)}
								required
							/>
						</div>
						<div className="inputField">
							<input
								type="password"
								className="input"
								placeholder="Password"
								name="password1"
								onChange={(e) => handleChangeSignUpData(e)}
								required
							/>
						</div>
						<div className="inputField">
							<input
								type="password"
								className="input"
								placeholder="Confirm Password"
								name="password2"
								onChange={(e) => handleChangeSignUpData(e)}
								required
							/>
						</div>
						{
							!loading && isError && <ErrorMessage errorMessage={errorMessage} />
						}

						<div className="actionsSection">
							<Button
								text={loading ? 'Loading...' : 'Sign Up'}
								type={ButtonType.Submit}
								isDisabled={loading}
								className={`button w-100 ${loading && 'disabled'}`}
								style={{
									backgroundColor: '#007bff',
								}}
							/>
						</div>
					</form>

					<small className="">
						<a href={loginRoute} className=''>
							Already have an account? Sign In
						</a>
					</small>
				</div>
			</div>
		</div>
	)
}

export default SignUpPage