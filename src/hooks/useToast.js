import React, { useState } from 'react';
import CustomToast from '../organisms/CustomToast';

const useToast = () => {
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastDuration, setToastDuration] = useState(3000);
	const [toastPosition, setToastPosition] = useState('bottom-center');
	const [toastType, setToastType] = useState('info');

	const handleShowToast = (message, duration = 3000, position = 'bottom-center', type = 'info') => {
		setToastMessage(message);
		setToastDuration(duration);
		setToastPosition(position);
		setToastType(type);
		setShowToast(true);
	};

	const handleCloseToast = () => {
		setShowToast(false);
	};

	const renderToast = () => {
		return (
			<CustomToast message={toastMessage} duration={toastDuration} position={toastPosition} type={toastType} onClose={handleCloseToast} />
		);
	};

	return {
		showToast,
		handleShowToast,
		renderToast,
	};
};

export default useToast;
