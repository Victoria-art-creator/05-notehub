import type { Note, NoteTag } from "../types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface NoteHTTPResponse {
  notes: Note[];
  page: number;
  perPage: number;
  total_pages: number;
}

interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  search: string,
  page: number
): Promise<NoteHTTPResponse> => {
  const options = {
    params: {
      search,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  };

  const response = await axios.get<NoteHTTPResponse>("/notes", options);

  return response.data;
};

export const createNote = async (newNote: NewNote) => {
  const { data } = await axios.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (noteId: string) => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`);
  return data;
};
