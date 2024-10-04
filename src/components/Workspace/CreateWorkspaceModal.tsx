import React, { useEffect, useState } from "react";
import { workspaceRepository } from "@/repositories/workspace";
import { closeModal } from "@/utils/utils";
import CustomButton, { ButtonType } from "../Common/CustomButton";
import InputField from "../Common/InputField";
import { ModalStyles } from "@/utils/styles";
import { AppConstants } from "@/utils/constants";
import { createToastMessage, ToastType } from "@/utils/toast";

interface CreateWorkspaceModalProps {
	setShowCreateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>>;
	setRefetchWorkspace: React.Dispatch<React.SetStateAction<boolean>>;
	accessToken: string;
	toastList: any[];
	setToastList: React.Dispatch<React.SetStateAction<any[]>>;
}

const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({
	setShowCreateWorkspaceModal,
	setRefetchWorkspace,
	accessToken,
	toastList,
	setToastList,
}) => {
	const [workspaceInfo, setWorkspaceInfo] = useState({
		data: {
			title: '',
			description: '',
		},
		isLoading: false,
	});
	const [workspaceImage, setWorkspaceImage] = useState<File | null>(null);
	const [workspaceImagePreview, setWorkspaceImagePreview] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		setWorkspaceInfo({
			...workspaceInfo,
			data: {
				...workspaceInfo.data,
				[e.target.name]: e.target.value
			}
		});
	};

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setWorkspaceImage(e.target.files[0]);
		}
	};

	const handleImageClear = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setWorkspaceImage(null);
		setWorkspaceImagePreview('');
	};

	useEffect(() => {
		if (workspaceImage) {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				setWorkspaceImagePreview(e.target.result); // Set the preview URL
			};
			reader.readAsDataURL(workspaceImage); // Read the selected image as a data URL
		} else {
			setWorkspaceImagePreview(''); // Clear preview if no image is selected
		}
	}, [workspaceImage]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (workspaceInfo.isLoading) return;

		setWorkspaceInfo({ ...workspaceInfo, isLoading: true, });

		try {
			const formData = new FormData();
			formData.append('title', workspaceInfo.data.title);
			formData.append('description', workspaceInfo.data.description);
			if (workspaceImage) {
				formData.append('image', workspaceImage);
			}

			await workspaceRepository.createWorkspace(formData, accessToken);

			setWorkspaceInfo({ data: { title: '', description: '' }, isLoading: false });
			setWorkspaceImage(null);
			setWorkspaceImagePreview('');

			setShowCreateWorkspaceModal(false);
			setRefetchWorkspace(true);
		} catch (error: any) {
			console.log(error);
			setWorkspaceInfo({ ...workspaceInfo, isLoading: false });
			createToastMessage({
				type: ToastType.Error,
				title: 'Failed to Create Workspace',
				description: error.response.data.detail || AppConstants.genericErrorMessage,
				toastList,
				setToastList
			});
		}
	};

	return (
		<div id="modal-bg" className={`${ModalStyles.modalBg}`} onClick={(e) => closeModal(e, setShowCreateWorkspaceModal)}>
			<div className={`${ModalStyles.modalContent}`}>
				<div className={`${ModalStyles.modalCloseButtonWrapper}`} onClick={() => setShowCreateWorkspaceModal(false)}>
					<i className={`${ModalStyles.modalCloseButton}`} />
				</div>
				<div className={`${ModalStyles.modalHeaderWrapper}`}>
					<h1 className={`${ModalStyles.modalTitle}`}>Create Workspace</h1>
				</div>
				<form className='flex flex-col gap-4 w-full' onSubmit={(e) => handleSubmit(e)}>
					<InputField
						name="title"
						type="text"
						label="Workspace Title"
						value={workspaceInfo.data.title}
						onChange={(e) => handleChange(e)}
						isRequired={true}
						autoFocus={true}
					/>
					<InputField
						name="description"
						type="textarea"
						label="Workspace Description"
						value={workspaceInfo.data.description}
						onChange={(e) => handleChange(e)}
					/>
					<InputField
						name="image"
						type="file"
						label="Workspace Image"
						onChange={(e) => handleChangeImage(e)}
					/>
					<div className="flex justify-center items-center gap-2 p-2 text-2xl font-bold text-white">
						<div className='flex flex-col items-center gap-2 w-[50%]'>
							<span className='text-sm font-medium text-white'>
								Selected New Image
							</span>
							{workspaceImagePreview ? (
								<>
									<img
										src={workspaceImagePreview}
										alt="Workspace Image"
										className="w-32 h-32 object-cover rounded-full"
									/>
									<CustomButton
										text='Clear Image'
										type={ButtonType.Button}
										className={"w-100 bg-red-500 hover:bg-red-600"}
										onClick={(e) => handleImageClear(e)}
										icon="fa-solid fa-xmark"
									/>
								</>
							) : (
								<p className="text-sm font-medium text-red-300">No image selected</p>
							)}
						</div>
					</div>

					<div className={`${ModalStyles.modalActionsWrapper}`}>
						<CustomButton
							text={workspaceInfo.isLoading ? 'Loading...' : 'Create Workspace'}
							type={ButtonType.Submit}
							className={"w-100"}
						/>
						<CustomButton
							text='Cancel'
							type={ButtonType.Button}
							className={"w-100 bg-red-500 hover:bg-red-600"}
							onClick={() => setShowCreateWorkspaceModal(false)}
							icon="fa-solid fa-xmark"
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateWorkspaceModal;
