import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bookTimeSlot } from "../utils/lawyerSlice";

const TimeSlotDialog = ({ lawyerId, timeslots, handleClose }) => {
    const [selectedDay, setSelectedDay] = useState("");
    const dispatch = useDispatch();

    const handleClick = (timeSlot) => {
        if(timeSlot?.status === "booked") {
            alert("Time slot already booked!");
            return;
        }
        setSelectedDay(timeSlot?.day);
    }

    const handleBooking = () => {
        dispatch(bookTimeSlot({lawyerId, selectedDay}));
        handleClose();
        alert("Booking confirmed"); 
    }

	return (
		<div className="bg-black bg-opacity-50 fixed z-10 inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
			<div className="bg-white p-4 rounded-lg min-w-[500px] relative w-auto my-6 mx-auto max-w-7xl">
				<div className="modal-content relative min-h-[250px]">
					<div className="py-4 text-center">
						<h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
							Available Time Slots
						</h2>
                        <div className="flex">
                            {
                                timeslots.map((ts, index) => (
                                    <div key={index} 
                                        className={`flex flex-col border rounded-sm p-3 m-2 transition-all duration-100
                                            ${ts?.status === "available" ? "text-green-500 border-green-500 cursor-pointer" : "text-red-400 border-red-400"}
                                            ${ts.day === selectedDay ? "border-4" : ""}`}
                                            onClick={() => handleClick(ts)}    
                                        >
                                        <p className="my-2 text-sm font-bold">{ts?.day}</p>
                                        <p className="my-1 text-xs font-bold">{ts?.start_time} - {ts?.end_time}</p>
                                    </div>
                                ))
                            }
                        </div>
					</div>
                    <div className="absolute bottom-0 right-24 flex justify-center py-0">
						<button
							type="button"
							onClick={handleBooking}
							className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Book Timeslot
						</button>
					</div>
					<div className="absolute bottom-0 right-0 flex justify-center py-0">
						<button
							type="button"
							onClick={handleClose}
							className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TimeSlotDialog;
