import { useEffect, useState } from "react";
import { projectRepository } from "@/repositories/project";
import { closeModal } from "@/utils/utils";
import CustomButton, { ButtonType } from "../CustomButton";
import InputField from "../InputField";
import { ModalStyles } from "@/utils/styles";
import { AppConstants } from "@/utils/constants";
import { createToastMessage, ToastType } from "@/utils/toast";

interface CreateProjectModalProps {
	setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
	selectedWorkspaceId: string | null;
	setRefetchProject: React.Dispatch<React.SetStateAction<boolean>>;
	accessToken: string;
	toastList: any[];
	setToastList: React.Dispatch<React.SetStateAction<any[]>>;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ setShowCreateProjectModal,
	selectedWorkspaceId,
	setRefetchProject,
	accessToken,
	toastList,
	setToastList,
}) => {
	const [projectInfo, setProjectInfo] = useState({
		data: {
			title: '',
			description: '',
			workspace: selectedWorkspaceId,
		},
		isLoading: false,
	});
	const [projectImage, setProjectImage] = useState<File | null>(null);
	const [projectImagePreview, setProjectImagePreview] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		setProjectInfo({
			...projectInfo,
			data: {
				...projectInfo.data,
				[e.target.name]: e.target.value
			}
		});
	};

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setProjectImage(e.target.files[0]);
		}
	};

	const handleImageClear = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setProjectImage(null);
		setProjectImagePreview('');
	};

	useEffect(() => {
		if (projectImage) {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				setProjectImagePreview(e.target.result); // Set the preview URL
			};
			reader.readAsDataURL(projectImage); // Read the selected image as a data URL
		} else {
			setProjectImagePreview(''); // Clear preview if no image is selected
		}
	}, [projectImage]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (projectInfo.isLoading) return;

		setProjectInfo({ ...projectInfo, isLoading: true, });

		try {
			const formData = new FormData();
			formData.append('title', projectInfo.data.title);
			formData.append('description', projectInfo.data.description);

			if (projectInfo.data.workspace === null || projectInfo.data.workspace === undefined) {
				createToastMessage({
					type: ToastType.Error,
					title: 'Failed to Create Project',
					description: 'Please select a workspace',
					toastList,
					setToastList
				});
				return;
			}
			formData.append('workspace', projectInfo.data.workspace);

			if (projectImage) {
				formData.append('image', projectImage);
			}

			await projectRepository.createProject(formData, accessToken);

			setProjectInfo({
				data: {
					title: '',
					description: '',
					workspace: selectedWorkspaceId,
				},
				isLoading: false,
			});
			setProjectImage(null);
			setProjectImagePreview('');

			setShowCreateProjectModal(false);
			setRefetchProject(true);
		} catch (error: any) {
			console.log(error);
			setProjectInfo({ ...projectInfo, isLoading: false });
			createToastMessage({
				type: ToastType.Error,
				title: 'Failed to Create Project',
				description: error.response.data.detail || AppConstants.genericErrorMessage,
				toastList,
				setToastList
			});
		}
	};

	return (
		<div id="modal-bg" className={`${ModalStyles.modalBg}`} onClick={(e) => closeModal(e, setShowCreateProjectModal)}>
			<div className={`${ModalStyles.modalContent}`}>
				<div className={`${ModalStyles.modalCloseButtonWrapper}`} onClick={() => setShowCreateProjectModal(false)}>
					<i className={`${ModalStyles.modalCloseButton}`} />
				</div>
				<div className={`${ModalStyles.modalHeaderWrapper}`}>
					<h1 className={`${ModalStyles.modalTitle}`}>Create Project</h1>
				</div>
				<form className='flex flex-col gap-4 w-full' onSubmit={(e) => handleSubmit(e)}>
					<InputField
						name="title"
						type="text"
						label="Project Title"
						value={projectInfo.data.title}
						onChange={(e) => handleChange(e)}
						isRequired={true}
						autoFocus={true}
					/>
					<InputField
						name="description"
						type="textarea"
						label="Project Description"
						value={projectInfo.data.description}
						onChange={(e) => handleChange(e)}
					/>
					<InputField
						name="image"
						type="file"
						label="Project Image"
						onChange={(e) => handleChangeImage(e)}
					/>
					<div className="flex justify-center items-center gap-2 p-2 text-2xl font-bold text-white">
						<div className='flex flex-col items-center gap-2 w-[50%]'>
							<span className='text-sm font-medium text-white'>
								Selected New Image
							</span>
							{projectImagePreview ? (
								<>
									<img
										src={projectImagePreview}
										alt="Project Image"
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
							text={projectInfo.isLoading ? 'Loading...' : 'Create Project'}
							type={ButtonType.Submit}
							className={"w-100"}
						/>
						<CustomButton
							text='Cancel'
							type={ButtonType.Button}
							className={"w-100 bg-red-500 hover:bg-red-600"}
							onClick={() => setShowCreateProjectModal(false)}
							icon="fa-solid fa-xmark"
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateProjectModal;
