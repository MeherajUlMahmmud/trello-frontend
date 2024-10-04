import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { workspaceRepository } from '@/repositories/workspace';
import { handleAPIError } from '@/repositories/utils';
import { projectRepository } from '@/repositories/project';

import CustomButton, { ButtonType } from '../Common/CustomButton';
import Spinner from '../Loading/Spinner';


interface WorkspaceDetailProps {
	selectedWorkspaceId: string | null;
	setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
	setShowUpdateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>>;
	refetchProject: boolean;
	setRefetchProject: React.Dispatch<React.SetStateAction<boolean>>;
	accessToken: string;
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
			if (!response) {
				setIsLoading(false);
				return;
			};
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
			<div className='flex flex-col gap-4 w-4/5 p-2'>
				<Spinner />
			</div>
		) : (
			<div className='flex flex-col w-full md:w-4/5 gap-2  h-fit p-2'>
				<div className='flex items-center gap-4 mt-4' >
					<div className='w-16 rounded-lg'>
						<img className='w-14 h-14 object-cover rounded-md' src={currentWorkSpace.image || 'https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png'} alt='workspace' />
					</div>
					<p className='text-2xl text-white font-bold'>
						{currentWorkSpace.title}
					</p>
					<CustomButton
						icon='fa-solid fa-pen'
						type={ButtonType.Button}
						className=''
						onClick={() => setShowUpdateWorkspaceModal(true)}
					/>
				</div>
				<hr className='border-b' />
				<div className='flex flex-col gap-4 mt-4 w-full'>
					<div className='flex justify-between items-center w-full'>
						<div className='flex items-center gap-2 text-white'>
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
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
						{
							projects.length >= 0 ? (
								projects.map((project: any) => (
									<ProjectCard
										key={project.id}
										project={project}
										selectedWorkspaceId={selectedWorkspaceId}
									/>
								))
							) : null
						}
					</div>
				</div>
			</div>
		)
	)
}

interface ProjectCardProps {
	project: any;
	selectedWorkspaceId: string | null;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ project, selectedWorkspaceId }) => {
	return (
		<div className='flex items-start gap-2 border border-gray-200 px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-500  cursor-pointer h-20'
			onClick={() => window.location.href = `/workspace/${selectedWorkspaceId}/${project.uuid}`}
		>
			<div className='flex items-start gap-2'>
				<i className="fa-solid fa-project-diagram text-lg"></i>
				<p className='text-lg md:text-sm lg:text-lg font-medium text-white'>{project.title.length > 30 ? project.title.slice(0, 30) + '...' : project.title}</p>
			</div>
		</div>
	)
}

export default WorkspaceDetail;
