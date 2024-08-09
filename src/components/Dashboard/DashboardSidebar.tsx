import WorkspaceDropdown from './WorkspaceDropdown'

const DashboardSidebar = ({ workspaceList, selectedWorkspaceId, setSelectedWorkspaceId }: { workspaceList: any[], selectedWorkspaceId: string, setSelectedWorkspaceId: React.Dispatch<React.SetStateAction<any>> }) => {

	// const sidebarActionList: SidebarActionItem[] = [
	// 	{
	// 		id: 1,
	// 		name: 'Projects',
	// 		icon: 'fa-solid fa-tasks',
	// 		url: '/username/boards'
	// 	},
	// ];

	return (
		<div className='dashboardSidebar'>
			{/* <div className='dashboardSidebar__actions'>
				{
					sidebarActionList.map((item, index) => (
						<SidebarAction
							key={index}
							item={item}
						/>
					))
				}
			</div>
			<hr /> */}
			<div className='dashboardSidebar__workspaces'>
				<small>
					Workspaces
				</small>
				{
					workspaceList.map((item, index) => (
						<WorkspaceDropdown
							key={index}
							item={item}
							selectedWorkspaceId={selectedWorkspaceId}
							setSelectedWorkspaceId={setSelectedWorkspaceId}
						/>
					))
				}
			</div>
		</div>
	)
}

export default DashboardSidebar