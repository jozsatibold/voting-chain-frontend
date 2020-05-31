import {Type} from "@global/entities/type.entiry";

export interface VoteLite {
  id: number;
  title: string;
  end: number;
  group: string;
  type: Type;
}

export interface Vote {
  id: number;
  title: string;
  description: string;
  beginning: number | Date;
  end: number | Date;
  group?: {
    id: string,
    name: string
  };
  groupId?: number;
  type: Type;
  responses: Array<VoteResponse>;
  results: Array<VoteResult>;
}

export interface VoteResponse {
  id: number;
  value: string;
  logo: string;
  description: string;
}

export interface VoteResult {
  title: string;
  items: Array<{ label: string; value: number }>;
}
