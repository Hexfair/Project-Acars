import { IAcars } from '@/interfaces/Acars.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface AcarsSliceData {
	acarsDataStore: IAcars[] | null,
}

const initialState: AcarsSliceData = {
	acarsDataStore: null,
}

const acarsSlice = createSlice({
	name: 'acars',
	initialState,
	reducers: {
		setAcarsDataReducer: (state, action: PayloadAction<IAcars[]>) => {
			state.acarsDataStore = action.payload;
		},
		setMoreAcarsReducer: (state, action: PayloadAction<IAcars[]>) => {
			state.acarsDataStore && state.acarsDataStore.push(...action.payload);
		},
	}
})

export const { setAcarsDataReducer, setMoreAcarsReducer } = acarsSlice.actions;
export default acarsSlice.reducer;