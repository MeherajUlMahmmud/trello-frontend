import React from 'react';
import CustomButton from '../Common/Button';
import { ButtonType } from '../Common/Button';
import WorkspaceDropdown from './WorkspaceDropdown';

interface Workspace {
	id: string;
	title: string;
	// Add other workspace properties as needed
}

interface DashboardSidebarProps {
	workspaceList: Workspace[];
	selectedWorkspaceId: string | null;
	setSelectedWorkspaceId: (id: string) => void;
	setShowCreateWorkspaceModal: (show: boolean) => void;
	focusedWorkspaceId: string | null;
	setFocusedWorkspaceId: (id: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
	workspaceList,
	selectedWorkspaceId,
	setSelectedWorkspaceId,
	setShowCreateWorkspaceModal,
	focusedWorkspaceId,
	setFocusedWorkspaceId,
}) => {
	const handleCreateWorkspace = React.useCallback(() => {
		setShowCreateWorkspaceModal(true);
	}, [setShowCreateWorkspaceModal]);

	return (
		<div className="p-5 w-72 h-fit">
			<div className="flex flex-col items-center gap-2 w-full">
				<div className="flex justify-between items-center gap-2 text-lg w-full">
					<p className="text-sm font-medium text-white">Workspaces</p>
					<CustomButton
						icon="fa-solid fa-plus"
						type={ButtonType.Button}
						className="m-0 px-4 py-2 text-sm font-medium"
						onClick={handleCreateWorkspace}
					/>
				</div>
				<hr className='border-gray-500' />
				{workspaceList.map((workspace) => (
					<WorkspaceDropdown
						key={workspace.id}
						item={workspace}
						selectedWorkspaceId={selectedWorkspaceId}
						setSelectedWorkspaceId={setSelectedWorkspaceId}
						isFocused={workspace.id === focusedWorkspaceId}
						setFocusedWorkspaceId={setFocusedWorkspaceId}
					/>
				))}
			</div>
		</div>
	);
};

export default React.memo(DashboardSidebar);
