import api from 'app/services/api';
import { CreateRoomPayload } from '@planning-poker/shared';

export const createRoom = (payload: CreateRoomPayload) => api.request({
      method: 'post',
      url: '/room',
      data: payload,
});
