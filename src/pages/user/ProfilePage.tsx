import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { handleAPIError } from '@/repositories/utils';
import { AppUrls, Assets } from '@/utils/constants';

import CustomButton, { ButtonType } from '@/components/Common/Button';
import InputField from '@/components/InputField';
import { closeModal } from '@/utils/utils';
import React from 'react';

const ProfilePage = () => {
	const { user, logout } = useAuth();

	const navigate = useNavigate();

	const [userInfo, setUserInfo] = useState({
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email,
	});

	const [passwordInfo, setPasswordInfo] = useState({
		current_password: '',
		new_password: '',
		confirm_password: '',
	});

	const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const handleChangeUserInfo = (e: any) => {
		const { name, value } = e.target;
		setUserInfo({
			...userInfo,
			[name]: value
		})
	};

	const handleChangePasswordInfo = (e: any) => {
		const { name, value } = e.target;
		setPasswordInfo({
			...passwordInfo,
			[name]: value
		})
	};

	const handleUpdateUserInfo = async (e: any) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			// 	await userRepository.updateUser(user.id, userInfo, tokens.access);
			// 	setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	const handleUpdatePasswordInfo = async (e: any) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			// 	await userRepository.updatePassword(user.id, passwordInfo, tokens.access);
			// 	setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	const handleLogout = async () => {
		logout();
		navigate(AppUrls.loginRoute);
	};

	return (
		<>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='flex flex-col lg:flex-row mx-auto justify-center gap-8'>
					{/* Left Section - User Info */}
					<div className='w-full h-fit lg:w-1/3 md:w-2/3 sm:w-1/2 border p-6 rounded-lg shadow-lg'>
						<div className='flex flex-col items-center'>
							<img
								src={user.profile_picture || Assets.userPlaceholder}
								alt="User"
								className='w-32 h-32 object-cover rounded-full mb-4'
							/>
							<h2 className='text-2xl text-white font-semibold'>
								{user.first_name} {user.last_name}
							</h2>
							<p className='text-sm text-gray-100'>
								{user.email}
							</p>
							<CustomButton
								text='Logout'
								type={ButtonType.Button}
								className='mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex-row-reverse'
								onClick={() => handleLogout()}
								icon='fa-solid fa-arrow-right-from-bracket'
							/>
						</div>
					</div>

					{/* Right Section - Editable Fields */}
					<div className='w-full lg:w-2/3 md:w-2/3 sm:w-1/2'>
						{/* User Information Update */}
						<div className='mb-8 border p-4 rounded-lg shadow-lg'>
							<h3 className='text-xl text-white font-bold mb-4'>Update User Information</h3>
							<form className='space-y-4' onSubmit={(e) => handleUpdateUserInfo(e)}>
								<div className='flex gap-4 w-full'>
									<InputField
										name="first_name"
										type="text"
										placeholder="First Name"
										value={userInfo.first_name}
										label="First Name"
										inputClassName=''
										onChange={(e) => handleChangeUserInfo(e)}
										isRequired={true}
									/>
									<InputField
										name="last_name"
										type="text"
										placeholder="Last Name"
										value={userInfo.last_name}
										label="Last Name"
										inputClassName=''
										onChange={(e) => handleChangeUserInfo(e)}
										isRequired={true}
									/>
								</div>
								<InputField
									name="email"
									type="email"
									placeholder="Email"
									value={userInfo.email}
									label="Email"
									inputClassName='mt-4'
									onChange={(e) => handleChangeUserInfo(e)}
									isRequired={true}
								/>
								<CustomButton
									text='Update Information'
									type={ButtonType.Submit}
									style={{
										backgroundColor: "#007bff",
									}}
									isDisabled={isLoading}
								/>
							</form>
						</div>

						{/* Password Change */}
						<div className='mb-8 border p-4 rounded-lg shadow-lg'>
							<h3 className='text-xl text-white font-bold mb-4'>Change Password</h3>
							<form className='space-y-4' onSubmit={(e) => handleUpdatePasswordInfo(e)}>
								<InputField
									name="current_password"
									type="password"
									placeholder="Current Password"
									value=""
									label="Current Password"
									inputClassName='mt-4'
									onChange={(e) => handleChangePasswordInfo(e)}
									isRequired={true}
								/>
								<InputField
									name="new_password"
									type="password"
									placeholder="New Password"
									value=""
									label="New Password"
									inputClassName='mt-4'
									onChange={(e) => handleChangePasswordInfo(e)}
									isRequired={true}
								/>
								<InputField
									name="confirm_password"
									type="password"
									placeholder="Confirm Password"
									value=""
									label="Confirm Password"
									inputClassName='mt-4'
									onChange={(e) => handleChangePasswordInfo(e)}
									isRequired={true}
								/>
								<CustomButton
									text='Change Password'
									type={ButtonType.Submit}
									style={{
										backgroundColor: "#007bff",
									}}
									onClick={() => setShowDeleteAccountConfirmation(true)}
									isDisabled={isLoading}
								/>
							</form>
						</div>

						{/* Account Delete */}
						<div className=' border p-4 rounded-lg shadow-lg'>
							<h3 className='text-xl font-bold mb-4 text-red-600'>Delete Account</h3>
							<p className='text-gray-100 mb-4'>
								Once you delete your account, there is no going back. Please be certain.
							</p>
							<CustomButton
								text='Delete Account'
								type={ButtonType.Button}
								style={{
									backgroundColor: "#dc3545",
								}}
								isDisabled={isLoading}
								onClick={() => setShowDeleteAccountConfirmation(true)}
							/>
						</div>
					</div>
				</div>
			</div>
			{
				showDeleteAccountConfirmation &&
				<DeleteAccountConfirmation
					setShowDeleteAccountConfirmation={setShowDeleteAccountConfirmation}
					setIsLoading={setIsLoading}
					isLoading={isLoading}
					navigate={navigate}
				/>
			}
		</>
	);
};

interface DeleteAccountConfirmationProps {
	setShowDeleteAccountConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
	navigate: any;
}

const DeleteAccountConfirmation = ({ setShowDeleteAccountConfirmation, setIsLoading, isLoading, navigate }: DeleteAccountConfirmationProps) => {


	const handleDeleteAccount = async (e: any) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			// 	await userRepository.deleteAccount(user.id, tokens.access);
			setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	return (
		<div id="modal-bg" className='fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-10' onClick={(e) => closeModal(e, setShowDeleteAccountConfirmation)}>
			<div className='relative bg-[#333c44] w-3/5 max-h-[80%] p-4 rounded-md border shadow-md'>
				<div className='absolute top-4 right-4 flex items-center gap-2 cursor-pointer' onClick={() => setShowDeleteAccountConfirmation(false)}>
					<i className="fa-solid fa-xmark text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-md"></i>
				</div>
				<div className='flex items-center justify-center gap-2 p-2 text-2xl font-bold text-red-600'>
					<h1>Delete Account</h1>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
