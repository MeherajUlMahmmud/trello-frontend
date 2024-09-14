import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { workspaceRepository } from '../../repositories/workspace';
import { handleAPIError } from '../../repositories/utils';
import { projectRepository } from '../../repositories/project';

import '../../styles/workspace.scss';
import CustomButton, { ButtonType } from '../Common/Button';


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
			<div
				className='flex flex-col gap-4 w-4/5'
			>
				<div className='flex items-center gap-4 mt-4 mr-4 mb-4' >
					<div className='w-16 rounded-lg'>
						<img className='w-full' src='https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png' alt='workspace' />
					</div>
					<p className='text-2xl font-bold'>
						{currentWorkSpace.title}
					</p>
					<CustomButton
						icon='fa-solid fa-pen'
						type={ButtonType.Button}
						className=''
						onClick={() => setShowUpdateWorkspaceModal(true)}
					/>
				</div>
				<hr />
				<div className='flex flex-col gap-4 mt-4 w-full'>
					<div className='flex justify-between items-center w-full'>
						<div className='flex items-center gap-2'>
							<i className="fa-solid fa-tasks"></i>
							<p className='text-lg font-medium'>Your Projects</p>
						</div>
						<CustomButton
							icon='fa-solid fa-plus'
							text='Create Project'
							type={ButtonType.Button}
							className='gap-2 px-4 py-2 text-sm font-medium'
							onClick={() => setShowCreateProjectModal(true)}
						/>
					</div>
					<div className='grid grid-cols-4 gap-4'>
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
		<div className='flex items-start gap-2 border-2 border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 cursor-pointer h-20'
			onClick={() => window.location.href = `/workspace/${selectedWorkspaceId}/${project.uuid}`}
		>
			<div className='flex items-center gap-2'>
				<i className="fa-solid fa-project-diagram"></i>
				<span>{project.title.length > 30 ? project.title.slice(0, 30) + '...' : project.title}</span>
			</div>
		</div>
	)
}

export default WorkspaceDetail;
