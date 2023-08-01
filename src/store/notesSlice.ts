import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { INote } from '../types/note.type';
import { extractDatesFromNoteContent } from '../utils/extractDatesFromNoteContent';
import { format } from 'date-fns'

interface NotesState {
  notes: INote[];
}

const initialState: NotesState = {
  notes: [
    {
      id: new Date('2023-07-24T09:00:00').getTime().toString(),
      createdAt: format(new Date('2023-07-24T09:00:00'), 'PPP'),
      content: "Remember to buy groceries for the week.",
      category: "Task",
      type: "ACTIVE"
    },
    {
      id: new Date('2023-07-23T16:30:00').getTime().toString(),
      createdAt: format(new Date('2023-07-23T16:30:00'), 'PPP'),
      content: "Had an interesting dream last night.",
      category: "Random Thought",
      type: "ACTIVE"
    },
    {
      id: new Date('2023-07-22T10:15:00').getTime().toString(),
      createdAt: format(new Date('2023-07-22T10:15:00'), 'PPP'),
      content: "New project idea: Create a personal blog.",
      category: "Idea",
      type: "ACTIVE"
    },
    {
      id: new Date('2023-07-21T14:00:00').getTime().toString(),
      createdAt: format(new Date('2023-07-21T14:00:00'), 'PPP'),
      content: "Call Mom to wish her happy birthday.",
      category: "Task",
      type: "ACTIVE"
    },
    {
      id: new Date('2023-07-21T14:45:00').getTime().toString(),
      createdAt: format(new Date('2023-07-21T14:45:00'), 'PPP'),
      content: "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
      date: extractDatesFromNoteContent("I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021").join(', '),
      category: "Task",
      type: "ACTIVE"
    },
    {
      id: new Date('2023-07-19T11:30:00').getTime().toString(),
      createdAt: format(new Date('2023-07-19T11:30:00'), 'PPP'),
      content: "Learn a new recipe for dinner tonight.",
      category: "Task",
      type: "ARCHIVED"
    },
    {
      id: new Date('2023-07-18T08:20:00').getTime().toString(),
      createdAt: format(new Date('2023-07-18T08:20:00'), 'PPP'),
      content: "Plan vacation trip to the mountains.",
      category: "Idea",
      type: "ACTIVE"
    }
  ],
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
        createdAt: format(new Date(), 'PPP'),
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