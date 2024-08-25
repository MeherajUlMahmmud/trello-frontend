import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { workspaceRepository } from '../../repositories/workspace';
import { handleAPIError } from '../../repositories/utils';
import { closeModal, logout } from '../../utils/utils';
import { loadLocalStorage } from '../../utils/persistLocalStorage';

import '../../styles/dashboard.scss';

import WorkspaceDetail from '../../components/Dashboard/WorkspaceDetail';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import CreateProjectModal from '../../components/Project/CreateProjectModal';

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
      const response = await workspaceRepository.getWorkspaces(workspaceFilters, tokens.access);
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
            workspaceList && workspaceList.length > 0 ? (
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
                  accessToken={tokens.access}
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
          selectedWorkspaceId={selectedWorkspaceId}
          accessToken={tokens.access}
        />
      }

      {
        showUpdateWorkspaceModal &&
        <UpdateWorkspaceModal
          workspace={workspaceList.find((item: any) => item.id === selectedWorkspaceId)}
          setShowUpdateWorkspaceModal={setShowUpdateWorkspaceModal}
        />
      }
    </>
  )
}

const UpdateWorkspaceModal = ({
  workspace, setShowUpdateWorkspaceModal }: { workspace: any, setShowUpdateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [workspaceInfo, setWorkspaceInfo] = useState({
    workspaceName: workspace.title,
    workspaceDescription: workspace.description,
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
            <div className='form__group'>
              <label htmlFor='workspaceName'>Workspace Name</label>
              <input type='text' placeholder='Workspace Name'
                name='workspaceName'
                value={workspaceInfo.workspaceName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='form__group'>
              <label htmlFor='workspaceDescription'>Workspace Description</label>
              <textarea placeholder='Workspace Description'
                name='workspaceDescription'
                value={workspaceInfo.workspaceDescription}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='form__actions'>
              <button type='submit' className='btn w-100'>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage