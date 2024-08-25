import { useState } from "react";
import ErrorMessage from "../Common/ErrorMessage";
import { projectRepository } from "../../repositories/project";
import { closeModal } from "../../utils/utils";
import Button from "../Common/Button";
import { ButtonType } from "../../types/Button";

const CreateProjectModal = ({ setShowCreateProjectModal, selectedWorkspaceId, accessToken }: { setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>, selectedWorkspaceId: string, accessToken: string }) => {
	const [projectInfo, setProjectInfo] = useState({
		title: '',
		description: '',
		workspace: selectedWorkspaceId,
	});

	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		setProjectInfo({
			...projectInfo,
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
			const response = await projectRepository.createProject(projectInfo, accessToken);
			console.log(response);
			setLoading(false);
			setIsError(false);
			setErrorMessage('');
			setShowCreateProjectModal(false);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			setIsError(true);
			setErrorMessage(error.response.data.detail || 'Something went wrong');
		}
	};

	return (
		<div className='modal__wrapper' onClick={(e) => closeModal(e, setShowCreateProjectModal)}>
			<div className='modal'>
				<div className='closeModal' onClick={() => setShowCreateProjectModal(false)}>
					<i className="fa-solid fa-xmark"></i>
				</div>
				<div className='modal__header'>
					<h1>Create Project</h1>
				</div>
				<div className='modal__body'>
					<form className='modal__body__form' onSubmit={(e) => handleSubmit(e)}>
						<div className='form__group'>
							<label htmlFor='title'>Project Title</label>
							<input type='text' placeholder='Project Title'
								name='title'
								value={projectInfo.title}
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>
						<div className='form__group'>
							<label htmlFor='description'>Project Description</label>
							<textarea placeholder='Project Description'
								name='description'
								value={projectInfo.description}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						{/* <div className='form__group'>
              <label htmlFor='projectImage'>Project Image</label>
              <input type='file' name='projectImage'
                onChange={(e) => handleChange(e)}
              />
            </div> */}
						{
							isError && <ErrorMessage errorMessage={errorMessage} />
						}
						<div className='form__actions'>
							<Button
								text={loading ? 'Loading...' : 'Create'}
								type={ButtonType.Submit}
								onClick={() => setShowCreateProjectModal(false)}
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

export default CreateProjectModal;
