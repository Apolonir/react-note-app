import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewNote } from '../store/notesSlice';

const AddNoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Task');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (content.trim() === '') {
      alert('Error: Note content cannot be empty.');
    } else {
      dispatch(
        addNewNote({
          id: new Date().getTime().toString(),
          createdAt: new Date().toISOString(),
          content,
          category,
        })
      );
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
        </select>
      </div>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNoteForm;
