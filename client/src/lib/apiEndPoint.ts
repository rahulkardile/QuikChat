import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const LOGIN_URL = BASE_URL + "/auth/login";
export const CREATE_CHAT_GROUP_URL = BASE_URL + "/chat-group";
export const GET_ALL_CHAT_GROUP_URL = BASE_URL + "/all-chat-groupp";


