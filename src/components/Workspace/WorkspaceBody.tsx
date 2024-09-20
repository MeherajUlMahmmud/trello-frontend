import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { projectRepository } from '@/repositories/project';
import { handleAPIError } from '@/repositories/utils';
import { boardRepository } from '@/repositories/board';
import { cardRepository } from '@/repositories/card';
import CustomButton, { ButtonType } from '../Common/Button';
import InputField from '../InputField';
import Spinner from '../Loading/Spinner';

const WorkspaceBody = ({ showSidebar, selectedProjectId, accessToken }: { showSidebar: boolean, selectedProjectId: string, accessToken: string }) => {
	const navigate = useNavigate();

	const [project, setProject] = useState<any>({});
	const [updatedProject, setUpdatedProject] = useState<any>({});
	const [projectNameClicked, setProjectNameClicked] = useState<boolean>(false);
	const projectNameInputRef = useRef<HTMLInputElement>(null);

	const [boards, setBoards] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const [isClickedAddNewBoard, setIsClickedAddNewBoard] = useState(false);
	const [newCardTitle, setNewCardTitle] = useState('');

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (projectNameInputRef.current && !projectNameInputRef.current.contains(event.target as Node)) {
				updateProjectData();
			}
		};

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
			const data = response.data;
			setProject(data);
			setUpdatedProject({
				id: data.id,
				title: data.title,
			});

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
			const data = response.data.data;
			setBoards(data);
			setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	const handleAddNewBoard = async () => {
		try {
			await boardRepository.createBoard({
				title: newCardTitle,
				project: project.id,
			}, accessToken);

			fetchBoards();
			setIsClickedAddNewBoard(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
		}
	};

	const handleChangeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedProject({
			...updatedProject,
			title: e.target.value,
		});
	};

	const updateProjectData = async () => {
		try {
			await projectRepository.updateProject(project.id, updatedProject, accessToken);
			setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
		setProjectNameClicked(false);
	};

	const handleDragEnd = async (result: any) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) return;

		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		if (type === 'board') {
			const newBoardOrder = Array.from(boards);
			const [reorderedItem] = newBoardOrder.splice(source.index, 1);
			newBoardOrder.splice(destination.index, 0, reorderedItem);

			setBoards(newBoardOrder);

			try {
				await projectRepository.updateBoardOrder(
					selectedProjectId,
					{ "board_order": newBoardOrder.map(board => board.id) },
					accessToken,
				);
			} catch (error: any) {
				handleAPIError(error, navigate);
			}
		} else if (type === 'card') {
			const startBoard = boards.find(board => board.id === source.droppableId);
			const finishBoard = boards.find(board => board.id === destination.droppableId);

			if (startBoard === finishBoard) {
				const newCards = Array.from(startBoard.cards);
				const [reorderedItem] = newCards.splice(source.index, 1);
				newCards.splice(destination.index, 0, reorderedItem);

				const newBoard = {
					...startBoard,
					cards: newCards,
				};

				setBoards(prevBoards =>
					prevBoards.map(board => (board.id === newBoard.id ? newBoard : board))
				);

				// try {
				// 	await boardRepository.updateCardOrder(
				// 		startBoard.uuid,
				// 		{ "card_order": boards.map(board => board.id) },
				// 		accessToken,
				// 	);
				// } catch (error: any) {
				// 	handleAPIError(error, navigate);
				// }
			} else {
				const startCards = Array.from(startBoard.cards);
				const [movedCard] = startCards.splice(source.index, 1);
				const newStartBoard = {
					...startBoard,
					cards: startCards,
				};

				const finishCards = Array.from(finishBoard.cards);
				finishCards.splice(destination.index, 0, movedCard);
				const newFinishBoard = {
					...finishBoard,
					cards: finishCards,
				};

				setBoards(prevBoards =>
					prevBoards.map(board =>
						board.id === newStartBoard.id
							? newStartBoard
							: board.id === newFinishBoard.id
								? newFinishBoard
								: board
					)
				);

				// try {
				// 	await cardRepository.moveCard(draggableId, destination.droppableId, destination.index, accessToken);
				// } catch (error: any) {
				// 	handleAPIError(error, navigate);
				// }
			}
		}
	};

	return (
		<div className='bg-[#60436f] w-full' style={{ width: showSidebar ? 'calc(100% - 270px)' : 'calc(100% - 50px)' }}>
			<div className='flex justify-between items-center border-b border-l border-r border-gray-500 w-full bg-gray-800'>
				<div className='flex justify-between items-center w-full'>
					<div className='flex justify-center items-center gap-2 px-4 py-2 cursor-pointer rounded-md'>
						{!isLoading && projectNameClicked ? (
							<input
								type='text'
								placeholder='Project Name'
								className='text-md font-medium text-white p-2 rounded-md bg-gray-600'
								ref={projectNameInputRef}
								value={updatedProject.title}
								onChange={handleChangeProjectName}
								onKeyDown={(e) => e.key === 'Enter' && updateProjectData()}
								autoFocus
							/>
						) : (
							<p className='text-md font-medium text-white p-2' onClick={() => setProjectNameClicked(!projectNameClicked)}>
								{updatedProject.title}
							</p>
						)}
					</div>
				</div>
				<div className='flex justify-center items-center gap-2 p-2 mr-2 cursor-pointer rounded-md text-white hover:bg-gray-500'>
					<i className="fa-solid fa-ellipsis"></i>
				</div>
			</div>

			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="all-boards" direction="horizontal" type="board">
					{(provided) => (
						<div
							className='flex p-2 gap-2 h-[calc(100vh-120px)] overflow-x-auto overflow-y-hidden'
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{!isLoading && boards.map((board, index) => (
								<Board
									key={board.id}
									board={board}
									index={index}
									accessToken={accessToken}
									navigate={navigate}
								/>
							))}
							{provided.placeholder}
							{/* <CustomButton
								icon='fa-solid fa-plus'
								text='Add Another Board'
								type={ButtonType.Button}
								className='w-fit gap-2 px-12 py-2 text-sm font-medium text-white cursor-pointer'
							// onClick={() => handleAddBoard()}
							/> */}
							{
								isClickedAddNewBoard ? (
									<div className='flex flex-col gap-2 w-full'>
										<InputField
											name="title"
											type="text"
											placeholder="Enter a name for this board"
											value={newCardTitle}
											onChange={(e) => setNewCardTitle(e.target.value)}
											onKeyDown={(e) => e.key === 'Enter' && handleAddNewBoard()}
										/>
										<div className='flex justify-between items-center w-full gap-2'>
											<CustomButton
												icon='fa-solid fa-plus'
												text='Add Board'
												type={ButtonType.Button}
												className='w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 cursor-pointer'
												onClick={() => handleAddNewBoard()}
											/>
											<CustomButton
												icon='fa-solid fa-xmark'
												text='Cancel'
												type={ButtonType.Button}
												className='w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 cursor-pointer'
												onClick={() => setIsClickedAddNewBoard(false)}
											/>
										</div>
									</div>
								) : (
									<CustomButton
										icon='fa-solid fa-plus'
										text='Add New Board'
										type={ButtonType.Button}
										className='w-fit gap-2 px-12 py-2 text-sm font-medium text-white cursor-pointer'
										onClick={() => setIsClickedAddNewBoard(true)}
									/>
								)
							}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

const Board = ({ board, index, accessToken, navigate }: { board: any, index: number, accessToken: string, navigate: any }) => {
	const [boardData, setBoardData] = useState<any>(board);
	const [cardList, setCardList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const [isClickedAddNewCard, setIsClickedAddNewCard] = useState(false);
	const [newCardTitle, setNewCardTitle] = useState('');

	const [boardNameClicked, setBoardNameClicked] = useState<boolean>(false);
	const boardNameInputRef = useRef<HTMLInputElement>(null);

	const [menuVisible, setMenuVisible] = useState(false);
	const boardEllipsisRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (boardNameInputRef.current && !boardNameInputRef.current.contains(event.target as Node)) {
				setBoardNameClicked(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Handle clicking outside the menu to close it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (boardEllipsisRef.current && !boardEllipsisRef.current.contains(event.target as Node)) {
				setMenuVisible(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [boardEllipsisRef]);

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
			const data = response.data.data;
			setCardList(data);
			setIsLoading(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
			setIsLoading(false);
		}
	};

	const handleChangeBoardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBoardData({
			...boardData,
			title: e.target.value,
		});
	};

	const updateBoardData = async () => {
		const updateBoardData = {
			title: boardData.title,
			description: boardData.description,
		}
		try {
			await boardRepository.updateBoard(boardData.id, updateBoardData, accessToken);
			setBoardNameClicked(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
		}
	};

	const handleAddNewCard = async () => {
		try {
			await cardRepository.createCard({
				title: newCardTitle,
				board: board.id,
			}, accessToken);
			fetchCards();
			setIsClickedAddNewCard(false);
		} catch (error: any) {
			handleAPIError(error, navigate);
		}
	};

	return (
		<Draggable draggableId={board.uuid.toString()} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className='flex flex-col gap-2 w-[260px] min-w-[260px] rounded-lg bg-gray-800 p-2 cursor-pointer h-full'
				>
					<div className='flex justify-between items-center px-2 py-1'>
						<div>
							{boardNameClicked ? (
								<input
									type='text'
									placeholder='Board Name'
									className='text-md font-medium text-white px-2 py-1 rounded-md bg-gray-600 '
									ref={boardNameInputRef}
									value={boardData.title}
									onChange={handleChangeBoardTitle}
									onKeyDown={(e) => e.key === 'Enter' && updateBoardData()}
									autoFocus
								/>
							) : (
								<p className='text-sm font-medium text-white py-1 cursor-pointer' onClick={() => setBoardNameClicked(!boardNameClicked)}>
									{boardData.title.length > 20 ? boardData.title.slice(0, 20) + '...' : boardData.title}
								</p>
							)}
						</div>
						<div className='flex text-white cursor-pointer p-1 rounded-md hover:bg-gray-700' ref={boardEllipsisRef}>
							<i className="fa-solid fa-ellipsis"
							// onClick={() => setMenuVisible(!menuVisible)}
							/>
						</div>
						{/* Context Menu */}
						{/* {menuVisible && (
							<div className='absolute top-11 mt-2 right-0 bg-gray-800 text-white p-2 rounded shadow-lg'>
								<ul className="space-y-1">
									<li className='hover:bg-gray-700 p-2 cursor-pointer'>Option 1</li>
									<li className='hover:bg-gray-700 p-2 cursor-pointer'>Option 2</li>
									<li className='hover:bg-gray-700 p-2 cursor-pointer'>Option 3</li>
								</ul>
							</div>
						)} */}
					</div>

					{
						isLoading ? (
							<Spinner />
						) : (
							<Droppable droppableId={board.uuid.toString()} type="card">
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className='flex flex-col gap-2 w-full overflow-auto'
									>
										<div className='flex flex-col gap-2 w-full overflow-y-auto'>
											{cardList && cardList.map((card: any, index: number) => (
												<Card key={card.uuid} card={card} index={index} />
											))}
											{provided.placeholder}
										</div>
										{
											isClickedAddNewCard ? (
												<div className='flex flex-col gap-2 w-full'>
													<InputField
														name="title"
														type="text"
														placeholder="Enter a name for this card"
														value={newCardTitle}
														onChange={(e) => setNewCardTitle(e.target.value)}
														onKeyDown={(e) => e.key === 'Enter' && handleAddNewCard()}
													/>
													<div className='flex justify-between items-center w-full gap-2'>
														<CustomButton
															icon='fa-solid fa-plus'
															text='Add Card'
															type={ButtonType.Button}
															className='w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 cursor-pointer'
															onClick={() => handleAddNewCard()}
														/>
														<CustomButton
															icon='fa-solid fa-xmark'
															text='Cancel'
															type={ButtonType.Button}
															className='w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 cursor-pointer'
															onClick={() => setIsClickedAddNewCard(false)}
														/>
													</div>
												</div>
											) : (
												<CustomButton
													icon='fa-solid fa-plus'
													text='Add Card'
													type={ButtonType.Button}
													className='w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 cursor-pointer'
													onClick={() => setIsClickedAddNewCard(true)}
												/>
											)
										}
									</div>
								)}
							</Droppable>
						)
					}
				</div>
			)}
		</Draggable>
	);
};

const Card = ({ card, index }: { card: any, index: number }) => {
	return (
		<Draggable draggableId={card.uuid.toString()} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className='flex justify-between items-start gap-2 px-2 py-1 mr-1 text-sm font-medium text-white rounded-lg bg-gray-600 hover:bg-gray-700 cursor-pointer'
				>
					<p className='w-full p-1'>{card.title}</p>
					<i
						className='fa-solid fa-pencil px-2 py-1 text-xs cursor-pointer hover:bg-gray-600 hover:text-white rounded-lg'
						onClick={() => { }} title='Edit Card' />
				</div>
			)}
		</Draggable>
	);
};

export default WorkspaceBody;
