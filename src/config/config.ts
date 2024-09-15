const apiUrlBase = "https://api.oireachtas.ie/v1";

export const apiUrl = { legislation: apiUrlBase + "/legislation" };

export const pages = {
  home: { label: "Home", path: "/" },
  favourites: { label: "Favourites", path: "/favourites" },
};

export const title = {
  text: "Bill Information",
  variant: "h1",
  gutterBottom: true,
  align: "center",
  sx: { typography: { lg: "h1", md: "h2", xs: "h4" } },
};

export const table = {
  headers: {
    save: { text: "Save", align: "center" },
    billNo: { text: "Number", align: "center" },
    billType: { text: "Type", align: "center" },
    status: { text: "Status", align: "center" },
    sponsors: { text: "Sponsor", align: "center" },
    titles: { text: "Titles", align: "center" },
  },
  cells: {
    save: { align: "center", width: 50 },
    billNo: { align: "center", width: 100 },
    billType: { align: "center", width: 140 },
    status: { align: "center", width: 140 },
    sponsors: { align: "center" },
    titles: { align: "center", width: 100 },
  },
  columnsOrder: ["save", "billNo", "billType", "status", "sponsors", "titles"],
  rowsPerPage: { options: [8, 12, 16], default: 8 },
  "aria-label": { whenLoading: "loading table...", whenLoaded: "legislation" },
};

export const filters = [
  {
    name: "bill_status",
    label: "Filter by status",
    options: [
      { label: "None", value: "none" },
      { label: "Current", value: "Current" },
      { label: "Withdrawn", value: "Withdrawn" },
      { label: "Enacted", value: "Enacted" },
      { label: "Rejected", value: "Rejected" },
      { label: "Defeated", value: "Defeated" },
      { label: "Lapsed", value: "Lapsed" },
    ],
    defaultOption: 0,
  },
];
