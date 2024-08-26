import React from 'react'
import Button from '../Common/Button'
import { ButtonType } from '../../types/Button'

interface WorkspaceSidebarProps {
	workspace: any;
	projectList: any[];
	selectedProjectId: string;
	showSidebar: boolean;
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
	setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProjectCardProps {
	project: any;
	isActive: boolean;
	workspaceId: string;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ workspace, projectList, selectedProjectId, showSidebar, setShowSidebar, setShowCreateProjectModal }) => {
	return (
		<div className='workspaceSidebar'>
			<div className='workspaceSidebar__header'>
				<div className='row'>
					<img src='https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png' alt='workspace' />
					<p>
						{workspace.title}
					</p>
				</div>
				<div className='collapse_icon'
					onClick={() => setShowSidebar(!showSidebar)}
				>
					<i className="fa-solid fa-chevron-left"></i>
				</div>
			</div>
			<div></div>
			<div className='projectList'>
				<div className='projectList__header'>
					<p>
						Projects
					</p>
					<Button
						icon='fa-solid fa-plus'
						type={ButtonType.Button}
						className=''
						onClick={() => setShowCreateProjectModal(true)}
						style={{
							backgroundColor: 'transparent',
						}}
					/>
				</div>
				<div className='projectList__content'>
					{
						projectList && projectList?.length > 0 && projectList.map((project: any) => (
							<ProjectCard
								key={project.id}
								project={project}
								isActive={project.uuid === selectedProjectId}
								workspaceId={workspace.id}
							/>
						))
					}
				</div>
			</div>
		</div>
	)
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive, workspaceId }) => {
	return (
		<a
			href={`/workspace/${workspaceId}/${project.uuid}`}
			className={`projectCard ${isActive ? 'active' : ''}`}>
			<img
				src='https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png'
				alt='workspace' />
			<p>
				{project.title.length > 20 ? project.title.slice(0, 20) + '...' : project.title}
			</p>
		</a>
	)
}

export default WorkspaceSidebar;
