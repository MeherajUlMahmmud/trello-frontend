import CustomButton from '../Common/Button';
import { ButtonType } from '../Common/Button'
import WorkspaceDropdown from './WorkspaceDropdown'

interface DashboardSidebarProps {
	workspaceList: any[];
	selectedWorkspaceId: string;
	setSelectedWorkspaceId: React.Dispatch<React.SetStateAction<any>>;
	setShowCreateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ workspaceList, selectedWorkspaceId, setSelectedWorkspaceId, setShowCreateWorkspaceModal }) => {
	return (
		<div className='p-5 w-72'>
			<div className='flex flex-col items-center gap-2 w-full'>
				<div className='flex justify-between items-center gap-2 text-lg w-full'>
					<p className='text-sm font-medium'>
						Workspaces
					</p>
					<CustomButton
						icon='fa-solid fa-plus'
						type={ButtonType.Button}
						className='m-0 px-4 py-2 text-sm font-medium'
						onClick={() => setShowCreateWorkspaceModal(true)}
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
