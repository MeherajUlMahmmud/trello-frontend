import React from 'react';

interface WorkspaceMiniSidebarProps {
	showSidebar: boolean;
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkspaceMiniSidebar: React.FC<WorkspaceMiniSidebarProps> = ({ showSidebar, setShowSidebar }) => {
	return (
		<div className='relative h-screen w-[40px] bg-[#1d2125] p-2 z-10'>
			<div className='absolute top-3 left-5 bg-[#1d2125] border w-[30px] h-[30px] flex justify-center items-center rounded-full cursor-pointer'
				onClick={() => setShowSidebar(!showSidebar)}>
				<i className="fa-solid fa-chevron-right text-white" />
			</div>
		</div>
	)
}

export default WorkspaceMiniSidebar;
