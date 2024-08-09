export interface DropdownItem {
	id: number;
	name: string;
	icon: string;
}

export interface NavbarDropdownProps {
	title: string;
	items: DropdownItem[];
}

export interface NavbarButtonProps {
	text: string;
	onClick?: () => void;
}

export interface SidebarActionItem {
	id: number;
	name: string;
	icon: string;
	url: string;
}

export interface SidebarActionProps {
	item: SidebarActionItem;
}
