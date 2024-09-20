import React, { useState } from 'react'
import { NavbarDropdownProps } from '@/types/Navbar';

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ title, items }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='navbar__dropdown' onClick={toggleDropdown}>
			<div className='navbar__dropdown_header'>
				<span>{title}</span>
				<i className={`fa-solid fa-chevron-down ${isOpen ? 'open' : ''}`}></i>
			</div>
			{isOpen && (
				<ul className='navbar__dropdown_menu'>
					{items.map((item, index) => (
						<li key={index} className='navbar__dropdown-item'>
							<img src={item.icon} alt={item.name} />
							<span>{item.name}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default NavbarDropdown