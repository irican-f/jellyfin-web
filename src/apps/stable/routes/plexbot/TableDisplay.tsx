import React, { FunctionComponent } from 'react';

import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    TableFooter
} from '@mui/material';

import { Data } from './types';

interface Column {
    id: 'id' | 'name' | 'provider' | 'category' | 'addedBy' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right';
    hidden?: boolean;
    format?: (value: string | number) => JSX.Element;
  }

const columns: readonly Column[] = [
    { id: 'id', label: 'Id', minWidth: 100, hidden: true },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'provider', label: 'Provider', minWidth: 100 },
    { id: 'category', label: 'Category', minWidth: 100 },
    { id: 'addedBy', label: 'Added By', minWidth: 100 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        format: (value: string | number) => {
            switch (value) {
                case 'Downloaded':
                    return <Chip label='Downloaded' color={'primary'} variant='outlined'/>;
                case 'Extracted':
                    return <Chip label='Extracted' color={'info'} variant='outlined'/>;
                default:
                    return <Chip label='Unknown' color={'info'} variant='outlined'/>;
            }
        }
    }
];

interface TableDisplayProps {
    rows: Data[];
    rowPerPage: number;
}

const TableDisplay: FunctionComponent<TableDisplayProps> = ({ rows, rowPerPage, children }) => {
    return ( <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 1000 }}>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        {
                            columns
                                .filter((col) => !col?.hidden)
                                .map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        ?.slice(0, rowPerPage)
                        .map((row) => {
                            return (
                                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                                    {
                                        columns
                                            .filter((col) => !col?.hidden)
                                            .map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ?
                                                            column.format(value) :
                                                            value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
        <Table>
            <TableFooter>
                <TableRow>
                    {children}
                </TableRow>
            </TableFooter>
        </Table>
    </Paper>
    );
};

export default TableDisplay;
