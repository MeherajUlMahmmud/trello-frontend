import { SidebarActionItem } from '../../types/Navbar';

const SidebarAction = (props: { item: SidebarActionItem }) => {
	const { item } = props;

	return (
		<div className='dashboardSidebar__action'
			onClick={() => {
				window.location.href = item.url;
			}}
		>
			<i className={item.icon}></i>
			<span>
				{item.name}
			</span>
		</div>
	)
}

export default SidebarAction