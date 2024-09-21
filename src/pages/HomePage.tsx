import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadLocalStorage } from '../utils/persistLocalStorage';
import { AppUrls } from '@/utils/constants';

const HomePage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const user = loadLocalStorage('user');
		const tokens = loadLocalStorage('tokens');

		if (user && tokens) {
			navigate(AppUrls.dashboardRoute);
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
