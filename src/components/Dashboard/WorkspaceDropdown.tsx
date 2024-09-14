import { useState } from "react";

interface WorkspaceDropdownProps {
	item: any;
	selectedWorkspaceId: string;
	setSelectedWorkspaceId: React.Dispatch<React.SetStateAction<any>>;
}

const WorkspaceDropdown = ({ item, selectedWorkspaceId, setSelectedWorkspaceId }: WorkspaceDropdownProps) => {
	const [showDropdownList, setShowDropdownList] = useState(false);
	return (
		<div className='flex flex-col items-center gap-2 w-full'>
			<div className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
				onClick={() => {
					setShowDropdownList(!showDropdownList);
				}}
			>
				<div
					className="flex justify-between items-center w-full cursor-pointer"
				>
					<div className='flex items-center gap-2'>
						<i className="fa-solid fa-building"></i>
						<span className="ml-1">
							{item.title}
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
					<div className="flex flex-col gap-2 w-52"
					>
						<div className={`flex items-center px-4 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 cursor-pointer gap-2 w-full ${selectedWorkspaceId === item.id ? 'bg-gray-100' : ''}`}
							onClick={() => setSelectedWorkspaceId(item.id)}
						>
							<i className="fa-solid fa-tasks"></i>
							<span>Projects</span>
						</div>
						<div className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 cursor-pointer gap-3">
							<i className="fa-solid fa-users"></i>
							<span>Members</span>
						</div>
						<div className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 cursor-pointer gap-3">
							<i className="fa-solid fa-gear"></i>
							<span>Settings</span>
						</div>
					</div>
				)}
		</div>
	)
}

export default WorkspaceDropdown