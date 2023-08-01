import React from "react";
import ITable from 'react-bootstrap/Table';


export interface ITableColumn<TData extends { id: string | number }> {
    field: keyof TData,
    label: string,
}

export type TableCellFormatter<TData extends { id: string | number }> = (value: unknown, context: {
    column: ITableColumn<TData>,
    row: TData
}) => (React.ReactElement | string);

export interface ITableProps<TData extends { id: string | number }> {
    columns: ITableColumn<TData>[],
    rows?: TData[],
    isFiltered?: boolean,
    isLoading?: boolean,

    formatter?: Partial<Record<keyof TData, TableCellFormatter<TData>>>,
    indexed?: boolean,
}

const mapCellValue = (value: unknown) => {
    return <>{value}</>;
};

export const Table = <TData extends { id: string | number }>({
    columns,
    rows = [],
    formatter = {},
    indexed = false,
    isFiltered = false,
    isLoading = false,
}: ITableProps<TData>) => {
    const renderColumn = (column: ITableColumn<TData>) => {
        return (
            <th key={String(column.field)}>
                {column.label}
            </th>
        );
    }

    const renderCell = (column: ITableColumn<TData>, row: TData) => {
        const value: unknown = row[column.field];
        const customFormatter = formatter[column.field]
        const formattedValue = customFormatter
            ? customFormatter(value, { column, row })
            : mapCellValue(value);

        return (
            <td
                key={`${row.id}-${String(column.field)}-${String(value)}`}
            >
                {formattedValue}
            </td>
        );
    }

    const renderRow = (row: TData, index: number) => {
        console.log("Row key:", row.id, "RowContent", row); // Delete  
        return (
            <tr className={index % 2 === 0 ? 'even-row' : 'odd-row'} key={row.id}>
                {indexed && <td>{index + 1}</td>}
                {columns
                    .map(column => renderCell(column, row))}
            </tr>
        )
    }

    const getEmptyListMessage = () => {
        switch (true) {
            case isLoading:
                return 'Loading...';
            case isFiltered:
                return 'No results were found.';
            default:
                return 'The list is empty.'
        }
    }

    const renderEmptyListRow = () => (
        <tr key="empty-list-row">
            <td colSpan={columns.length + +indexed} className="text-center">
                {getEmptyListMessage()}
            </td>
        </tr>
    )

    return (
        <ITable>
            <thead className="table-head">
                <tr>
                    {indexed && <th>#</th>}
                    {columns
                        .map(renderColumn)
                    }
                </tr>
            </thead>
            <tbody>
                {rows.length ? rows.map(renderRow) : renderEmptyListRow()}
            </tbody>
        </ITable>
    )
}

