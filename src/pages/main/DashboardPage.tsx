import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { workspaceRepository } from '../../repositories/workspace';
import { handleAPIError } from '../../repositories/utils';
import { logout } from '../../utils/utils';
import { loadLocalStorage } from '../../utils/persistLocalStorage';

import '../../styles/dashboard.scss';

import WorkspaceDetail from '../../components/Dashboard/WorkspaceDetail';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import CreateProjectModal from '../../components/Project/CreateProjectModal';
import CreateWorkspaceModal from '../../components/Workspace/CreateWorkspaceModal';
import UpdateWorkspaceModal from '../../components/Workspace/UpdateWorkspaceModal';

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
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showUpdateWorkspaceModal, setShowUpdateWorkspaceModal] = useState(false);

  const [refetchWorkspace, setRefetchWorkspace] = useState(false);
  const [refetchProject, setRefetchProject] = useState(false);

  useEffect(() => {
    if (!user || !tokens) {
      logout(navigate);
    }
  }, [navigate]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    if (refetchWorkspace) {
      fetchWorkspaces();
      setRefetchWorkspace(false);
    }
  }, [refetchWorkspace]);

  const fetchWorkspaces = async () => {
    try {
      const response = await workspaceRepository.getWorkspaces(workspaceFilters, tokens.access);
      console.log('Workspace list data', response);
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
                  setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
                />
                <WorkspaceDetail
                  selectedWorkspaceId={selectedWorkspaceId}
                  setShowCreateProjectModal={setShowCreateProjectModal}
                  setShowUpdateWorkspaceModal={setShowUpdateWorkspaceModal}
                  refetchProject={refetchProject}
                  setRefetchProject={setRefetchProject}
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
          setRefetchProject={setRefetchProject}
          accessToken={tokens.access}
        />
      }

      {
        showCreateWorkspaceModal &&
        <CreateWorkspaceModal
          setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
          setRefetchWorkspace={setRefetchWorkspace}
          accessToken={tokens.access}
        />
      }

      {
        showUpdateWorkspaceModal &&
        <UpdateWorkspaceModal
          workspace={workspaceList.find((item: any) => item.id === selectedWorkspaceId)}
          setShowUpdateWorkspaceModal={setShowUpdateWorkspaceModal}
          setRefetchWorkspace={setRefetchWorkspace}
          accessToken={tokens.access}
        />
      }
    </>
  )
}

export default DashboardPage;
