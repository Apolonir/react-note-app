import React from 'react';
import Button from 'react-bootstrap/Button';

interface NoteActionsButtonsProps {
    onDelete: () => void;
    onEdit?: () => void;
    onArchive?: () => void;
    onUnarchived?: () => void;
  }

const NoteActionsButtons: React.FC<NoteActionsButtonsProps> = ({ onDelete, onEdit, onArchive, onUnarchived }) => (
  <>
    {onEdit && <Button variant="info" onClick={onEdit}>Edit</Button>}
    {onArchive && <Button variant="warning" onClick={onArchive}>Archive</Button>}
    {onUnarchived && <Button variant="warning" onClick={onUnarchived}>Unarchived</Button>}
    <Button variant="danger" onClick={onDelete}>Delete</Button>
  </>
);

export default NoteActionsButtons;