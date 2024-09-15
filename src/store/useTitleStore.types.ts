export type Titles = { en: string; ga: string };

export interface TitlesState {
  titles: Titles;
  setTitles: (newTitles: Titles) => void;
  removeTitles: () => void;
}
