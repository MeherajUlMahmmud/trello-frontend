import React from 'react';
import CustomButton from '../Common/CustomButton';
import { ButtonType } from '../Common/CustomButton';
import WorkspaceDropdown from './WorkspaceDropdown';
import { DashboardSidebarStyles } from '@/utils/styles';

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
		<div className={`${DashboardSidebarStyles.sidebar}`}>
			<div className={`${DashboardSidebarStyles.sidebarWrapper}`}>
				<div className={`${DashboardSidebarStyles.sidebarHeaderWrapper}`}>
					<p className={`${DashboardSidebarStyles.sidebarHeaderTitle}`}>Workspaces</p>
					<CustomButton
						icon="fa-solid fa-plus"
						type={ButtonType.Button}
						className={`${DashboardSidebarStyles.sidebarHeaderAddButton}`}
						onClick={handleCreateWorkspace}
					/>
				</div>
				<hr className='border-b w-full' />
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
