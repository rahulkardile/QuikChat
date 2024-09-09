import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const LOGIN_URL = BASE_URL + "/auth/login";
export const GET_ALL_CHAT_GROUP_URL = BASE_URL + "/all-chat-group";
export const CREATE_CHAT_GROUP_URL = BASE_URL + "/chat-group";
export const UPDATE_CHAT_GROUP_URL = BASE_URL + "/chat-group/update";
export const DELETE_CHAT_GROUP_URL = BASE_URL + "/chat-group/delete";


