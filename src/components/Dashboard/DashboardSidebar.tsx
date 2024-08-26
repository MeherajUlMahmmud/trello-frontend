import { ButtonType } from '../../types/Button'
import Button from '../Common/Button'
import WorkspaceDropdown from './WorkspaceDropdown'

interface DashboardSidebarProps {
	workspaceList: any[];
	selectedWorkspaceId: string;
	setSelectedWorkspaceId: React.Dispatch<React.SetStateAction<any>>;
	setShowCreateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ workspaceList, selectedWorkspaceId, setSelectedWorkspaceId, setShowCreateWorkspaceModal }) => {
	return (
		<div className='dashboardSidebar'>
			<div className='dashboardSidebar__workspaces'>
				<div className='dashboardSidebar__workspaces__header'>
					<p>
						Workspaces
					</p>
					<Button
						icon='fa-solid fa-plus'
						type={ButtonType.Button}
						className=''
						onClick={() => setShowCreateWorkspaceModal(true)}
						style={{
							backgroundColor: 'transparent',
						}}
					/>
				</div>
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

export default DashboardSidebar;
