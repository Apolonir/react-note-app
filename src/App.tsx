import React, { useState } from 'react';
import NotesTable from './components/noteTables/ActiveNotesTable';
import EditNoteForm from './components/noteTables/EditNoteForm';
import SummeryTable from './components/summaryTable/SummaryTable';
import ArchiveNotesTable from './components/noteTables/ArchivedNotesTable';
import Button from 'react-bootstrap/Button';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
      <div>
        {open && <EditNoteForm onClose={() => setOpen(false)}/>}
        <NotesTable />
        <Button variant="primary" onClick={() => setOpen(true)}>Add new note</Button>
        <SummeryTable />
        <ArchiveNotesTable />
      </div>
  );
};

export default App;
