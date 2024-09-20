import { useState } from 'react';

import { authRepository } from '@/repositories/auth';

import { ButtonType } from '@/components/Common/Button';
import ErrorMessage from '@/components/Common/ErrorMessage';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CustomButton from '@/components/Common/Button';
import InputField from '@/components/InputField';
import { AppConstants, AppUrls } from '@/utils/constants';

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
		<div className='flex justify-center items-center h-dvh'>
			<Card className="w-[450px] bg-gray-800 border m-2 shadow-md">
				<form onSubmit={(e) => handleSubmit(e)}>
					<CardHeader>
						<CardTitle className='text-center text-white text-3xl font-bold'>{AppConstants.appName}</CardTitle>
						<CardDescription className='text-center text-white text-lg'>
							Get Started
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<InputField
								name="first_name"
								type="text"
								value={signUpData.first_name}
								label="First Name"
								placeholder="First Name"
								onChange={(e) => handleChangeSignUpData(e)}
								isRequired={true}
								autoFocus={true}
							/>
							<InputField
								name="last_name"
								type="text"
								value={signUpData.last_name}
								label="Last Name"
								placeholder="Last Name"
								onChange={(e) => handleChangeSignUpData(e)}
								isRequired={true}
							/>
							<InputField
								name="email"
								type="email"
								value={signUpData.email}
								label="Email Address"
								placeholder="Email Address"
								onChange={(e) => handleChangeSignUpData(e)}
								isRequired={true}
							/>
							<InputField
								name="password1"
								type="password"
								value={signUpData.password1}
								label="Password"
								placeholder="Password"
								onChange={(e) => handleChangeSignUpData(e)}
								isRequired={true}
							/>
							<InputField
								name="password2"
								type="password"
								value={signUpData.password2}
								label="Confirm Password"
								placeholder="Confirm Password"
								onChange={(e) => handleChangeSignUpData(e)}
								isRequired={true}
							/>
						</div>
					</CardContent>

					{
						!loading && isError && <ErrorMessage errorMessage={errorMessage} />
					}

					<CardFooter className="flex justify-center">
						<CustomButton
							text={loading ? 'Loading...' : 'Sign Up'}
							type={ButtonType.Submit}
							style={{
								backgroundColor: "#007bff",
							}}
							isDisabled={loading}
						/>
					</CardFooter>

					<div className='flex justify-center items-center gap-2 mb-4'>
						<a href={AppUrls.loginRoute} className="text-sm font-medium text-blue-500 hover:text-blue-600">
							Already have an account? Sign In
						</a>
					</div>
				</form>
			</Card>
		</div>
	)
}

export default SignUpPage;
