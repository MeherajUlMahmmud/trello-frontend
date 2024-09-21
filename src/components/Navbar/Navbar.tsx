import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook
import CustomButton, { ButtonType } from '../CustomButton';
import { useNavigate } from 'react-router-dom';
import { AppUrls, Assets } from '@/utils/constants';
import { useState } from 'react';

const Navbar = () => {
	const { user, logout } = useAuth();

	const navigate = useNavigate();

	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	const handleLogout = async () => {
		logout();
		navigate(AppUrls.loginRoute);
	};

	const toggleDropdown = () => {
		setIsDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
	};

	const handleClickOutside = () => {
		// You can implement logic here to close the dropdown if the user clicks outside
		setIsDropdownVisible(false);
	};

	return (
		<nav className="flex justify-between items-center h-16 border-b border-gray-500 px-4 py-2">
			<div className='flex items-center gap-4'>
				<a href={AppUrls.homeRoute} className='text-lg font-bold h-full'>
					<img className='w-24' src="https://trello.com/assets/87e1af770a49ce8e84e3.gif" alt="Trello Logo" />
				</a>
				<a href={AppUrls.dashboardRoute} className='text-sm font-medium h-full gap-3 text-white hover:text-gray-300'>
					Dashboard
				</a>
				{/* <div className='relative'>
					<a href="#" className='flex items-center text-sm font-medium h-full gap-1 text-white hover:text-gray-300' onClick={toggleDropdown}>
						<span>Workspaces</span>
						<i className="fa-solid fa-chevron-down"></i>
					</a>

					{isDropdownVisible && (
						<div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg">
							<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Workspace 1</a>
							<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Workspace 2</a>
							<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create New Workspace</a>
						</div>
					)}
				</div> */}
			</div>
			<div className='flex items-center'>
				{user ? (
					<div className='flex items-center gap-2'>
						{/* User is logged in */}
						<a href={AppUrls.profileRoute} className='flex items-center gap-2 text-lg font-bold h-full'>
							<img className='w-10 h-10 rounded-full' src={user.profile_picture || Assets.userPlaceholder} alt="User Avatar" />
						</a>
						<CustomButton
							text={"Logout"}
							type={ButtonType.Button}
							className='bg-red-600 text-white hover:bg-red-700 flex-row-reverse'
							onClick={() => handleLogout()}
							icon='fa-solid fa-arrow-right-from-bracket'
						/>
					</div>
				) : (
					<div className='flex items-center gap-2'>
						<CustomButton
							text={"Login"}
							type={ButtonType.Button}
							className='gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 '
							onClick={() => window.location.href = AppUrls.loginRoute}
						/>
						<CustomButton
							text={"Sign Up"}
							type={ButtonType.Button}
							className='gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white hover:bg-green-700 '
							onClick={() => window.location.href = AppUrls.signUpRoute}
						/>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
