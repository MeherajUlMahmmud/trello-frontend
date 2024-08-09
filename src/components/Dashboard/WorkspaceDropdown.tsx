import { useState } from "react";

const WorkspaceDropdown = ({ item, selectedWorkspaceId, setSelectedWorkspaceId }: { item: any, selectedWorkspaceId: string, setSelectedWorkspaceId: React.Dispatch<React.SetStateAction<any>> }) => {
	const [showDropdownList, setShowDropdownList] = useState(false);
	return (
		<div className='dashboardSidebar__workspace'>
			<div className='workspace_header'
				onClick={() => {
					setShowDropdownList(!showDropdownList);
				}}
			>
				<div className='row space-between w-100'>
					<div className='row'>
						<i className="fa-solid fa-building"></i>
						<span>
							{item.name}
						</span>
					</div>
					<i className='fa-solid fa-chevron-down'
						onClick={() => {
							setSelectedWorkspaceId(item.id);
						}}
					></i>
				</div>
			</div>
			{
				showDropdownList && (
					<div className='workspace_content'>
						<div className='workspace_content_item'
							onClick={() => setSelectedWorkspaceId(item.id)}
							style={{ backgroundColor: selectedWorkspaceId === item.id ? '#333c44' : '' }}
						>
							<i className="fa-solid fa-tasks"></i>
							<span>Projects</span>
						</div>
						<div className='workspace_content_item'>
							<i className="fa-solid fa-users"></i>
							<span>Members</span>
						</div>
						<div className='workspace_content_item'>
							<i className="fa-solid fa-gear"></i>
							<span>Settings</span>
						</div>
					</div>
				)}
		</div>
	)
}

export default WorkspaceDropdown