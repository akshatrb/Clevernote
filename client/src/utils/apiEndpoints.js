//we will have all our api endpoints here

export const BASE_URL = `${process.env.BASE_URL}:${process.env.port}`; // our server is running on port 2000
export const CREATE_NOTE = '/api/note';
export const UPDATE_NOTE = '/api/note/';
export const DELETE_NOTE = '/api/note/';
export const GET_ALL_NOTES = '/api/notes/all';
export const GET_TRASH_NOTES = '/api/notes/trash';
