import React, { useState } from 'react';
import ActiveNotesTable from './components/noteTables/ActiveNotesTable';
import NoteFormModal from './components/noteTables/NoteFormModal';
import SummaryTable from './components/summaryTable/SummaryTable';
import ArchivedNotesTable from './components/noteTables/ArchivedNotesTable';
import Button from 'react-bootstrap/Button';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
      <div>
        {open && <NoteFormModal onClose={() => setOpen(false)}/>}
        <ActiveNotesTable />
        <Button variant="primary" onClick={() => setOpen(true)}>Add new note</Button>
        <SummaryTable />
        <ArchivedNotesTable />
      </div>
  );
};

export default App;
