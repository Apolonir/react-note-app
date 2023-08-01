export interface INote {
    id: string | number;
    createdAt: string;
    content: string;
    date?: string;
    category: NoteCategory;
    type: 'ARCHIVED' | 'ACTIVE';
}

export type NoteCategory = 'Task' | 'Random Thought' | 'Idea';

export interface INotesCategorySummary {
    id: string | number,
    active: number,
    archived: number,
    category: NoteCategory,
}