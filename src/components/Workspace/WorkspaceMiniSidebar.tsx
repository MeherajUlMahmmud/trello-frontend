import React from 'react'

const WorkspaceMiniSidebar = ({ showSidebar, setShowSidebar }: { showSidebar: boolean, setShowSidebar: React.Dispatch<React.SetStateAction<boolean>> }) => {
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