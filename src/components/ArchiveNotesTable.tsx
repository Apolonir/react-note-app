import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, selectAllArchivedNotes, unArchiveNote } from '../store/notesSlice';
import EditNoteForm from './EditNoteForm';
import { INote } from '../types/note.type';
import { ITableColumn, Table } from './Table';

const tableColumns: ITableColumn<INote & { actions: React.ReactElement }>[] = [
    { field: "createdAt", label: "Created" },
    { field: "content", label: "Content" },
    { field: "category", label: "Category" },
    { field: "date", label: "Date" },
    { field: "actions", label: "" },
]

const ArchiveNotesTable: React.FC = () => {
    const dispatch = useDispatch();
    const notes = useSelector(selectAllArchivedNotes);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedNote, setSelectedNote] = useState<INote | undefined>();

    const handleEditFormClose = () => {
        setShowEditForm(false);
        setSelectedNote(undefined);
    };

    const handleDeleteNote = (noteId: INote['id']) => {
        dispatch(deleteNote(noteId));
    };

    const handleUnarchiveNote = (noteId: INote['id']) => {
        console.log("unArchived" + noteId);
        dispatch(unArchiveNote(noteId));
    };

    const populateNotesWithActions = () => notes.map((note) => ({
        ...note, actions: (
            <>
                <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
                <button onClick={() => handleUnarchiveNote(note.id)}>Unarchive</button>
            </>
        ),
    }))

    return (
        <div>
            <h2>Archive Notes</h2>
            <Table columns={tableColumns} rows={populateNotesWithActions()} />
            {showEditForm && selectedNote && (
                <EditNoteForm note={selectedNote} onClose={handleEditFormClose} />
            )}
        </div>
    )
};

export default ArchiveNotesTable;