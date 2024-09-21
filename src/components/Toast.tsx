import React, { useState, useEffect } from "react";
import { ToastStyles } from "@/utils/styles";
import { ToastPosition } from "@/utils/toast";

interface ToastItem {
	id: number;
	title: string;
	description: string;
	backgroundColor: string;
	icon: string;
}

interface ToastProps {
	toastList: ToastItem[];
	position?: ToastPosition;
	autoDelete?: boolean;
	autoDeleteTime?: number;
}

const Toast: React.FC<ToastProps> = ({
	toastList,
	position = ToastPosition.TopRight,
	autoDelete = true,
	autoDeleteTime = 3500,
}) => {
	const [toasts, setToasts] = useState<ToastItem[]>(toastList);

	// Update list whenever toastList changes
	useEffect(() => {
		setToasts(toastList);
	}, [toastList]);

	// Handle auto-delete functionality
	useEffect(() => {
		if (autoDelete) {
			const interval = setInterval(() => {
				if (toastList.length && toasts.length) {
					deleteToast(toasts[0].id);
				}
			}, autoDeleteTime);

			return () => clearInterval(interval);
		}
	}, [toasts, autoDelete, autoDeleteTime]);

	// Delete toast by ID
	const deleteToast = (id: number) => {
		const listItemIndex = toasts.findIndex((e) => e.id === id);
		const toastListItem = toastList.findIndex((e) => e.id === id);
		toasts.splice(listItemIndex, 1);
		toastList.splice(toastListItem, 1);
		setToasts([...toasts]);
	};

	// Tailwind CSS position classes mapping
	const positionClassMap = {
		[ToastPosition.TopRight]: "top-4 right-4",
		[ToastPosition.TopLeft]: "top-4 left-4",
		[ToastPosition.BottomRight]: "bottom-4 right-4",
		[ToastPosition.BottomLeft]: "bottom-4 left-4",
	};

	return (
		<div className={`${ToastStyles.toastWrapper} ${positionClassMap[position]} `}>
			{toasts.map((toast: ToastItem) => (
				<div
					key={toast.id}
					className={`${ToastStyles.toast} `}
					style={{ backgroundColor: toast.backgroundColor }}
				>
					<button
						onClick={() => deleteToast(toast.id)}
						className={`${ToastStyles.closeButton}`}
					>
						&times;
					</button>
					<div className={`${ToastStyles.toastIconWrapper}`}>
						<img
							src={toast.icon}
							alt="Toast Icon"
							className={`${ToastStyles.toastIcon}`}
						/>
					</div>
					<div className={`${ToastStyles.toastContentWrapper}`}>
						<p className={`${ToastStyles.toastTitle}`}>{toast.title}</p>
						<p className={`${ToastStyles.toastDescription}`}>{toast.description}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Toast;
