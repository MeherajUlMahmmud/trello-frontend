import React, { useState } from 'react';
import WorkspaceSidebar from '../../components/Workspace/WorkspaceSidebar';
import WorkspaceBody from '../../components/Workspace/WorkspaceBody';
import '../../styles/workspace.scss';
import WorkspaceMiniSidebar from '../../components/Workspace/WorkspaceMiniSidebar';

const WorkspaceDetailsPage = () => {
	const [workspace, setWorkspace] = useState<any>({
		id: 1,
		name: 'Workspace 1',
		description: 'Workspace 1 Description',
		projects: [
			{
				id: 1,
				name: 'Project 1',
				description: 'Project 1 Description',
			},
			{
				id: 2,
				name: 'Project 2',
				description: 'Project 2 Description',
			},
			{
				id: 3,
				name: 'Project 3',
				description: 'Project 3 Description',
			},
			{
				id: 4,
				name: 'Project 4',
				description: 'Project 4 Description',
			}
		]
	});

	const [showSidebar, setShowSidebar] = useState(true);

	return (
		<div className='workspaceDetailsPage'>
			{
				showSidebar ? (
					<WorkspaceSidebar
						workspace={workspace}
						projectList={workspace.projects || []}
						showSidebar={showSidebar}
						setShowSidebar={setShowSidebar}
					/>
				) : (
					<WorkspaceMiniSidebar
						showSidebar={showSidebar}
						setShowSidebar={setShowSidebar}
					/>
				)
			}
			<WorkspaceBody
				showSidebar={showSidebar}
			/>
		</div>
	)
}

export default WorkspaceDetailsPage