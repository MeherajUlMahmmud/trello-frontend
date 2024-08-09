import React from 'react';
import '../../styles/navbar.scss';

interface NavbarButtonProps {
	text: string;
	onClick?: () => void;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ text, onClick }) => {
	return (
		<button className='navbar__button' onClick={onClick}
			type="button" dangerouslySetInnerHTML={{ __html: text }}
		>
		</button>
	);
};

export default NavbarButton;
