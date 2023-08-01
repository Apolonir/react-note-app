import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewNote, editNote } from '../store/notesSlice';
import { INote } from '../types/note.type';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


interface EditNoteFormProps {
  note?: INote;
  onClose: () => void;
}

const noteTemplate: Partial<INote> = {
  content: '',
  category: "Task"
}

const EditNoteForm: React.FC<EditNoteFormProps> = ({ note = noteTemplate, onClose }) => {
  const dispatch = useDispatch();
  const [editedNote, setEditedNote] = useState<INote | Partial<INote>>(note);

  const createNote = (newNote: Partial<INote>) => {
    dispatch(addNewNote(newNote))
  }

  const updateNote = (updatedNote: INote) => {
    dispatch(editNote(updatedNote));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editedNote.content || editedNote.content.trim() === '') {
      alert('Error: Note content cannot be empty.');
      return;
    }
    if ("id" in editedNote) {
      updateNote(editedNote as INote);
    } else {
      createNote(editedNote);
    }
    onClose();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
    const { target: { name, value } } = event;
    setEditedNote(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content:</label>
            <input
              type="text"
              id="content"
              value={editedNote.content}
              onChange={handleChange}
              name="content"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <select
              id="category"
              value={editedNote.category}
              onChange={handleChange}
              name="category"
              className="form-select"
            >
              <option value="Task">Task</option>
              <option value="Random Thought">Random Thought</option>
              <option value="Idea">Idea</option>
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">{"id" in editedNote ? 'Update Note' : 'Create Note'}</Button>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};


export default EditNoteForm;