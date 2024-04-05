import React, { FunctionComponent } from 'react';

import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter
} from '@mui/material';

import { IData } from './types';

import Row from './Row';

interface IColumn {
    id: 'id' | 'name' | 'provider' | 'category' | 'addedBy' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right';
    hidden?: boolean;
    format?: (value: string | number) => JSX.Element;
  }

const columns: readonly IColumn[] = [
    { id: 'id', label: 'Id', minWidth: 100, hidden: true },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'provider', label: 'Provider', minWidth: 100 },
    { id: 'category', label: 'Category', minWidth: 100 },
    { id: 'addedBy', label: 'Added By', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 }
];

interface ITableDisplayProps {
    rows: IData[];
    rowPerPage: number;
}

const TableDisplay: FunctionComponent<ITableDisplayProps> = ({ rows, rowPerPage, children }) => {
    console.log({ rows });
    return ( <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 1000 }}>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        <TableCell />
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
                                <Row key={row.id} row={row} />
                            );
                        })
                    }
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
