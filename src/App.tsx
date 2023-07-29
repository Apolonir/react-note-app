import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import NotesTable from './components/NotesTable';
import AddNoteForm from './components/AddNoteForm';
import { useSelector } from 'react-redux';
import { selectAllNotes } from './store/notesSlice';

const App: React.FC = () => {
  // Припустимо, у вашому сторі є стан зі списком нотаток:
  const notes = useSelector(selectAllNotes);

  return (
    <Provider store={store}>
      <div>
        <h2>Notes</h2>
        <AddNoteForm />
        <NotesTable notes={notes}/>
      </div>
    </Provider>
  );
};

export default App;
