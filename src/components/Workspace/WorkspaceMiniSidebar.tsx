import React from 'react';

interface WorkspaceMiniSidebarProps {
	showSidebar: boolean;
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkspaceMiniSidebar: React.FC<WorkspaceMiniSidebarProps> = ({ showSidebar, setShowSidebar }) => {
	return (
		<div className='workspaceMiniSidebar'>
			<div className='open_sidebar_btn'>
				<i className="fa-solid fa-chevron-right"
					onClick={() => setShowSidebar(!showSidebar)}
				></i>
			</div>
		</div>
	)
}

export default WorkspaceMiniSidebar