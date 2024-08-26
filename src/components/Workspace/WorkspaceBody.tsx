import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { closeModal } from '../../utils/utils';
import { projectRepository } from '../../repositories/project';
import { handleAPIError } from '../../repositories/utils';
import { boardRepository } from '../../repositories/board';
import { cardRepository } from '../../repositories/card';
import { ButtonType } from '../../types/Button';

import Button from '../Common/Button';

const WorkspaceBody = ({ showSidebar, selectedProjectId, accessToken }: { showSidebar: boolean, selectedProjectId: string, accessToken: string }) => {
	const navigate = useNavigate();

	const [project, setProject] = useState<any>({});
	const [updatedProject, setUpdatedProject] = useState<any>({});
	const [projectNameClicked, setProjectNameClicked] = useState<boolean>(false);
	const projectNameInputRef = useRef<HTMLInputElement>(null);

	const [boards, setBoards] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const [selectedCardId, setSelectedCardId] = useState<any>(null);

	const [showCardDetailsModal, setShowCardDetailsModal] = useState<boolean>(false);

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
				<div className='workspaceBody__header'>
					<div className='workspaceBody__header__left'>
						<div className='headerItem'>
							{
								!isLoading &&
									projectNameClicked ? (
									<input
										type='text'
										placeholder='Project Name'
										ref={projectNameInputRef}
										value={updatedProject.title}
										onChange={(e) => handleChangeProjectName(e)}
										onKeyDown={(e) => e.key === 'Enter' && updateProjectData()}
									/>
								) : (
									<p onClick={() => setProjectNameClicked(!projectNameClicked)}>
										{updatedProject.title}
									</p>
								)
							}
						</div>
					</div>
					<div className='workspaceBody__header__right'>
						<div className='headerItem'>
							<i className="fa-solid fa-ellipsis"></i>
						</div>
					</div>
				</div>

				{/* <DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="all-boards" direction="horizontal" type="board">
						{(provided: any) => ( */}
				<div
					className='workspaceBody__content'
				// ref={provided.innerRef}
				// {...provided.droppableProps}
				>
					{!isLoading && boards.map((board: any, index: number) => (
						// <Draggable draggableId={board.id} index={index} key={board.id}>
						// 	{(provided: any) => (
						<div
						// ref={provided.innerRef}
						// {...provided.draggableProps}
						// {...provided.dragHandleProps}
						>
							<Board
								key={board.id}
								board={board}
								setSelectedCardId={setSelectedCardId}
								setShowCardDetailsModal={setShowCardDetailsModal}
								accessToken={accessToken}
								navigate={navigate}
							/>
						</div>
						// )}
						// 	</Draggable>
					))}
					{/* {provided.placeholder} */}
					<Button
						icon='fa-solid fa-plus'
						text='Add Another Board'
						type={ButtonType.Button}
						className=''
						// onClick={() => setShowCardDetailsModal(true)}
						style={{
							backgroundColor: '#333c44',
							minWidth: '300px',
							height: '55px',
						}}
					/>
				</div>
				{/* )} */}
				{/* </Droppable>
				</DragDropContext> */}
			</div>

			{
				showCardDetailsModal && (
					<CardDetailsModal
						selectedCardId={selectedCardId}
						setShowCardDetailsModal={setShowCardDetailsModal}
					/>
				)
			}
		</>
	);
};

const Board = ({ board, setSelectedCardId, setShowCardDetailsModal, accessToken, navigate }: { board: any, setSelectedCardId: any, setShowCardDetailsModal: any, accessToken: string, navigate: any }) => {
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
		<div className='board'
		// ref={provided.innerRef} {...provided.droppableProps}
		>
			<div className='board__header'>
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
							<p onClick={() => setBoardNameClicked(!boardNameClicked)}>
								{boardData.title.length > 20 ? boardData.title.slice(0, 20) + '...' : boardData.title}
							</p>
						)
					}
				</div>
				<div>
					<i className="fa-solid fa-ellipsis"></i>
				</div>
			</div>
			<div className='board__content'>
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
						setSelectedCardId={setSelectedCardId}
						setShowCardDetailsModal={setShowCardDetailsModal}
					/>
					// 		</div>
					// 	)}
					// </Draggable>
				))}
				{/* {provided.placeholder} */}
				<Button
					icon='fa-solid fa-plus'
					text='Add Card'
					type={ButtonType.Button}
					className='w-100'
					// onClick={() => setShowCardDetailsModal(true)}
					style={{
						backgroundColor: 'transparent',
						justifyContent: 'normal',
					}}
				/>
			</div>
		</div>
		// 	)}
		// </Droppable>
	);
};

