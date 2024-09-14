import React from 'react'
import CustomButton, { ButtonType } from '../Common/Button';

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
		<div className='flex flex-col gap-2 w-[300px] h-screen bg-gray-800 p-5'>
			<div className='flex justify-between items-center w-full'>
				<div className='flex items-center gap-2'>
					<img className='w-12 h-12' src='https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png' alt='workspace' />
					<p className='text-lg font-medium text-white'>
						{workspace.title}
					</p>
				</div>
				<div className='flex items-center justify-center text-white p-2 rounded-full cursor-pointer w-8 hover:bg-gray-500'
					onClick={() => setShowSidebar(!showSidebar)}
				>
					<i className="fa-solid fa-chevron-left"></i>
				</div>
			</div>
			<hr className='border-gray-500' />
			<div className='flex flex-col gap-2 w-full'>
				<div className='flex justify-between items-center w-full'>
					<p className='text-sm font-medium text-white'>
						Projects
					</p>
					<CustomButton
						icon='fa-solid fa-plus'
						type={ButtonType.Button}
						className='bg-white text-black'
						onClick={() => setShowCreateProjectModal(true)}
					/>
				</div>
				<div className='flex flex-col gap-3 w-full'>
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
			className={`flex items-center gap-2 ${isActive ? 'active' : ''}`}>
			<img className='w-8 h-8'
				src='https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png'
				alt='workspace' />
			<p className='text-md font-medium text-white'>
				{project.title.length > 20 ? project.title.slice(0, 20) + '...' : project.title}
			</p>
		</a>
	)
}

export default WorkspaceSidebar;
