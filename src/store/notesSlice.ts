import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { INote } from '../types/note.type';
import { extractDatesFromNoteContent } from '../utils/extractDatesFromNoteContent';

interface NotesState {
  notes: INote[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNewNote: (state, action: PayloadAction<Partial<INote>>) => {
      const dates = extractDatesFromNoteContent(action.payload.content || '');
      const date = dates?.join(', ') || '';
      state.notes.push({
        id: new Date().getTime().toString(),
        createdAt: new Date().toISOString(),
        content: action.payload.content || "",
        date: date || "",
        category: action.payload.category || "Task",
        type: "ACTIVE"
      });
    },
    editNote: (state, action: PayloadAction<INote>) => {
      const { payload: updatedNote } = action;
      const dates = extractDatesFromNoteContent(updatedNote.content || '');
      const date = dates?.join(', ') || '';
      updatedNote.date = date;
      state.notes
        .forEach((note, index) => note.id === updatedNote.id && (state.notes[index] = updatedNote));
    },
    deleteNote: (state, action: PayloadAction<INote['id']>) => {
      const noteId = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteId);
    },
    archivedNote: (state, action: PayloadAction<INote['id']>) => {
      const noteId = action.payload;
      const noteToArchive = state.notes.find((note) => note.id === noteId);
      if (noteToArchive) {
        noteToArchive.type = "ARCHIVED";
      }
    },
    unArchivedNote: (state, action: PayloadAction<INote['id']>) => {
      const noteId = action.payload;
      const noteToArchive = state.notes.find((note) => note.id === noteId);
      if (noteToArchive) {
        noteToArchive.type = "ACTIVE";
      }
    }
  },
});

export const { addNewNote, editNote, deleteNote, archivedNote, unArchivedNote } = notesSlice.actions;
export default notesSlice.reducer;

export const selectAllNotes = (state: RootState): INote[] => state.notes.notes;
export const selectAllActiveNotes = (state: RootState): INote[] => state.notes.notes.filter(note => note.type === "ACTIVE");
export const selectAllArchivedNotes = (state: RootState): INote[] => state.notes.notes.filter(note => note.type === "ARCHIVED");