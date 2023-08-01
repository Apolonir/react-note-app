import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllNotes } from '../store/notesSlice';
import { INotesCategorySummary, NoteCategory } from '../types/note.type';
import { ITableColumn, Table } from './Table';

const tableColumns: ITableColumn<INotesCategorySummary>[] = [
    { field: "category", label: "Category" },
    { field: "active", label: "Active" },
    { field: "archived", label: "Archived" },
]

const SummeryTable: React.FC = () => {
    const notes = useSelector(selectAllNotes);

    const getSummary = () => notes.reduce((accum, currentValue) => {
        const {category} = currentValue;
        if (accum[category]) {
            return {
                 ...accum,
                  [category]: {
                     id: category, 
                     active: accum[category].active + (currentValue.type === 'ACTIVE' ? 1 : 0), 
                     archived: accum[category].archived + (currentValue.type === 'ARCHIVED' ? 1 : 0), category
                    }  
                }
        }
        return { ...accum, [category]: { id: category, active: currentValue.type === 'ACTIVE' ? 1 : 0, archived: currentValue.type === 'ARCHIVED' ? 1 : 0, category } }
    }, {} as Record<NoteCategory, INotesCategorySummary>);

    return (
        <div>
            <h2>Summary table</h2>
            <Table columns={tableColumns} rows={Object.values(getSummary()) } />
        </div>

    )
};

export default SummeryTable;