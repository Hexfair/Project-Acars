import { configureStore } from "@reduxjs/toolkit";
import acarsReducer from "./acars/acars.slice";
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
//===========================================================================================================

export const store = configureStore({
	reducer: {
		acars: acarsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;