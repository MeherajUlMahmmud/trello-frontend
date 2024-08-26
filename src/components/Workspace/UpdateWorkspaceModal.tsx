import { useState } from "react";
import { workspaceRepository } from "../../repositories/workspace";
import { ButtonType } from "../../types/Button";
import { closeModal } from "../../utils/utils";
import Button from "../Common/Button";
import ErrorMessage from "../Common/ErrorMessage";

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
		<div className='modal__wrapper' onClick={(e) => closeModal(e, setShowUpdateWorkspaceModal)}>
			<div className='modal'>
				<div className='closeModal' onClick={() => setShowUpdateWorkspaceModal(false)}>
					<i className="fa-solid fa-xmark"></i>
				</div>
				<div className='modal__header'>
					<h1>Update Workspace</h1>
				</div>
				<div className='modal__body'>
					<form className='modal__body__form' onSubmit={(e) => handleSubmit(e)}>
						<div className='form__group'>
							<label htmlFor='title'>Workspace Title</label>
							<input type='text' placeholder='Workspace Title'
								name='title'
								value={workspaceInfo.title}
								onChange={(e) => handleChange(e)}
								required
								autoFocus
							/>
						</div>
						<div className='form__group'>
							<label htmlFor='description'>Workspace Description</label>
							<textarea placeholder='Workspace Description'
								name='description'
								value={workspaceInfo.description}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						{
							isError && <ErrorMessage errorMessage={errorMessage} />
						}
						<div className='form__actions'>
							<Button
								text={loading ? 'Loading...' : 'Update Workspace'}
								type={ButtonType.Submit}
								isDisabled={loading}
								style={{
									backgroundColor: '#007bff',
								}}
								className={"w-100"}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default UpdateWorkspaceModal;
