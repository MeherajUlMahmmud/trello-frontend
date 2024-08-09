import React, { useState } from 'react'
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import '../../styles/dashboard.scss';
import WorkspaceDetail from '../../components/Dashboard/WorkspaceDetail';
import { closeModal } from '../../utils/utils';

const DashboardPage = () => {
  const [workspaceList] = useState<any[]>([
    {
      id: 1,
      name: 'Workspace 1',
      description: 'Workspace 1 Description',
    },
    {
      id: 2,
      name: 'Workspace 2',
      description: 'Workspace 2 Description',
    },
    {
      id: 3,
      name: 'Workspace 3',
      description: 'Workspace 3 Description',
    },
    {
      id: 4,
      name: 'Workspace 4',
      description: 'Workspace 4 Description',
    }
  ]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<any>(workspaceList[0].id);

  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showUpdateWorkspaceModal, setShowUpdateWorkspaceModal] = useState(false);

  return (
    <>
      <div className='maxWidth dashboardPage'>
        <DashboardSidebar
          workspaceList={workspaceList}
          selectedWorkspaceId={selectedWorkspaceId}
          setSelectedWorkspaceId={setSelectedWorkspaceId}
        />
        <WorkspaceDetail
          selectedWorkspaceId={selectedWorkspaceId}
          setShowCreateProjectModal={setShowCreateProjectModal}
          setShowUpdateWorkspaceModal={setShowUpdateWorkspaceModal}
        />
      </div>
      {
        showCreateProjectModal &&
        <CreateProjectModal
          setShowCreateProjectModal={setShowCreateProjectModal}
        />
      }

      {
        showUpdateWorkspaceModal &&
        <UpdateWorkspaceModal
          setShowUpdateWorkspaceModal={setShowUpdateWorkspaceModal}
        />
      }
    </>
  )
}

const CreateProjectModal = ({ setShowCreateProjectModal }: { setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [projectInfo, setProjectInfo] = useState({
    projectName: '',
    projectDescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setProjectInfo({
      ...projectInfo,
      [e.target.name]: e.target.value,
    });
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
          <div className='modal__body__form'>
            <input type='text' placeholder='Project Name'
              name='projectName'
              value={projectInfo.projectName}
              onChange={(e) => handleChange(e)}
            />
            <textarea placeholder='Project Description'
              name='projectDescription'
              value={projectInfo.projectDescription}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const UpdateWorkspaceModal = ({ setShowUpdateWorkspaceModal }: { setShowUpdateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [workspaceInfo, setWorkspaceInfo] = useState({
    workspaceName: '',
    workspaceDescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorkspaceInfo({
      ...workspaceInfo,
      [e.target.name]: e.target.value,
    });
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
          <div className='modal__body__form'>
            <input type='text' placeholder='Workspace Name'
              name='workspaceName'
              value={workspaceInfo.workspaceName}
              onChange={(e) => handleChange(e)}
            />
            <textarea placeholder='Workspace Description'
              name='workspaceDescription'
              value={workspaceInfo.workspaceDescription}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage