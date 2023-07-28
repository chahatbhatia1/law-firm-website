import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import Search from "./Search";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { fetchLawyers, reorderLawyers } from "../utils/lawyerSlice";
import Shimmer from "./Shimmer";
import TimeSlotDialog from "./TimeSlotDialog";

const Lawyers = () => {
	const dispatch = useDispatch();
	const { loading, lawyers, error } = useSelector((store) => store.lawyer);
	const [showDialog, setShowDialog] = useState(false);
	const [lawyer, setLawyer] = useState({});

	useEffect(() => {
		dispatch(fetchLawyers());
	}, []);

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const startIndex = result.source.index;
		const endIndex = result.destination.index;
		
		dispatch(reorderLawyers([startIndex, endIndex]));
	};

	const checkAvailability = (lawyer) => {
		setLawyer(lawyer);
		setShowDialog(true);
	}

	const handleClose = () => {
		setLawyer({});
		setShowDialog(false);
	}

	return (
		<div className=" relative max-w-7xl min-h-[600px] mx-auto mt-7 p-4 bg-gray-100 rounded-lg">
			<Search />

			<div className="w-full py-2 mt-4">
				{loading && <Shimmer />}

				{!loading && error && (
					<p>Oops! Some error occured while fetching data...</p>
				)}

				{!loading && lawyers && (
					<table className="min-w-full text-left text-sm font-light">
						<thead className="border-b font-medium">
							<TableHeader />
						</thead>
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="droppable">
								{(provided) => (
									<tbody
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{lawyers?.map((lawyer, index) => (
											<Draggable
												key={lawyer.id}
												draggableId={lawyer.id.toString()}
												index={index}
											>
												{(provided) => (
													<tr
														className="border-b transition duration-300 ease-in-out hover:bg-neutral-200"
														key={lawyer.id}
														data={lawyer}
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<td className="px-6 py-4 whitespace-nowrap">
															{lawyer.id}
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															{lawyer.name}
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															{lawyer.specialty}
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															{lawyer.firm}
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															{lawyer.address}
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															{lawyer.phone}
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															<button className="text-white bg-red-400
																hover:bg-red-600 focus:outline-none  font-medium 
																rounded-lg text-sm px-4 py-2"
																onClick={() => checkAvailability(lawyer)}
															>
																Check availability
															</button>
														</td>
													</tr>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</tbody>
								)}
							</Droppable>
						</DragDropContext>
					</table>
				)}
			</div>

			{ showDialog && <TimeSlotDialog lawyerId={lawyer?.id} timeslots={lawyer?.time_slots} handleClose={handleClose} /> }
		</div>
	);
};

export default Lawyers;
