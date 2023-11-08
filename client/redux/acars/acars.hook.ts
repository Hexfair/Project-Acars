import { setAcarsDataReducer, setMoreAcarsReducer } from "./acars.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { IAcars } from "@/interfaces/Acars.interface";
//===========================================================================================================

const useAcarsStore = () => {
	const { acarsDataStore } = useAppSelector((state) => state.acars);
	const dispatch = useAppDispatch();

	const setInitialAcars = (data: IAcars[]) => {
		dispatch(setAcarsDataReducer(data));
	};

	const setMoreAcars = (data: IAcars[]) => {
		dispatch(setMoreAcarsReducer(data));
	};

	return {
		acarsDataStore,
		setInitialAcars,
		setMoreAcars
	};
};

export default useAcarsStore;