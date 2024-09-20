import { useState } from "react";
import { workspaceRepository } from "@/repositories/workspace";
import { closeModal } from "@/utils/utils";
import ErrorMessage from "../Common/ErrorMessage";
import CustomButton, { ButtonType } from "../Common/Button";
import InputField from "../InputField";

interface UpdateWorkspaceModalProps {
	workspace: any;
	setShowUpdateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>>;
	setRefetchWorkspace: React.Dispatch<React.SetStateAction<boolean>>;
	accessToken: string;
}

const UpdateWorkspaceModal: React.FC<UpdateWorkspaceModalProps> = ({
	workspace,
	setShowUpdateWorkspaceModal,
	setRefetchWorkspace,
	accessToken,
}) => {
	const [workspaceInfo, setWorkspaceInfo] = useState({
		title: workspace.title,
		description: workspace.description,
	});

	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		setWorkspaceInfo({
			...workspaceInfo,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (loading) return;

		setIsError(false);
		setErrorMessage('');
		setLoading(true);

		try {
			const response = await workspaceRepository.updateWorkspace(workspace.id, workspaceInfo, accessToken);
			console.log(response);
			setLoading(false);
			setIsError(false);
			setErrorMessage('');
			setShowUpdateWorkspaceModal(false);
			setRefetchWorkspace(true);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			setIsError(true);
			setErrorMessage(error.response.data.detail || 'Something went wrong');
		}
	};

	return (
		<div id="modal-bg" className='fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-10' onClick={(e) => closeModal(e, setShowUpdateWorkspaceModal)}>
			<div className='relative bg-[#333c44] w-3/5 max-h-[80%] p-4 rounded-md border shadow-md'>
				<div className='absolute top-4 right-4 flex items-center gap-2 cursor-pointer' onClick={() => setShowUpdateWorkspaceModal(false)}>
					<i className="fa-solid fa-xmark text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-md"></i>
				</div>
				<div className='flex items-center justify-center gap-2 p-2 text-2xl font-bold text-white'>
					<h1>Update Workspace</h1>
				</div>
				<form className='flex flex-col gap-4 w-full' onSubmit={(e) => handleSubmit(e)}>
					<InputField
						name="title"
						type="text"
						label="Workspace Title"
						value={workspaceInfo.title}
						onChange={(e) => handleChange(e)}
						isRequired={true}
						autoFocus={true}
					/>
					<InputField
						name="description"
						type="textarea"
						label="Workspace Description"
						value={workspaceInfo.description}
						onChange={(e) => handleChange(e)}
					/>
					{
						isError && <ErrorMessage errorMessage={errorMessage} />
					}
					<div className='w-fit flex justify-end gap-2'>
						<CustomButton
							text={loading ? 'Loading...' : 'Update Workspace'}
							type={ButtonType.Submit}
							className={"w-100"}
						/>
						<CustomButton
							text='Cancel'
							type={ButtonType.Button}
							style={{
								backgroundColor: "red",
							}}
							className={"w-100"}
							onClick={() => setShowUpdateWorkspaceModal(false)}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UpdateWorkspaceModal;