const Card = ({ card, setSelectedCardId, setShowCardDetailsModal }: { card: any, setSelectedCardId: any, setShowCardDetailsModal: any }) => {
	return (
		<div className='card'
			onClick={() => {
				setSelectedCardId(card.id);
				setShowCardDetailsModal(true);
			}}
		>
			<p>{card.title}</p>
		</div>
	)
};

const CardDetailsModal = ({ selectedCardId, setShowCardDetailsModal }: { selectedCardId: any, setShowCardDetailsModal: any }) => {
	const [cardHeaderClicked, setCardHeaderClicked] = useState<boolean>(false);
	const cardHeaderInputRef = useRef<HTMLInputElement>(null);
	const [cardDescriptionClicked, setCardDescriptionClicked] = useState<boolean>(false);
	const cardDescriptionInputRef = useRef<HTMLInputElement>(null);

	const cards = [
		{
			id: 1,
			name: 'Card 1',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		},
		{
			id: 2,
			name: 'Card 2',
			description: null,
		},
		{
			id: 3,
			name: 'Card 3',
			description: null,
		},
		{
			id: 4,
			name: 'Card 4',
			description: null,
		},
		{
			id: 5,
			name: 'Card 5',
			description: null,
		},
		{
			id: 6,
			name: 'Card 6',
			description: null,
		},
		{
			id: 7,
			name: 'Card 7',
			description: null,
		},
		{
			id: 8,
			name: 'Card 8',
			description: null,
		},
		{
			id: 9,
			name: 'Card 9',
			description: null,
		},
		{
			id: 10,
			name: 'Card 10',
			description: null,
		},
	];

	const [cardDetails, setCardDetails] = useState<any>({});

	const handleClickOutside = (event: MouseEvent) => {
		if (cardHeaderInputRef.current && !cardHeaderInputRef.current.contains(event.target as Node)) {
			setCardHeaderClicked(false);
		}

		if (cardDescriptionInputRef.current && !cardDescriptionInputRef.current.contains(event.target as Node)) {
			setCardDescriptionClicked(false);
		}
	};

	useEffect(() => {
		if (selectedCardId) {
			setCardDetails({
				id: selectedCardId,
				name: cards.find((card: any) => card.id === selectedCardId)?.name,
				description: cards.find((card: any) => card.id === selectedCardId)?.description,
			});
		}
	}, [selectedCardId]);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='modal__wrapper' onClick={(e) => closeModal(e, setShowCardDetailsModal)}>
			<div className='modal modal__cardDetails'>
				<div className='closeModal' onClick={() => setShowCardDetailsModal(false)}>
					<i className="fa-solid fa-xmark"></i>
				</div>
				<div className='modal__body'>
					<div className='modal__body__item'>
						<div>
							<i className='fa-solid fa-circle-info'></i>
						</div>
						<div className='modal__body__item__content'>
							{
								cardHeaderClicked ? (
									<input type='text' placeholder='Card Name' className='modal__body__item__content__input' ref={cardHeaderInputRef} />
								) : (
									<p onClick={() => setCardHeaderClicked(!cardHeaderClicked)}>
										{cardDetails.name}
									</p>
								)
							}
						</div>
					</div>
					<div className='modal__body__item'>
						<div>
							<i className='fa-solid fa-list'></i>
						</div>
						<div className='modal__body__item__content'>
							<p>
								Description
							</p>
							<div>
								{
									cardDescriptionClicked ? (
										<input type='text' placeholder='Card Description' className='modal__body__item__content__input' ref={cardDescriptionInputRef} />
									) : (
										cardDetails.description ? (
											<p onClick={() => setCardDescriptionClicked(!cardDescriptionClicked)}>
												{cardDetails.description}
											</p>
										) : (
											<p className='noDescription' onClick={() => setCardDescriptionClicked(!cardDescriptionClicked)}>
												Add a more detailed description...
											</p>
										)
									)
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default WorkspaceBody;
