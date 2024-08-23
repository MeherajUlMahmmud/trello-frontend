import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { workspaceRepository } from '../../repositories/workspace';
import { handleAPIError } from '../../repositories/utils';
import { closeModal, logout } from '../../utils/utils';
import { loadLocalStorage } from '../../utils/persistLocalStorage';

import '../../styles/dashboard.scss';

import WorkspaceDetail from '../../components/Dashboard/WorkspaceDetail';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';

const DashboardPage = () => {
  const navigate = useNavigate();

  const user = loadLocalStorage('user');
  const tokens = loadLocalStorage('tokens');

  const workspaceFilters = {
    is_active: true,
    is_deleted: false,
  }

  const [workspaceList, setWorkspaceList] = useState<any[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showUpdateWorkspaceModal, setShowUpdateWorkspaceModal] = useState(false);

  useEffect(() => {
    if (!user || !tokens) {
      logout(navigate);
    }
  }, [navigate]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await workspaceRepository.getWorkspaces(workspaceFilters);
      console.log(response);
      const data = response.data.data;

      setWorkspaceList(data);

      if (data.length > 0) {
        setSelectedWorkspaceId(response.data.data[0].id);
      }
      setIsLoading(false);
    } catch (error: any) {
      handleAPIError(error, navigate);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='maxWidth dashboardPage'>

        {
          isLoading ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            workspaceList.length > 0 ? (
              <>
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
              </>
            ) : (
              <div className='maxWidth'>
                <h1>No Workspaces</h1>
              </div>
            )
          )
        }
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