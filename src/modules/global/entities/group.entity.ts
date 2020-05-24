import {VoteLite} from "@global/entities/vote.enitity";
import {Type} from "@global/entities/type.entiry";

export interface Group {
  id: number;
  name: string;
  description: string;
  type: Type;
  voting: {
    upcoming: Array<VoteLite>,
    finished: Array<VoteLite>
  };
}

export interface GroupLite {
  id: number;
  name: string;
  type: string;
}

export interface GroupList {
  id: number;
  name: string;
  type: Type;
}
