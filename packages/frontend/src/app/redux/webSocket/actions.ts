import { action } from 'typesafe-actions';
import { WebSocketActionTypes } from 'app/redux/webSocket/types';
import {
    Room,
    JoinRoomPayload,
    LeaveRoomPayload,
    JoinedRoomPayload,
    CreateRoomPayload,
} from '@planning-poker/shared';

export const joinRoomRequest = (joinRoomPayload: JoinRoomPayload) => action(WebSocketActionTypes.JOIN_ROOM_REQUEST, joinRoomPayload);
export const joinRoomSuccess = (joinedRoomPayload: JoinedRoomPayload) => action(WebSocketActionTypes.JOIN_ROOM_SUCCESS, joinedRoomPayload);
export const joinRoomFailure = () => action(WebSocketActionTypes.JOIN_ROOM_FAILURE);
export const newPlayer = (currentRoomState: Room) => action(WebSocketActionTypes.NEW_PLAYER, currentRoomState);

export const leaveRoomRequest = (leaveRoomPayload: LeaveRoomPayload) => action(WebSocketActionTypes.LEAVE_ROOM_REQUEST, leaveRoomPayload);
export const leaveRoomSuccess = () => action(WebSocketActionTypes.LEAVE_ROOM_SUCCESS);
export const leaveRoomFailure = () => action(WebSocketActionTypes.LEAVE_ROOM_FAILURE);
export const playerLeft = (currentRoomState: Room) => action(WebSocketActionTypes.PLAYER_LEFT, currentRoomState);

export const createRoomRequest = (data: CreateRoomPayload) => action(WebSocketActionTypes.CREATE_ROOM_REQUEST, data);
export const createRoomSuccess = (data: Room) => action(WebSocketActionTypes.CREATE_ROOM_SUCCESS, { data });
export const createRoomFailure = () => action(WebSocketActionTypes.CREATE_ROOM_FAILURE);
