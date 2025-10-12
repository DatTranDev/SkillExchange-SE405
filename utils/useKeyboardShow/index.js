import { create } from "zustand";

const useKeyboardShow = create((set) => ({
	keyboardShow: false,
	setKeyboardShow: (value) => {
		console.log(value);
		set((state) => ({
			...state,
			keyboardShow: value,
		}));
	},
}));

export default useKeyboardShow;
