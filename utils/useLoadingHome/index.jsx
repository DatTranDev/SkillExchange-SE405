import { create } from "zustand";

const useLoadingHome = create((set) => ({
	loading: false,
	setLoading: (value) =>
		set((state) => ({
			...state,
			loading: value,
		})),
}));

export default useLoadingHome;
