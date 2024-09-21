import React from 'react';

interface WorkspaceMiniSidebarProps {
	showSidebar: boolean;
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkspaceMiniSidebar: React.FC<WorkspaceMiniSidebarProps> = ({ showSidebar, setShowSidebar }) => {
	return (
		<div className='flex h-screen w-[50px] bg-[#1d2125] p-2 z-10'>
			<div className=' bg-[#1d2125] mt-2  w-[30px] h-[30px] flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-700'
				onClick={() => setShowSidebar(!showSidebar)}>
				<i className="fa-solid fa-chevron-right text-white" />
			</div>
		</div>
	)
}

export default WorkspaceMiniSidebar;
