import { homeRoute, loginRoute, profileRoute, signUpRoute } from '../../utils/app_routes';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import CustomButton, { ButtonType } from '../Common/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const { user, logout } = useAuth();

	const navigate = useNavigate();

	const handleLogout = async () => {
		logout();
		navigate(loginRoute);
	};

	return (
		<nav className="flex justify-between items-center h-16 border-b border-gray-500 px-4 py-2">
			<div className='flex items-center gap-2'>
				<a href={homeRoute} className='text-lg font-bold h-full'>
					<img className='w-24' src="https://trello.com/assets/87e1af770a49ce8e84e3.gif" alt="Trello Logo" />
				</a>
			</div>
			<div className='flex items-center'>
				{user ? (
					<div className='flex items-center gap-2'>
						{/* User is logged in */}
						<a href={profileRoute} className='flex items-center gap-2 text-lg font-bold h-full'>
							<img className='w-8 rounded-full' src={user.profile_picture || "https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png"} alt="User Avatar" />
						</a>
						<CustomButton
							text={"Logout"}
							type={ButtonType.Button}
							className='gap-2 px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 '
							onClick={() => handleLogout()}
						/>
					</div>
				) : (
					<div className='flex items-center gap-2'>
						<CustomButton
							text={"Login"}
							type={ButtonType.Button}
							className='gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 '
							onClick={() => window.location.href = loginRoute}
						/>
						<CustomButton
							text={"Sign Up"}
							type={ButtonType.Button}
							className='gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white hover:bg-green-700 '
							onClick={() => window.location.href = signUpRoute}
						/>
					</div>
				)}
			</div>
		</nav >
	);
}

export default Navbar;
