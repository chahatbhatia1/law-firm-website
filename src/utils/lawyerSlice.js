import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    lawyers: [],
    error: ""
}

const BASE_URL = "http://localhost:4000/lawyers";

// Generates pending, fulfilled and rejected action types
export const fetchLawyers = createAsyncThunk('lawyer/fetchLawyers', async (query) => {
    const res = await fetch(`${BASE_URL}${query ? `?q=${query}` : ""}`);
	const data = await res.json();

    return data;
})

export const bookTimeSlot = createAsyncThunk('lawyer/updateLawyer', async ({lawyerId, selectedDay}) => {
    const result = await fetch(`${BASE_URL}/${lawyerId}`);
    const lawyer = await result.json();

    const updatedLawyer = {
        ...lawyer,
        time_slots: lawyer.time_slots.map(slot => {
          if (slot.day === selectedDay) {
            return {
              ...slot,
              status: 'booked',
            };
          }
          return slot;
        }),
    };

    await fetch(`${BASE_URL}/${lawyerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLawyer),
    });

    const res = await fetch(`${BASE_URL}`);
	const data = await res.json();

    return data;
})

const lawyerSlice = createSlice({
    name: "lawyer",
    initialState,
    reducers: {
        reorderLawyers: (state, action) => {
            let [startIndex, endIndex] = action.payload;

            const [removed] = state.lawyers.splice(startIndex, 1);
            state.lawyers.splice(endIndex, 0, removed);
        },
        bookTimeSlot: (state, action) => {
            let [lawyerId, selectedDay] = action.payload;

            const lawyerToUpdate = state.lawyers.find(lawyer => lawyer.id === lawyerId);
            
            if (lawyerToUpdate) {
                const timeSlotToUpdate = lawyerToUpdate.time_slots.find(slot => slot.day === selectedDay);
                if (timeSlotToUpdate) {
                  timeSlotToUpdate.status = 'booked';
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLawyers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLawyers.fulfilled, (state, action) => {
                state.loading = false;
                state.lawyers = action.payload;
            })
            .addCase(fetchLawyers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(bookTimeSlot.fulfilled, (state, action) => {
                state.lawyers = action.payload;
            })
    }
})

export const { reorderLawyers } = lawyerSlice.actions;

export default lawyerSlice.reducer;