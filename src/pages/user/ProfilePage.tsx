import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { handleAPIError } from '@/repositories/utils';
import { AppConstants, AppUrls, Assets } from '@/utils/constants';

import CustomButton, { ButtonType } from '@/components/Common/CustomButton';
import InputField from '@/components/Common/InputField';
import { closeModal } from '@/utils/utils';
import React from 'react';
import { userRepository } from '@/repositories/user';
import { saveLocalStorage } from '@/utils/persistLocalStorage';
import Spinner from '@/components/Loading/Spinner';
import { authRepository } from '@/repositories/auth';
import Toast from '@/components/Common/Toast';
import { createToastMessage, ToastPosition, ToastType } from '@/utils/toast';
import { ModalStyles } from '@/utils/styles';

const ProfilePage = () => {
	const { user, setUser, tokens, logout } = useAuth();
	const [toastList, setToastList] = useState<any[]>([]);

	const navigate = useNavigate();

	const [updateUserInfo, setUpdateUserInfo] = useState({
		data: {
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
		},
		isLoading: false,
	});

	const [updatePasswordInfo, setUpdatePasswordInfo] = useState({
		data: {
			email: user.email,
			current_password: '',
			password1: '',
			password2: '',
		},
		isLoading: false,
	});

	const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (user) {
			fetchUserProfile();
		} else {
			logout();
			navigate(AppUrls.loginRoute);
		}
	}, []);

	const fetchUserProfile = async () => {
		try {
			const response = await userRepository.getUserProfile(tokens.access);
			setUpdateUserInfo({
				data: response.data,
				isLoading: false,
			});
			setUser(response.data);
			saveLocalStorage('user', response.data);
		} catch (error: any) {
			createToastMessage({
				type: ToastType.Error,
				title: 'Failed to Fetch User Profile',
				description: error.response.data.detail || AppConstants.genericErrorMessage,
				toastList,
				setToastList
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleChangeUserInfo = (e: any) => {
		const { name, value } = e.target;
		setUpdateUserInfo({ ...updateUserInfo, data: { ...updateUserInfo.data, [name]: value } });
	};

	const handleChangePasswordInfo = (e: any) => {
		const { name, value } = e.target;
		setUpdatePasswordInfo({ ...updatePasswordInfo, data: { ...updatePasswordInfo.data, [name]: value } });
	};

	const handleUpdateUserInfo = async (e: any) => {
		e.preventDefault();

		try {
			setUpdateUserInfo({ ...updateUserInfo, isLoading: true });
			await userRepository.updateUser(user.id, updateUserInfo.data, tokens.access);
			fetchUserProfile();

			createToastMessage({
				type: ToastType.Success,
				title: 'User Information Updated',
				description: 'Your user information has been updated successfully.',
				toastList,
				setToastList
			});
		} catch (error: any) {
			console.log(error.response.data);
			createToastMessage({
				type: ToastType.Error,
				title: 'Failed to Update User',
				description: error.response.data.detail || AppConstants.genericErrorMessage,
				toastList,
				setToastList
			});
		} finally {
			setUpdateUserInfo({ ...updateUserInfo, isLoading: false });
		}
	};

	const handleUpdatePasswordInfo = async (e: any) => {
		e.preventDefault();

		try {
			setUpdatePasswordInfo({ ...updatePasswordInfo, isLoading: true });

			await authRepository.updatePassword(updatePasswordInfo.data, tokens.access);

			createToastMessage({
				type: ToastType.Success,
				title: 'Password Updated',
				description: 'Your password has been updated successfully.',
				toastList,
				setToastList
			});
		} catch (error: any) {
			console.log(error);

			createToastMessage({
				type: ToastType.Error,
				title: 'Failed to Update Password',
				description: error?.response?.data?.detail || AppConstants.genericErrorMessage,
				toastList,
				setToastList
			});
		} finally {
			setUpdatePasswordInfo({ ...updatePasswordInfo, isLoading: false });
		}
	};

	const handleLogout = async () => {
		logout();
		navigate(AppUrls.loginRoute);
	};

	return (
		<>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				{
					isLoading ? (
						<Spinner />
					) : (
						<div className='flex flex-col lg:flex-row mx-auto justify-center gap-8'>
							{/* Left Section - User Info */}
							<div className='w-full h-fit lg:w-1/3 md:w-2/3 sm:w-1/2 border p-6 rounded-lg border-gray-500 '>
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
								<div className='mb-8 border p-4 rounded-lg  border-gray-500 '>
									<h3 className='text-xl text-white font-bold mb-4'>Update User Information</h3>
									<form className='space-y-4' onSubmit={(e) => handleUpdateUserInfo(e)}>
										<div className='flex gap-4 w-full'>
											<InputField
												name="first_name"
												type="text"
												placeholder="First Name"
												value={updateUserInfo.data.first_name}
												label="First Name"
												inputClassName=''
												onChange={(e) => handleChangeUserInfo(e)}
												isRequired={true}
											/>
											<InputField
												name="last_name"
												type="text"
												placeholder="Last Name"
												value={updateUserInfo.data.last_name}
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
											value={updateUserInfo.data.email}
											label="Email"
											inputClassName='mt-4'
											onChange={(e) => handleChangeUserInfo(e)}
											isRequired={true}
											isDisabled={true}
										/>
										<CustomButton
											text='Update Information'
											type={ButtonType.Submit}
											style={{
												backgroundColor: "#007bff",
											}}
											isLoading={updateUserInfo.isLoading}
											isDisabled={updateUserInfo.isLoading}
										/>
									</form>
								</div>

								{/* Password Change */}
								<div className='mb-8 border border-gray-500 p-4 rounded-lg'>
									<h3 className='text-xl text-white font-bold mb-4'>Change Password</h3>
									<form className='space-y-4' onSubmit={(e) => handleUpdatePasswordInfo(e)}>
										<InputField
											name="current_password"
											type="password"
											placeholder="Current Password"
											value={updatePasswordInfo.data.current_password}
											label="Current Password"
											inputClassName='mt-4'
											onChange={(e) => handleChangePasswordInfo(e)}
											isRequired={true}
										/>
										<InputField
											name="password1"
											type="password"
											placeholder="New Password"
											value={updatePasswordInfo.data.password1}
											label="New Password"
											inputClassName='mt-4'
											onChange={(e) => handleChangePasswordInfo(e)}
											isRequired={true}
										/>
										<InputField
											name="password2"
											type="password"
											placeholder="Confirm Password"
											value={updatePasswordInfo.data.password2}
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
											isLoading={updatePasswordInfo.isLoading}
											isDisabled={updatePasswordInfo.isLoading}
										/>
									</form>
								</div>

								{/* Account Delete */}
								<div className=' border p-4 rounded-lg border-gray-500 '>
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
					)
				}
			</div>
			{
				showDeleteAccountConfirmation &&
				<DeleteAccountConfirmation
					setShowDeleteAccountConfirmation={setShowDeleteAccountConfirmation}
					navigate={navigate}
				/>
			}
			<Toast
				toastList={toastList}
				position={ToastPosition.TopRight}
			/>
		</>
	);
};

interface DeleteAccountConfirmationProps {
	setShowDeleteAccountConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
	navigate: any;
}

const DeleteAccountConfirmation = ({ setShowDeleteAccountConfirmation, navigate }: DeleteAccountConfirmationProps) => {

	const [isDeletingAccount, setIsDeletingAccount] = useState(false);

	const handleDeleteAccount = async (e: any) => {
		e.preventDefault();

		try {
			setIsDeletingAccount(true);

			// 	await userRepository.deleteAccount(user.id, tokens.access);
			setIsDeletingAccount(false);
			setShowDeleteAccountConfirmation(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsDeletingAccount(false);
		}
	};

	return (
		<div id="modal-bg" className={`${ModalStyles.modalBg}`} onClick={(e) => closeModal(e, setShowDeleteAccountConfirmation)}>
			<div className={`${ModalStyles.modalContent}`}>
				<div className={`${ModalStyles.modalCloseButtonWrapper}`} onClick={() => setShowDeleteAccountConfirmation(false)}>
					<i className={`${ModalStyles.modalCloseButton}`} />
				</div>
				<div className={`${ModalStyles.modalHeaderWrapper}`}>
					<h1 className={`${ModalStyles.modalTitle}`}>Delete Account</h1>
					<p className={`${ModalStyles.modalDescription}`}>Once you delete your account, there is no going back. Please be certain.</p>
				</div>
				<form className='flex flex-col gap-4 w-full' onSubmit={(e) => handleDeleteAccount(e)}>
					<div className={`${ModalStyles.modalActionsWrapper}`}>
						<CustomButton
							text={isDeletingAccount ? 'Loading...' : 'Delete Account'}
							type={ButtonType.Submit}
							className={"w-100 bg-red-500 hover:bg-red-600"}
							isDisabled={true}
							isLoading={isDeletingAccount}
						/>
						<CustomButton
							text='Cancel'
							type={ButtonType.Button}
							className={"w-100 bg-gray-500 hover:bg-gray-600"}
							onClick={() => setShowDeleteAccountConfirmation(false)}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ProfilePage;
