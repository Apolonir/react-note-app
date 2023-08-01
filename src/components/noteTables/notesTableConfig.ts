import { ITableColumn } from '../Table';
import { INote } from '../../types/note.type';

export const notesTableColumns: ITableColumn<INote & { actions: React.ReactElement }>[] = [
    { field: "createdAt", label: "Created" },
    { field: "content", label: "Content" },
    { field: "category", label: "Category" },
    { field: "date", label: "Date" },
    { field: "actions", label: "" },
];