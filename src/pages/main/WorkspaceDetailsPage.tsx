import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loadLocalStorage } from '../../utils/persistLocalStorage';
import { projectRepository } from '../../repositories/project';
import { workspaceRepository } from '../../repositories/workspace';
import { handleAPIError } from '../../repositories/utils';

import '../../styles/workspace.scss';

import WorkspaceSidebar from '../../components/Workspace/WorkspaceSidebar';
import WorkspaceMiniSidebar from '../../components/Workspace/WorkspaceMiniSidebar';
import WorkspaceBody from '../../components/Workspace/WorkspaceBody';
import CreateProjectModal from '../../components/Project/CreateProjectModal';

const WorkspaceDetailsPage = () => {
	const navigate = useNavigate();

	const tokens = loadLocalStorage('tokens');

	const selectedWorkspaceId = window.location.pathname.split('/')[2];
	const selectedProjectId = window.location.pathname.split('/')[3];

	const projectFilters = {
		workspace: selectedWorkspaceId,
		is_active: true,
		is_deleted: false,
	}
	const [workspace, setWorkspace] = useState<any>({});
	const [projects, setProjects] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const [showSidebar, setShowSidebar] = useState(true);

	const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

	const [refetchProject, setRefetchProject] = useState(false);

	useEffect(() => {
		fetchWorkspaceDetails();
	}, [selectedWorkspaceId]);

	useEffect(() => {
		if (refetchProject) {
			fetchProjects();
			setRefetchProject(false);
		}
	}, [refetchProject]);

	const fetchWorkspaceDetails = async () => {
		try {
			const response = await workspaceRepository.getWorkspace(selectedWorkspaceId, tokens.access);
			console.log('Workspace data', response);
			setWorkspace(response.data.data);

			fetchProjects();
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	const fetchProjects = async () => {
		try {
			const response = await projectRepository.getProjects(projectFilters, tokens.access);
			console.log('Project list', response);
			const data = response.data.data;
			setProjects(data);

			if (data.length > 0) {
				// filter projects by selectedProjectId
				// const filteredProjects = projects.filter((item) => item.uuid === selectedProjectId);

				// TODO: redirect to dashboard page if no project found
				// if (filteredProjects.length === 0) {
				// 	console.log('redirect');
				// 	navigate(dashboardRoute);
				// }
			}
			setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	return (
		<div className='workspaceDetailsPage'>
			{
				isLoading ? (
					<i className="fa fa-spinner fa-spin"></i>
				) : (
					<>
						{
							showSidebar ? (
								<WorkspaceSidebar
									workspace={workspace}
									projectList={projects}
									selectedProjectId={selectedProjectId}
									showSidebar={showSidebar}
									setShowSidebar={setShowSidebar}
									setShowCreateProjectModal={setShowCreateProjectModal}
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
							selectedProjectId={selectedProjectId}
							accessToken={tokens.access}
						/>
					</>
				)
			}

			{
				showCreateProjectModal &&
				<CreateProjectModal
					setShowCreateProjectModal={setShowCreateProjectModal}
					selectedWorkspaceId={selectedWorkspaceId}
					setRefetchProject={setRefetchProject}
					accessToken={tokens.access}
				/>
			}
		</div>
	)
}

export default WorkspaceDetailsPage