import React, { useState } from 'react';
import NotesTable from './components/NotesTable';
import EditNoteForm from './components/EditNoteForm';
import SummeryTable from './components/SummaryTable';
import ArchiveNotesTable from './components/ArchiveNotesTable';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
      <div>
        <h2>Notes</h2>
        {open && <EditNoteForm onClose={() => setOpen(false)}/>}
        <NotesTable />
        <button onClick={() => setOpen(true)}>Add new note</button>
        <SummeryTable />
        <ArchiveNotesTable />
      </div>
  );
};

export default App;
