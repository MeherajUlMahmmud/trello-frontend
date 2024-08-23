import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { projectRepository } from '../../repositories/project';
import { workspaceRepository } from '../../repositories/workspace';
import { handleAPIError } from '../../repositories/utils';

import '../../styles/workspace.scss';

import WorkspaceSidebar from '../../components/Workspace/WorkspaceSidebar';
import WorkspaceMiniSidebar from '../../components/Workspace/WorkspaceMiniSidebar';
import WorkspaceBody from '../../components/Workspace/WorkspaceBody';
import { closeModal } from '../../utils/utils';

const WorkspaceDetailsPage = () => {
	const navigate = useNavigate();

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

	useEffect(() => {
		fetchWorkspaceDetails();
	}, [selectedWorkspaceId]);

	const fetchWorkspaceDetails = async () => {
		try {
			const response = await workspaceRepository.getWorkspace(selectedWorkspaceId);
			console.log(response);
			setWorkspace(response.data.data);

			fetchProjects();
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	const fetchProjects = async () => {
		try {
			const response = await projectRepository.getProjects(projectFilters);
			console.log(response);
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
						/>
					</>
				)
			}

			{
				showCreateProjectModal &&
				<CreateProjectModal
					setShowCreateProjectModal={setShowCreateProjectModal}
				/>
			}
		</div>
	)
}

const CreateProjectModal = ({ setShowCreateProjectModal }: { setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const [projectInfo, setProjectInfo] = useState({
		projectName: '',
		projectDescription: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		setProjectInfo({
			...projectInfo,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='modal__wrapper' onClick={(e) => closeModal(e, setShowCreateProjectModal)}>
			<div className='modal'>
				<div className='closeModal' onClick={() => setShowCreateProjectModal(false)}>
					<i className="fa-solid fa-xmark"></i>
				</div>
				<div className='modal__header'>
					<h1>Create Project</h1>
				</div>
				<div className='modal__body'>
					<div className='modal__body__form'>
						<input type='text' placeholder='Project Name'
							name='projectName'
							value={projectInfo.projectName}
							onChange={(e) => handleChange(e)}
						/>
						<textarea placeholder='Project Description'
							name='projectDescription'
							value={projectInfo.projectDescription}
							onChange={(e) => handleChange(e)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WorkspaceDetailsPage