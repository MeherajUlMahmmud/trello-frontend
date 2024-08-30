import '../../styles/navbar.scss';
import { homeRoute, loginRoute, signUpRoute } from '../../utils/app_routes';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook

const Navbar = () => {
	const { user, logout } = useAuth();

	return (
		<nav className="navbar">
			<div className='navbar__leftSec'>
				<a href={homeRoute}>
					<img src="https://trello.com/assets/87e1af770a49ce8e84e3.gif" alt="Trello Logo" />
				</a>
			</div>
			<div className='navbar__rightSec'>
				{user ? (
					<>
						{/* User is logged in */}
						<img src="https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png" alt="User Avatar" />
						<div className='navbar__button' onClick={logout}>
							<p>
								<i className="fa-solid fa-right-from-bracket" style={{
									transform: 'rotate(180deg)',
									marginRight: '5px',
								}} />
								Logout
							</p>
						</div>
					</>
				) : (
					<>
						{/* User is not logged in */}
						<a className='navbar__button' href={loginRoute}>Sign In</a>
						<a className='navbar__button' href={signUpRoute}>Sign Up</a>
					</>
				)}
			</div>
		</nav >
	);
}

export default Navbar;
