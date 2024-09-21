import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { workspaceRepository } from '@/repositories/workspace';
import { handleAPIError } from '@/repositories/utils';
import { logout } from '@/utils/utils';
import { loadLocalStorage } from '@/utils/persistLocalStorage';

import WorkspaceDetail from '@/components/Dashboard/WorkspaceDetail';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import CreateWorkspaceModal from '@/components/Workspace/CreateWorkspaceModal';
import UpdateWorkspaceModal from '@/components/Workspace/UpdateWorkspaceModal';
import CreateProjectModal from '@/components/Workspace/CreateProjectModal';
import Spinner from '@/components/Loading/Spinner';
import Toast from '@/components/Toast';
import { ToastPosition } from '@/utils/toast';

const DashboardPage = () => {
  const navigate = useNavigate();

  const [toastList, setToastList] = useState<any[]>([]);

  const user = loadLocalStorage('user');
  const tokens = loadLocalStorage('tokens');

  const workspaceFilters = {
    is_active: true,
    is_deleted: false,
  }

  const [workspaceList, setWorkspaceList] = useState<any[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);
  const [focusedWorkspaceId, setFocusedWorkspaceId] = useState<string | null>(null);

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
      const data = response.data.data;

      setWorkspaceList(data);

      if (data.length > 0) {
        const firstWorkspaceId = data[0].id;
        setSelectedWorkspaceId(firstWorkspaceId);
        setFocusedWorkspaceId(firstWorkspaceId);
      }
      setIsLoading(false);
    } catch (error: any) {
      handleAPIError(error, navigate);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex justify-center gap-4 p-2 max-w-7xl mx-auto w-full'>
        {isLoading ? (
          <div className='flex flex-col gap-4 w-full'>
            <Spinner />
          </div>
        ) : workspaceList && workspaceList.length > 0 ? (
          <>
            <DashboardSidebar
              workspaceList={workspaceList}
              selectedWorkspaceId={selectedWorkspaceId}
              setSelectedWorkspaceId={setSelectedWorkspaceId}
              setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
              focusedWorkspaceId={focusedWorkspaceId}
              setFocusedWorkspaceId={setFocusedWorkspaceId}
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
          <div className='flex justify-center gap-4 p-2 max-w-7xl mx-auto w-full'>
            <h1>No Workspaces</h1>
          </div>
        )}
      </div>
      {
        showCreateProjectModal &&
        <CreateProjectModal
          setShowCreateProjectModal={setShowCreateProjectModal}
          selectedWorkspaceId={selectedWorkspaceId}
          setRefetchProject={setRefetchProject}
          accessToken={tokens.access}
          toastList={toastList}
          setToastList={setToastList}
        />
      }

      {
        showCreateWorkspaceModal &&
        <CreateWorkspaceModal
          setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
          setRefetchWorkspace={setRefetchWorkspace}
          accessToken={tokens.access}
          toastList={toastList}
          setToastList={setToastList}
        />
      }

      {
        showUpdateWorkspaceModal &&
        <UpdateWorkspaceModal
          workspace={workspaceList.find((item: any) => item.id === selectedWorkspaceId)}
          setShowUpdateWorkspaceModal={setShowUpdateWorkspaceModal}
          setRefetchWorkspace={setRefetchWorkspace}
          accessToken={tokens.access}
          toastList={toastList}
          setToastList={setToastList}
        />
      }
      <Toast
        toastList={toastList}
        position={ToastPosition.TopRight}
      />
    </>
  )
}

export default DashboardPage;
