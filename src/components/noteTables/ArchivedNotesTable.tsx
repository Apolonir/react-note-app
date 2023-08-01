import { useSelector } from 'react-redux';
import { selectAllArchivedNotes } from '../../store/notesSlice';
import { Table } from '../Table';
import NoteActionsButtons from './NoteActionsButtons';
import useNoteActions from '../../hooks/useNoteActions';
import { notesTableColumns } from './notesTableConfig';

const ArchiveNotesTable: React.FC = () => {
    const notes = useSelector(selectAllArchivedNotes);

    const { handleDeleteNote, handleUnarchivedNote } = useNoteActions();

    const populateNotesWithActions = () => notes.map((note) => ({
        ...note, actions: (
            <NoteActionsButtons
                onDelete={() => handleDeleteNote(note.id)}
                onUnarchived={() => handleUnarchivedNote(note.id)}
            />
        ),
    }))

    return (
        <div>
            <h2>Archive Notes</h2>
            <Table columns={notesTableColumns} rows={populateNotesWithActions()} />
        </div>
    )
};

export default ArchiveNotesTable;