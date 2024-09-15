export type Head = {
  counts: {
    billCount: number;
    resultCount: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
  lang: string;
};

export type DataResponse = { data: { head: Head; results?: Bill[] } };

export type Date = { date: string };

export type Chamber = {
  chamberCode: string;
  showAs: string;
  uri: string;
};

export type House = {
  chamberCode: string;
  chamberType: string;
  houseCode: string;
  houseNo: string;
  showAs: string;
  uri: string;
};

export type Act = {
  actNo: string;
  actYear: string;
  dateSigned: string;
  longTitleEn: string;
  longTitleGa: string;
  shortTitleEn: string;
  shortTitleGa: string;
  statutebookURI: string;
  uri: string;
};

export type Stage = {
  event: {
    chamber: Chamber;
    dates: Date[];
    house: House;
    progressStage: number;
    showAs: string;
    stageCompleted: boolean;
    stageOutcome: string | null;
    stageURI: string;
    uri: string;
  };
};

export type DocInfo = {
  date: string;
  docType: string;
  formats: {
    pdf: {
      uri: string;
    };
    xml: null;
  };
  lang: string;
  showAs: string;
  uri: string;
};

export type Version = {
  version: DocInfo;
};

export type RelatedDoc = {
  version: DocInfo;
};

export type Sponsor = {
  sponsor: {
    as: {
      showAs: string | null;
      uri: string | null;
    };
    by: {
      showAs: string | null;
      uri: string | null;
    };
    isPrimary: boolean;
  };
};

export type OriginHouse = {
  showAs: string;
  uri: string;
};

export type Event = {
  event: {
    chamber: Chamber;
    dates: Date[];
    eventURI: string;
    showAs: string;
    uri: string;
  };
};

export type Status =
  | "Current"
  | "Withdrawn"
  | "Enacted"
  | "Rejected"
  | "Defeated"
  | "Lapsed";

export interface BillInner {
  act: Act | null;
  amendmentLists: [];
  billNo: string;
  billType: string;
  billTypeURI: string;
  billYear: string;
  debates: [];
  events: Event[];
  lastUpdated: string;
  longTitleEn: string;
  longTitleGa: string;
  method: string;
  methodURI: string;
  mostRecentStage: Stage;
  originHouse: OriginHouse;
  originHouseURI: string;
  relatedDocs: RelatedDoc[];
  shortTitleEn: string;
  shortTitleGa: string;
  source: string;
  sourceURI: string;
  sponsors: Sponsor[];
  stages: Stage[];
  status: Status;
  statusURI: string;
  uri: string;
  versions: Version[];
}

export interface Bill {
  bill: BillInner;
}

export interface Title {
  en: string;
  ga: string;
}

export type Params = {
  page: number;
  rowsPerPage: number;
  bill_status: string;
};
