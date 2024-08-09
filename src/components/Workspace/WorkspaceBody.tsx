import React, { useEffect, useRef, useState } from 'react'
import { closeModal } from '../../utils/utils';

const WorkspaceBody = ({ showSidebar }: { showSidebar: boolean }) => {
	const [project, setProject] = useState<any>({
		id: 1,
		name: 'Project 1',
	});

	const [cardLists, setCardLists] = useState<any[]>([
		{
			id: 1,
			name: 'To Do',
			cards: [
				{
					id: 1,
					name: 'Card 1',
				},
				{
					id: 2,
					name: 'Card 2',
				},
				{
					id: 3,
					name: 'Card 3',
				},
				{
					id: 4,
					name: 'Card 4',
				},
				{
					id: 5,
					name: 'Card 5',
				},
				{
					id: 6,
					name: 'Card 6',
				},
				{
					id: 7,
					name: 'Card 7',
				},
				{
					id: 8,
					name: 'Card 8',
				},
				{
					id: 9,
					name: 'Card 9',
				},
				{
					id: 10,
					name: 'Card 10',
				},
				{
					id: 11,
					name: 'Card 11',
				},
			],
		},
		{
			id: 2,
			name: 'In Progress',
			cards: [
				{
					id: 1,
					name: 'Card 1',
				},
				{
					id: 2,
					name: 'Card 2',
				},
				{
					id: 3,
					name: 'Card 3',
				},
				{
					id: 4,
					name: 'Card 4',
				},
				{
					id: 5,
					name: 'Card 5',
				},
				{
					id: 6,
					name: 'Card 6',
				},
			],
		},
		{
			id: 3,
			name: 'Done',
			cards: [
				{
					id: 1,
					name: 'Card 1',
				},
				{
					id: 2,
					name: 'Card 2',
				},
				{
					id: 3,
					name: 'Card 3',
				},
			],
		},
		{
			id: 4,
			name: 'Blocked',
		},
		{
			id: 5,
			name: 'Archived',
		},
		// {
		// 	id: 6,
		// 	name: 'All',
		// },
		// {
		// 	id: 7,
		// 	name: 'Custom',
		// },
		// {
		// 	id: 8,
		// 	name: 'Custom',
		// },
		// {
		// 	id: 9,
		// 	name: 'Custom',
		// }
	]);

	const [projectNameClicked, setProjectNameClicked] = useState<boolean>(false);
	const projectNameInputRef = useRef<HTMLInputElement>(null);

	const [selectedCardId, setSelectedCardId] = useState<any>(null);

	const [showCardDetailsModal, setShowCardDetailsModal] = useState<boolean>(false);

	const handleClickOutside = (event: MouseEvent) => {
		if (projectNameInputRef.current && !projectNameInputRef.current.contains(event.target as Node)) {
			setProjectNameClicked(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className='workspaceBody'
				style={{ width: showSidebar ? 'calc(100% - 300px)' : 'calc(100% - 20px)' }}
			>
				<div className='workspaceBody__header'>
					<div className='workspaceBody__header__left'>
						<div className='headerItem'>
							{
								projectNameClicked ? (
									<input type='text' placeholder='Project Name' ref={projectNameInputRef} />
								) : (
									<p onClick={() => setProjectNameClicked(!projectNameClicked)}>
										{project.name}
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
				<div className='workspaceBody__content'>
					{
						cardLists && cardLists?.length > 0 && cardLists.map((cardList: any) => (
							<CardList
								key={cardList.id}
								cardList={cardList}
								setSelectedCardId={setSelectedCardId}
								setShowCardDetailsModal={setShowCardDetailsModal}
							/>
						))
					}
				</div>
			</div>

			{
				showCardDetailsModal && (
					<CardDetailsModal
						selectedCardId={selectedCardId}
						showCardDetailsModal={showCardDetailsModal}
						setShowCardDetailsModal={setShowCardDetailsModal}
					/>
				)
			}
		</>
	)
}

const CardList = ({ cardList, setSelectedCardId, setShowCardDetailsModal }: { cardList: any, setSelectedCardId: any, setShowCardDetailsModal: any }) => {
	const [cardNameClicked, setCardNameClicked] = useState<boolean>(false);
	const cardNameInputRef = useRef<HTMLInputElement>(null);

	// const [cards, setCards] = useState<any[]>([
	// 	{
	// 		id: 1,
	// 		name: 'Card 1',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Card 2',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Card 3',
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'Card 4',
	// 	},
	// 	{
	// 		id: 5,
	// 		name: 'Card 5',
	// 	},
	// 	{
	// 		id: 6,
	// 		name: 'Card 6',
	// 	},
	// 	{
	// 		id: 7,
	// 		name: 'Card 7',
	// 	},
	// 	{
	// 		id: 8,
	// 		name: 'Card 8',
	// 	},
	// 	{
	// 		id: 9,
	// 		name: 'Card 9',
	// 	},
	// 	{
	// 		id: 10,
	// 		name: 'Card 10',
	// 	},
	// 	{
	// 		id: 11,
	// 		name: 'Card 11',
	// 	},
	// 	{
	// 		id: 12,
	// 		name: 'Card 12',
	// 	},
	// 	{
	// 		id: 13,
	// 		name: 'Card 13',
	// 	},
	// 	{
	// 		id: 14,
	// 		name: 'Card 14',
	// 	},
	// 	{
	// 		id: 15,
	// 		name: 'Card 15',
	// 	},
	// 	{
	// 		id: 16,
	// 		name: 'Card 16',
	// 	},
	// 	{
	// 		id: 17,
	// 		name: 'Card 17',
	// 	},
	// 	{
	// 		id: 18,
	// 		name: 'Card 18',
	// 	},
	// 	{
	// 		id: 19,
	// 		name: 'Card 19',
	// 	},
	// 	{
	// 		id: 20,
	// 		name: 'Card 20',
	// 	},
	// 	{
	// 		id: 21,
	// 		name: 'Card 21',
	// 	},
	// 	{
	// 		id: 22,
	// 		name: 'Card 22',
	// 	},
	// 	{
	// 		id: 23,
	// 		name: 'Card 23',
	// 	},
	// 	{
	// 		id: 24,
	// 		name: 'Card 24',
	// 	},
	// 	{
	// 		id: 25,
	// 		name: 'Card 25',
	// 	},
	// 	{
	// 		id: 26,
	// 		name: 'Card 26',
	// 	},
	// ]);

	const handleClickOutside = (event: MouseEvent) => {
		if (cardNameInputRef.current && !cardNameInputRef.current.contains(event.target as Node)) {
			setCardNameClicked(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='cardList'>
			<div className='cardList__header'>
				<div>
					{
						cardNameClicked ? (
							<input type='text' placeholder='Card Name' ref={cardNameInputRef} />
						) : (
							<p onClick={() => setCardNameClicked(!cardNameClicked)}>
								{cardList.name}
							</p>
						)
					}
				</div>
				<div>
					<i className="fa-solid fa-ellipsis"></i>
				</div>
			</div>
			<div className='cardList__content'>
				{
					cardList.cards && cardList.cards?.length > 0 && cardList.cards.map((card: any) => (
						<Card
							key={card.id}
							card={card}
							setSelectedCardId={setSelectedCardId}
							setShowCardDetailsModal={setShowCardDetailsModal}
						/>
					))
				}
				<div className='card'>
					<button className='addCardBtn' type='button'>
						<i className="fa-solid fa-plus"></i> <span>Add Card</span>
					</button>
				</div>
			</div>
		</div>
	)
}

const Card = ({ card, setSelectedCardId, setShowCardDetailsModal }: { card: any, setSelectedCardId: any, setShowCardDetailsModal: any }) => {
	return (
		<div className='card'
			onClick={() => {
				setSelectedCardId(card.id);
				setShowCardDetailsModal(true);
			}}
		>
			<p>{card.name.length > 20 ? card.name.slice(0, 20) + '...' : card.name}</p>
		</div>
	)
}

const CardDetailsModal = ({ selectedCardId, showCardDetailsModal, setShowCardDetailsModal }: { selectedCardId: any, showCardDetailsModal: any, setShowCardDetailsModal: any }) => {
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
}

export default WorkspaceBody;
