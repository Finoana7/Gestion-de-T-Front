import io from 'socket.io-client'
import { api } from '../constant';

export const socket = io(api);