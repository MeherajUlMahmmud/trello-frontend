import React, { useState, useCallback } from "react";

interface WorkspaceItem {
	id: string;
	title: string;
}

interface WorkspaceDropdownProps {
	item: WorkspaceItem;
	selectedWorkspaceId: string | null;
	setSelectedWorkspaceId: (id: string) => void;
	isFocused: boolean;
	setFocusedWorkspaceId: (id: string) => void;
}

const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({
	item,
	selectedWorkspaceId,
	setSelectedWorkspaceId,
	setFocusedWorkspaceId,
}) => {
	const [showDropdownList, setShowDropdownList] = useState(false);

	const toggleDropdown = useCallback(() => {
		setShowDropdownList((prev) => !prev);
		setFocusedWorkspaceId(item.id);
	}, [item.id, setFocusedWorkspaceId]);

	const selectWorkspace = useCallback(() => {
		setSelectedWorkspaceId(item.id);
		setFocusedWorkspaceId(item.id);
	}, [item.id, setSelectedWorkspaceId, setFocusedWorkspaceId]);

	return (
		<div className={`flex flex-col items-center gap-2 w-full rounded`}>
			<button
				className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-md hover:bg-gray-100 hover:text-black ${selectedWorkspaceId === item.id ? 'bg-gray-100 text-black' : 'text-white'}`}
				onClick={toggleDropdown}
			>
				<div className="flex items-center gap-2">
					<i className="fa-solid fa-building" />
					<span className="ml-1">{item.title}</span>
				</div>
				<i
					className="fa-solid fa-chevron-down"
					onClick={(e) => {
						e.stopPropagation();
						selectWorkspace();
					}}
				/>
			</button>
			{showDropdownList && (
				<DropdownList
					selectedWorkspaceId={selectedWorkspaceId}
					selectWorkspace={selectWorkspace}
					itemId={item.id}
				/>
			)}
		</div>
	);
};

interface DropdownListProps {
	selectedWorkspaceId: string | null;
	selectWorkspace: () => void;
	itemId: string;
}

const DropdownList: React.FC<DropdownListProps> = React.memo(({ selectedWorkspaceId, selectWorkspace, itemId }) => (
	<div className="flex flex-col gap-2 w-52">
		<DropdownItem
			icon="fa-solid fa-tasks"
			text="Projects"
			onClick={selectWorkspace}
			isSelected={selectedWorkspaceId === itemId}
		/>
		<DropdownItem icon="fa-solid fa-users" text="Members" />
		<DropdownItem icon="fa-solid fa-gear" text="Settings" />
	</div>
));

interface DropdownItemProps {
	icon: string;
	text: string;
	onClick?: () => void;
	isSelected?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = React.memo(({ icon, text, onClick, isSelected }) => (
	<button
		className={`flex items-center px-4 py-2 text-sm font-medium rounded-md   cursor-pointer gap-2 w-full ${isSelected ? 'bg-gray-100 text-black hover:bg-gray-100' : 'text-white hover:bg-gray-500 hover:text-black'} `}
		onClick={onClick}
	>
		<i className={icon} />
		<span>{text}</span>
	</button>
));

export default React.memo(WorkspaceDropdown);
