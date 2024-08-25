import React, { useEffect, useState } from 'react';
import '../../styles/workspace.scss';
import { workspaceRepository } from '../../repositories/workspace';
import { handleAPIError } from '../../repositories/utils';
import { useNavigate } from 'react-router-dom';
import { projectRepository } from '../../repositories/project';
import Button from '../Common/Button';
import { ButtonType } from '../../types/Button';

const WorkspaceDetail = ({ selectedWorkspaceId, setShowCreateProjectModal, setShowUpdateWorkspaceModal, accessToken }: { selectedWorkspaceId: string, setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>, setShowUpdateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>>, accessToken: string }) => {
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
		fetchWorkspaceDetails();
	}, [selectedWorkspaceId]);

	const fetchWorkspaceDetails = async () => {
		try {
			const response = await workspaceRepository.getWorkspace(selectedWorkspaceId, accessToken);
			console.log(response);
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
			console.log(response);
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
						<h1>
							{currentWorkSpace.title}
						</h1>
						<i className="fa-solid fa-pen" onClick={() => setShowUpdateWorkspaceModal(true)}></i>
					</div>
				</div>
				<hr />
				<div className='workspaceDetail__bottom_section'>
					<div className='bottom_section__header'>
						<div className='row space-between w-100'>
							<div className='row'>
								<i className="fa-solid fa-tasks"></i>
								<h1>Your Projects</h1>
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

const ProjectCard = ({ project, selectedWorkspaceId }: { project: any, selectedWorkspaceId: string }) => {
	return (
		<div className='bottom_section__content_item'
			onClick={() => window.location.href = `/workspace/${selectedWorkspaceId}/${project.uuid}`}
		>
			<div className='row'>
				<i className="fa-solid fa-circle-question"></i>
				<span>{project.title.length > 30 ? project.title.slice(0, 30) + '...' : project.title}</span>
			</div>
		</div>
	)
}

export default WorkspaceDetail