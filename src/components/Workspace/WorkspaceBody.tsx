import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { projectRepository } from '../../repositories/project';
import { handleAPIError } from '../../repositories/utils';
import { boardRepository } from '../../repositories/board';
import { cardRepository } from '../../repositories/card';
import CustomButton, { ButtonType } from '../Common/Button';

const WorkspaceBody = ({ showSidebar, selectedProjectId, accessToken }: { showSidebar: boolean, selectedProjectId: string, accessToken: string }) => {
	const navigate = useNavigate();

	const [project, setProject] = useState<any>({});
	const [updatedProject, setUpdatedProject] = useState<any>({});
	const [projectNameClicked, setProjectNameClicked] = useState<boolean>(false);
	const projectNameInputRef = useRef<HTMLInputElement>(null);

	const [boards, setBoards] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleClickOutside = (event: MouseEvent) => {
		if (projectNameInputRef.current && !projectNameInputRef.current.contains(event.target as Node)) {
			// setProjectNameClicked(false);

			updateProjectData();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		fetchProjectDetails();
	}, [selectedProjectId]);

	const fetchProjectDetails = async () => {
		try {
			const response = await projectRepository.getProject(selectedProjectId, accessToken);
			console.log("Project response", response);
			const data = response.data;
			console.log("Project data", data);
			setProject(data);
			setUpdatedProject({
				id: data.id,
				title: data.title,
			});
			console.log(updatedProject);
			fetchBoards();
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	const fetchBoards = async () => {
		const filters = {
			project: selectedProjectId,
			is_active: true,
			is_deleted: false,
		};
		try {
			const response = await boardRepository.getBoards(filters, accessToken);
			console.log(response);
			const data = response.data.data;
			setBoards(data);
			setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	const handleChangeProjectName = (e: any) => {
		setUpdatedProject({
			...updatedProject,
			title: e.target.value,
		});
	};

	const updateProjectData = async () => {
		try {
			console.log(project)
			console.log(updatedProject)

			const response = await projectRepository.updateProject(project.id, updatedProject, accessToken);
			console.log(response);
			setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
		setProjectNameClicked(false);
	};

	const rearrangeArr = (arr: any[], sourceIndex: number, destIndex: number) => {
		const arrCopy = [...arr];
		const [removed] = arrCopy.splice(sourceIndex, 1);
		arrCopy.splice(destIndex, 0, removed);

		return arrCopy;
	};

	// Handle drag end for both boards and cards
	const handleDragEnd = (result: any) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) return;

		if (type === 'board') {
			// Reorder boards
			const reorderedBoards = Array.from(boards);
			setBoards(rearrangeArr(reorderedBoards, source.index, destination.index));
		} else {
			// Reorder cards within or between boards
			const startBoard = boards.find(board => board.id === source.droppableId);
			const endBoard = boards.find(board => board.id === destination.droppableId);

			if (startBoard === endBoard) {
				// Reorder cards within the same board
				const reorderedCards = Array.from(startBoard.cards);
				const [removed] = reorderedCards.splice(source.index, 1);
				reorderedCards.splice(destination.index, 0, removed);
				startBoard.cards = reorderedCards;
			} else {
				// Move card between boards
				const startCards = Array.from(startBoard.cards);
				const [removed] = startCards.splice(source.index, 1);
				const endCards = Array.from(endBoard.cards);
				endCards.splice(destination.index, 0, removed);

				startBoard.cards = startCards;
				endBoard.cards = endCards;
			}

			setBoards([...boards]);
		}
	};

	return (
		<>
			<div className='workspaceBody'
				style={{ width: showSidebar ? 'calc(100% - 300px)' : 'calc(100% - 20px)' }}
			>
				<div className='flex justify-between items-center w-full p-2 bg-gray-900'>
					<div className='flex justify-between items-center w-full'>
						<div className='flex justify-center items-center gap-2 px-4 py-2 cursor-pointer rounded-md'>
							{
								!isLoading &&
									projectNameClicked ? (
									<input
										type='text'
										placeholder='Project Name'
										className='text-lg font-medium text-white p-2 rounded-md bg-gray-600'
										ref={projectNameInputRef}
										value={updatedProject.title}
										onChange={(e) => handleChangeProjectName(e)}
										onKeyDown={(e) => e.key === 'Enter' && updateProjectData()}
									/>
								) : (
									<p className='text-lg font-medium text-white p-2' onClick={() => setProjectNameClicked(!projectNameClicked)}>
										{updatedProject.title}
									</p>
								)
							}
						</div>
					</div>
					<div className='flex justify-end items-center w-full'>
						<div className='flex justify-center items-center gap-2 px-4 py-2 cursor-pointer rounded-md text-white hover:bg-gray-500'>
							<i className="fa-solid fa-ellipsis"></i>
						</div>
					</div>
				</div>

				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="all-boards" direction="horizontal" type="board">
						{(provided: any) => (
							<div
								className='workspaceBody__content'
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{!isLoading && boards.map((board: any, index: number) => (
									<Draggable draggableId={board.id} index={index} key={board.id}>
										{(provided: any) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<Board
													key={board.id}
													board={board}
													accessToken={accessToken}
													navigate={navigate}
												/>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
								<CustomButton
									icon='fa-solid fa-plus'
									text='Add Another Board'
									type={ButtonType.Button}
									className='w-full gap-2 px-4 py-2 text-sm font-medium text-white  cursor-pointer'
								// onClick={() => setShowCardDetailsModal(true)}
								/>
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</>
	);
};

const Board = ({ board, accessToken, navigate }: { board: any, accessToken: string, navigate: any }) => {
	const [boardData, setBoardData] = useState<any>(board);
	const [cardList, setCardList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const [boardNameClicked, setBoardNameClicked] = useState<boolean>(false);
	const boardNameInputRef = useRef<HTMLInputElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (boardNameInputRef.current && !boardNameInputRef.current.contains(event.target as Node)) {
			setBoardNameClicked(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		fetchCards();
	}, [board]);

	const fetchCards = async () => {
		const filters = {
			board: board.id,
			is_active: true,
			is_deleted: false,
		};
		try {
			const response = await cardRepository.getCards(filters);
			console.log(response);
			const data = response.data.data;
			setCardList(data);
			setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	const handleChangeBoardTitle = (e: any) => {
		setBoardData({
			...boardData,
			title: e.target.value,
		});
	};

	const updateBoardData = async () => {
		console.log(boardData.title);
		console.log(board.title);

		const updateBoardData = {
			title: boardData.title,
			description: boardData.description,
		}
		try {
			const response = await boardRepository.updateBoard(boardData.id, updateBoardData, accessToken);
			console.log(response);
			setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
		setBoardNameClicked(false);
	};

	return (
		// <Droppable droppableId={board.id} type="card">
		// 	{(provided: any) => (
		<div className='flex flex-col gap-2 min-w-[300px] h-fit rounded-lg bg-gray-800 p-2'
		// ref={provided.innerRef} {...provided.droppableProps}
		>
			<div className='flex justify-between items-center p-2'>
				<div>
					{
						boardNameClicked ? (
							<input
								type='text'
								placeholder='Board Name'
								ref={boardNameInputRef}
								value={boardData.title}
								onChange={(e) => handleChangeBoardTitle(e)}
								onKeyDown={(e) => e.key === 'Enter' && updateBoardData()}
							/>
						) : (
							<p className='text-sm font-medium text-white' onClick={() => setBoardNameClicked(!boardNameClicked)}>
								{boardData.title.length > 20 ? boardData.title.slice(0, 20) + '...' : boardData.title}
							</p>
						)
					}
				</div>
				<div className='flex text-white cursor-pointer' onClick={() => { }}>
					<i className="fa-solid fa-ellipsis"></i>
				</div>
			</div>
			<div className='flex flex-col gap-3 w-full'>
				{!isLoading && cardList?.length > 0 && cardList.map((card: any, index: number) => (
					// <Draggable draggableId={card.id} index={index} key={card.id}>
					// 	{(provided: any) => (
					// 		<div
					// 			ref={provided.innerRef}
					// 			{...provided.draggableProps}
					// 			{...provided.dragHandleProps}
					// 		>
					<Card
						key={card.id}
						card={card}
					/>
					// 		</div>
					// 	)}
					// </Draggable>
				))}
				{/* {provided.placeholder} */}
				<CustomButton
					icon='fa-solid fa-plus'
					text='Add Card'
					type={ButtonType.Button}
					className='w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 cursor-pointer'
				// onClick={() => setShowCardDetailsModal(true)}
				/>
			</div>
		</div>
		// 	)}
		// </Droppable>
	);
};

const Card = ({ card }: { card: any }) => {
	return (
		<div className='flex justify-between items-start gap-2 px-2 py-2 text-sm font-medium  text-white rounded-md bg-gray-600 hover:bg-gray-700 cursor-pointer'>
			<p className='w-full p-1'>{card.title}</p>
			<i className='fa-solid fa-edit p-1 border border-transparent hover:border-white rounded-md' onClick={() => { }} />
		</div>
	)
};

export default WorkspaceBody;
