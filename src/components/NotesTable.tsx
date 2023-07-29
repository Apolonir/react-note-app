import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../store/notesSlice';
import EditNoteForm from './EditNoteForm';

interface Note {
    id: string;
    createdAt: string;
    content: string;
    category: string;
}

interface NotesTableProps {
    notes: Note[];
}

const NotesTable: React.FC<NotesTableProps> = ({ notes }) => {
    const dispatch = useDispatch();
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const handleEditNote = (noteId: string) => {
        const noteToEdit = notes.find((note) => note.id === noteId);
        if (noteToEdit) {
            setSelectedNote(noteToEdit);
            setShowEditForm(true);
        }
    };

    const handleDeleteNote = (noteId: string) => {
        dispatch(deleteNote(noteId));
    };

    const handleEditFormClose = () => {
        setShowEditForm(false);
        setSelectedNote(null);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id}>
                            <td>{note.id}</td>
                            <td>{note.category}</td>
                            <td>{note.content}</td>
                            <td>{note.createdAt}</td>
                            <td>
                                <button onClick={() => handleEditNote(note.id)}>Edit</button>
                                <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showEditForm && selectedNote && (
                <EditNoteForm note={selectedNote} onClose={handleEditFormClose} />
            )}
        </div>
    );
};

export default NotesTable;
