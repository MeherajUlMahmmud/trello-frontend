import React, { useEffect, useState } from 'react';
import '../../styles/workspace.scss';

const WorkspaceDetail = ({ selectedWorkspaceId, setShowCreateProjectModal, setShowUpdateWorkspaceModal }: { selectedWorkspaceId: string, setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>, setShowUpdateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const [workspaceList, setWorkspaceList] = useState<any[]>([
		{
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
		},
		{
			id: 2,
			name: 'Workspace 2',
			description: 'Workspace 2 Description',
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
			]
		},
		{
			id: 3,
			name: 'Workspace 3',
			description: 'Workspace 3 Description',
			projects: [
				{
					id: 1,
					name: 'Project 1',
					description: 'Project 1 Description',
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
		},
		{
			id: 4,
			name: 'Workspace 4',
			description: 'Workspace 4 Description',
			projects: [
				{
					id: 1,
					name: 'Project 1',
					description: 'Project 1 Description',
				},
				{
					id: 4,
					name: 'Project 4',
					description: 'Project 4 Description',
				}
			]
		}
	]);
	const [currentWorkSpace, setCurrentWorkSpace] = useState<any>({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// filter workspaceList by selectedWorkspaceId
		const filteredWorkspaceList = workspaceList.filter((item) => item.id === selectedWorkspaceId);
		setCurrentWorkSpace(filteredWorkspaceList[0]);
		setIsLoading(false);
	}, [selectedWorkspaceId]);

	return (
		isLoading ? (
			<div className='workspaceDetail'>
				<div className='workspaceDetail__top_section'>
					<div className='top_section__img'>
						<img src='https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png' alt='workspace' />
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
							{currentWorkSpace.name}
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
							<button type='button' className='row btn'
								onClick={() => setShowCreateProjectModal(true)}
							>
								<i className="fa-solid fa-plus"></i>
								<p>Create Project</p>
							</button>
						</div>
					</div>
					<div className='bottom_section__content'>
						{
							currentWorkSpace.projects.map((project: any) => (
								<ProjectCard
									key={project.id}
									project={project}
									selectedWorkspaceId={selectedWorkspaceId}
								/>
							))
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
			onClick={() => window.location.href = `/workspace/${selectedWorkspaceId}`}
		>
			<div className='row'>
				<i className="fa-solid fa-circle-question"></i>
				<span>{project.name.length > 30 ? project.name.slice(0, 30) + '...' : project.name}</span>
			</div>
		</div>
	)
}

export default WorkspaceDetail