import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editNote } from '../store/notesSlice';

interface Note {
  id: string;
  createdAt: string;
  content: string;
  category: string;
}

interface EditNoteFormProps {
  note: Note;
  onClose: () => void;
}

const EditNoteForm: React.FC<EditNoteFormProps> = ({ note, onClose }) => {
  const dispatch = useDispatch();
  const [editedNote, setEditedNote] = useState(note);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editedNote.content.trim() === '') {
      alert('Error: Note content cannot be empty.');
    } else {
      dispatch(
        editNote({
          noteId: editedNote.id,
          updatedNote: {
            ...editedNote,
          },
        })
      );
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          value={editedNote.content}
          onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={editedNote.category}
          onChange={(e) => setEditedNote({ ...editedNote, category: e.target.value })}
        >
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
        </select>
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditNoteForm;
