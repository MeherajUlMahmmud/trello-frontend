import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardRoute } from '../utils/app_routes';
import { loadLocalStorage } from '../utils/persistLocalStorage';

const HomePage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const user = loadLocalStorage('user');
		const tokens = loadLocalStorage('tokens');

		if (user && tokens) {
			navigate(dashboardRoute);
		}
	}, [navigate]);

	return (
		<>
			<div className='maxWidth'>
				<h1>HomePage</h1>
			</div>
		</>
	);
};

export default HomePage;
