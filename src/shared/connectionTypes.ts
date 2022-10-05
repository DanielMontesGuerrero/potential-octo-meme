export enum ConnectionEvents {
  PLAYER_JOINED = 'player_joined',
  COUNTDOWN = 'countdown',
  CONNECTION_ACCEPTED = 'connection_accepted',
  STATE_UPDATE = 'state_update',
  GAME_EVENT = 'game_event',
  GAME_FINISHED = 'game_finished',
  GET_STATE_REQUEST = 'get_state_request',
}

export enum ErrorCodes {
  OK,
  EVENT_IGNORED,
  UNAUTHORIZED,
  PLAYER_NOT_JOINED,
  MISSING_DATA,
}
