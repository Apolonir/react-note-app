import { useDispatch } from 'react-redux';
import { deleteNote, archivedNote, unArchivedNote } from '../store/notesSlice';
import { INote } from '../types/note.type';

const useNoteActions = () => {
  const dispatch = useDispatch();

  const handleDeleteNote = (noteId: INote['id']) => {
    dispatch(deleteNote(noteId));
  };

  const handleArchiveNote = (noteId: INote['id']) => {
    console.log("archived" + noteId);
    dispatch(archivedNote(noteId));
  };

  const handleUnarchivedNote = (noteId: INote['id']) => {
    console.log("unArchived" + noteId);
    dispatch(unArchivedNote(noteId));
  };

  return { handleDeleteNote, handleArchiveNote, handleUnarchivedNote };
};

export default useNoteActions;