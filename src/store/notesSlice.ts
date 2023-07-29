import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Note {
  id: string;
  createdAt: string;
  content: string;
  category: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNewNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    editNote: (state, action: PayloadAction<{ noteId: string; updatedNote: Note }>) => {
      const { noteId, updatedNote } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === noteId);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = updatedNote;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const noteId = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteId);
    },
  },
});

export const { addNewNote, editNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;

export const selectAllNotes = (state: RootState) => state.notes.notes;
