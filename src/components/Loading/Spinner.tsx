import React from 'react';

export const Spinner: React.FC = () => (
	<div className='flex gap-4 m-2 text-white'>
		<i className="fa-solid fa-spinner fa-spin"></i>
		<span>Loading...</span>
	</div>
);
