import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllActiveNotes } from '../../store/notesSlice';
import EditNoteForm from './NoteFormModal';
import { INote } from '../../types/note.type';
import { Table } from '../Table';
import NoteActionsButtons from './NoteActionsButtons';
import useNoteActions from '../../hooks/useNoteActions';
import { notesTableColumns } from './notesTableConfig';

const NotesTable: React.FC = () => {
    const notes = useSelector(selectAllActiveNotes);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedNote, setSelectedNote] = useState<INote | undefined>();

    const { handleDeleteNote, handleArchiveNote } = useNoteActions();

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

    const populateNotesWithActions = () => notes.map((note) => ({
        ...note, actions: (
            <NoteActionsButtons
                onEdit={() => handleEditNote(note.id)}
                onDelete={() => handleDeleteNote(note.id)}
                onArchive={() => handleArchiveNote(note.id)}
            />
        ),
    }))

    return (
        <div>
            <h2>Notes</h2>
            <Table columns={notesTableColumns} rows={populateNotesWithActions()} />
            {showEditForm && selectedNote && (
                <EditNoteForm note={selectedNote} onClose={handleEditFormClose} />
            )}
        </div>
    )
};

export default NotesTable;