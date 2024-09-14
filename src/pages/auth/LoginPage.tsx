import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { appName } from '../../utils/constants'
import { dashboardRoute, forgotPasswordRoute, signUpRoute } from '../../utils/app_routes'
import { authRepository } from '../../repositories/auth';
import { useAuth } from '../../context/AuthContext';

import ErrorMessage from '../../components/Common/ErrorMessage';
import CustomButton, { ButtonType } from '../../components/Common/Button';
import InputField from '@/components/InputField';

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
		<div className='flex justify-center items-center h-dvh m-2'>
			<Card className="w-[450px]">
				<form onSubmit={(e) => handleSubmit(e)}>
					<CardHeader>
						<CardTitle className='text-center text-3xl font-bold'>{appName}</CardTitle>
						<CardDescription className='text-center text-lg'>
							Sign in to start your session
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<InputField
								name="email"
								type="email"
								value={loginData.email}
								label="Email Address"
								placeholder="Email Address"
								onChange={(e) => handleChangeLoginData(e)}
								isRequired={true}
								autoFocus={true}
							/>
							<InputField
								name="password"
								type="password"
								value={loginData.password}
								label="Password"
								placeholder="Password"
								onChange={(e) => handleChangeLoginData(e)}
								isRequired={true}
							/>
							<div className='flex justify-end w-full gap-2'>
								<small className="text-sm font-medium text-gray-500">
									<a href={forgotPasswordRoute}>
										Forgot your password?
									</a>
								</small>
							</div>
						</div>
					</CardContent>

					{
						!loading && isError && <ErrorMessage errorMessage={errorMessage} />
					}

					<CardFooter className="flex justify-center">
						<CustomButton
							text={loading ? 'Loading...' : 'Sign In'}
							type={ButtonType.Submit}
							isDisabled={loading}
						/>
					</CardFooter>
					<div className='flex justify-center items-center gap-2 mb-4'>
						<a href={signUpRoute} className='text-sm font-medium text-blue-600 hover:text-blue-700'>
							Don't have an account? Sign Up
						</a>
					</div>
				</form>
			</Card>
		</div>
	)
}

export default LoginPage;
