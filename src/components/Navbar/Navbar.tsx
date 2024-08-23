import React, { useState } from 'react';
import '../../styles/navbar.scss';
import NavbarDropdown from './NavbarDropdown';
import { DropdownItem } from '../../types/Navbar';
import { homeRoute, loginRoute, signUpRoute } from '../../utils/app_routes';

const Navbar = () => {
	const [workspaces, setWorkspaces] = useState<DropdownItem[]>([
		{
			id: 1,
			name: 'Workspace 1',
			icon: 'https://trello-members.s3.amazonaws.com/61535414c479813fe5320674/b3edda9d79d04425f22f9d605e68e3c2/50.png'
		},
		{
			id: 2,
			name: 'Workspace 2',
			icon: 'https://trello-members.s3.amazonaws.com/61535414c479813fe5320674/b3edda9d79d04425f22f9d605e68e3c2/50.png'
		},
		{
			id: 3,
			name: 'Workspace 3',
			icon: 'https://trello-members.s3.amazonaws.com/61535414c479813fe5320674/b3edda9d79d04425f22f9d605e68e3c2/50.png'
		}
	]);
	const [recentList, setRecentList] = useState<DropdownItem[]>([
		{
			id: 1,
			name: 'Recent 1',
			icon: 'https://trello-members.s3.amazonaws.com/61535414c479813fe5320674/b3edda9d79d04425f22f9d605e68e3c2/50.png'
		},
		{
			id: 2,
			name: 'Recent 2',
			icon: 'https://trello-members.s3.amazonaws.com/61535414c479813fe5320674/b3edda9d79d04425f22f9d605e68e3c2/50.png'
		},
		{
			id: 3,
			name: 'Recent 3',
			icon: 'https://trello-members.s3.amazonaws.com/61535414c479813fe5320674/b3edda9d79d04425f22f9d605e68e3c2/50.png'
		}
	]);

	return (
		<nav className="navbar">
			<div className='navbar__leftSec'>
				<a href={homeRoute}>
					<img src="https://trello.com/assets/87e1af770a49ce8e84e3.gif" alt="Trello Logo" />
				</a>
				{/* <NavbarDropdown
					title="Workspaces"
					items={workspaces}
				/>
				<NavbarDropdown
					title="Recent"
					items={recentList}
				/> */}
			</div>
			<div className='navbar__rightSec'>
				{/* <i className="fa-solid fa-circle-question"></i>
				<i className="fa-solid fa-bell"></i> */}
				<img src="https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png" alt="User Avatar" />
				<div className='navbar_btn'>
					<a href={loginRoute}>
						Sign In
					</a>
				</div>
				<div className='navbar_btn'>
					<a href={signUpRoute}>
						Sign Up
					</a>
				</div>
			</div>
		</nav >
	)
}

export default Navbar