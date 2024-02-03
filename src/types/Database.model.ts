import { CellState } from "./CellState";

export type SingleGameGridState = Record<number, CellState>; // number key will be from 1 to 9
export type Game = Record<number, SingleGameGridState>; // 1-9 number of grids and child grids
export interface Empty_ROOM_Model {
  roomId: string;
  author: string;
  guest?: string;
  state: "playing" | "finished" | "waiting";
  memberJoined: number;
  userA?: string;
}
export interface MatchModel {
  gridWinner?: Record<number, string>; // grid number and uid;
  memberJoined: number;
  winner?: string;
  userA?: string;
  userB?: string;
  author: string;
  guest: string;
  roomId: string;
  playersOnline?: Record<string, boolean>; // uid and online status
  winners?: Record<number, string>; // game numbers and uids
  state: "playing" | "finished" | "waiting";
  lastPlayed?: number; //seconds
  currentTurn?: string; //uid of last player
  currentGridNumber?: number; // based on last played user
  game?: Game;
}

export interface Winners {
  groupAndWinners: {
    // key is sorted form of uids of both users
    [key: string]: Record<string, number>; //uid of user, games win
  };
  winCount: Record<string, number>;
  lostCount: Record<string, number>;
}
