import { create } from "zustand";
import type { TitlesState } from "./useTitleStore.types";

const emptyTitles = { en: "", ga: "" };

const useTitleStore = create<TitlesState>((set) => ({
  titles: { ...emptyTitles },
  setTitles: (newTitles) => set(() => ({ titles: { ...newTitles } })),
  removeTitles: () => set({ titles: { ...emptyTitles } }),
}));

export default useTitleStore;
