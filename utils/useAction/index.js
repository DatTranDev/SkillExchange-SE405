import { create } from "zustand";

export const useAction = create((set) => ({
	swipe: "",
	swipeLeft: () => set({ swipe: `left${Date.now()}` }),
	swipeRight: () => set({ swipe: `right${Date.now()}` }),
}));
