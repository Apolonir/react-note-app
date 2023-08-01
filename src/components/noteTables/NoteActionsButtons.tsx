import React from 'react';

interface NoteActionsButtonsProps {
    onDelete: () => void;
    onEdit?: () => void;
    onArchive?: () => void;
    onUnarchived?: () => void;
  }

const NoteActionsButtons: React.FC<NoteActionsButtonsProps> = ({ onDelete, onEdit, onArchive, onUnarchived }) => (
  <>
    {onEdit && <button onClick={onEdit}>Edit</button>}
    <button onClick={onDelete}>Delete</button>
    {onArchive && <button onClick={onArchive}>Archive</button>}
    {onUnarchived && <button onClick={onUnarchived}>Unarchived</button>}
  </>
);

export default NoteActionsButtons;