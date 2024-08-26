import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonType } from '../../types/Button';
import { workspaceRepository } from '../../repositories/workspace';
import { handleAPIError } from '../../repositories/utils';
import { projectRepository } from '../../repositories/project';

import '../../styles/workspace.scss';

import Button from '../Common/Button';

interface WorkspaceDetailProps {
	selectedWorkspaceId: string;
	setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
	setShowUpdateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>>;
	refetchProject: boolean;
	setRefetchProject: React.Dispatch<React.SetStateAction<boolean>>;
	accessToken: string;
}

interface ProjectCardProps {
	project: any;
	selectedWorkspaceId: string;
}

const WorkspaceDetail: React.FC<WorkspaceDetailProps> = ({ selectedWorkspaceId, setShowCreateProjectModal, setShowUpdateWorkspaceModal, refetchProject, setRefetchProject, accessToken }) => {
	const navigate = useNavigate();

	const projectFilters = {
		workspace: selectedWorkspaceId,
		is_active: true,
		is_deleted: false,
	}

	const [currentWorkSpace, setCurrentWorkSpace] = useState<any>({});
	const [projects, setProjects] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (refetchProject) {
			fetchProjects();
			setRefetchProject(false);
		}
	}, [refetchProject]);

	useEffect(() => {
		fetchWorkspaceDetails();
	}, [selectedWorkspaceId]);

	const fetchWorkspaceDetails = async () => {
		try {
			const response = await workspaceRepository.getWorkspace(selectedWorkspaceId, accessToken);
			console.log('Workspace data', response);
			setCurrentWorkSpace(response.data.data);

			fetchProjects();
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	const fetchProjects = async () => {
		try {
			const response = await projectRepository.getProjects(projectFilters, accessToken);
			console.log('Project list data', response);
			const data = response.data.data;
			setProjects(data);
			setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	return (
		isLoading ? (
			<div className='workspaceDetail'>
				<div className='workspaceDetail__top_section'>
					<div className='top_section__img'>
						<i className="fa fa-spinner fa-spin"></i>
					</div>
					<div className='top_section__content'>
						<h1>
							Loading...
						</h1>
					</div>
				</div>
			</div>
		) : (
			<div className='workspaceDetail'>
				<div className='workspaceDetail__top_section'>
					<div className='top_section__img'>
						<img src='https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png' alt='workspace' />
					</div>
					<div className='top_section__content'>
						<p>
							{currentWorkSpace.title}
						</p>
						<Button
							icon='fa-solid fa-pen'
							type={ButtonType.Button}
							className=''
							onClick={() => setShowUpdateWorkspaceModal(true)}
							style={{
								backgroundColor: 'transparent',
							}}
						/>
					</div>
				</div>
				<hr />
				<div className='workspaceDetail__bottom_section'>
					<div className='bottom_section__header'>
						<div className='row space-between w-100'>
							<div className='row'>
								<i className="fa-solid fa-tasks"></i>
								<p>Your Projects</p>
							</div>
							<Button
								icon='fa-solid fa-plus'
								text='Create Project'
								type={ButtonType.Button}
								className=''
								onClick={() => setShowCreateProjectModal(true)}
								style={{
									backgroundColor: '#333c44',
								}}
							/>
						</div>
					</div>
					<div className='bottom_section__content'>
						{
							projects.length === 0 ? (
								<div></div>
							) : (
								projects.map((project: any) => (
									<ProjectCard
										key={project.id}
										project={project}
										selectedWorkspaceId={selectedWorkspaceId}
									/>
								))
							)
						}
					</div>
				</div>
			</div>
		)
	)
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, selectedWorkspaceId }) => {
	return (
		<div className='bottom_section__content_item'
			onClick={() => window.location.href = `/workspace/${selectedWorkspaceId}/${project.uuid}`}
		>
			<div className='row'>
				<i className="fa-solid fa-project-diagram"></i>
				<span>{project.title.length > 30 ? project.title.slice(0, 30) + '...' : project.title}</span>
			</div>
		</div>
	)
}

export default WorkspaceDetail;
