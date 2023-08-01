import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, selectAllActiveNotes, archiveNote } from '../store/notesSlice';
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

const NotesTable: React.FC = () => {
    const dispatch = useDispatch();
    const notes = useSelector(selectAllActiveNotes);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedNote, setSelectedNote] = useState<INote | undefined>();

    const handleEditNote = (noteId: INote['id']) => {
        const noteToEdit = notes.find((note) => note.id === noteId);
        if (noteToEdit) {
            setSelectedNote(noteToEdit);
            setShowEditForm(true);
        }
    };

    const handleEditFormClose = () => {
        setShowEditForm(false);
        setSelectedNote(undefined);
    };

    const handleDeleteNote = (noteId: INote['id']) => {
        dispatch(deleteNote(noteId));
    };

    const handleArchiveNote = (noteId: INote['id']) => {
        console.log("archived" + noteId)
        dispatch(archiveNote(noteId));
    };

    const populateNotesWithActions = () => notes.map((note) => ({
        ...note, actions: (
            <>
                <button onClick={() => handleEditNote(note.id)}>Edit</button>
                <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
                <button onClick={() => handleArchiveNote(note.id)}>Archive</button>
            </>
        ),
    }))

    return (
        <div>
            <h2>Notes</h2>
            <Table columns={tableColumns} rows={populateNotesWithActions()} />
            {showEditForm && selectedNote && (
                <EditNoteForm note={selectedNote} onClose={handleEditFormClose} />
            )}
        </div>
    )
};

export default NotesTable;