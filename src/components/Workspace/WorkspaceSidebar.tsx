import React from 'react'

const WorkspaceSidebar = ({ workspace, projectList, showSidebar, setShowSidebar }: { workspace: any, projectList: any[], showSidebar: boolean, setShowSidebar: React.Dispatch<React.SetStateAction<boolean>> }) => {
	return (
		<div className='workspaceSidebar'>
			<div className='workspaceSidebar__header'>
				<div className='row'>
					<img src='https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png' alt='workspace' />
					<p>
						{workspace.name}
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
					<i className="fa-solid fa-plus"></i>
				</div>
				<div className='projectList__content'>
					{
						projectList && projectList?.length > 0 && projectList.map((project: any) => (
							<ProjectCard
								key={project.id}
								project={project}
							/>
						))
					}
				</div>
			</div>
		</div>
	)
}

const ProjectCard = ({ project }: { project: any }) => {
	return (
		<div className='projectCard'>
			<img src='https://trello-logos.s3.amazonaws.com/c95e52bc93e8086fa1ab432d40ef5300/170.png' alt='workspace' />
			<p>{project.name.length > 20 ? project.name.slice(0, 20) + '...' : project.name}</p>
		</div>
	)
}

export default WorkspaceSidebar;
