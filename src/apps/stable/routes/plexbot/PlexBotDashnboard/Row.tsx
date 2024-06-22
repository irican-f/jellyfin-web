// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-no-bind */

import React, { FunctionComponent } from 'react';

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Box,
    Collapse,
    Typography,
    Chip,
    Link
} from '@mui/material';

import { categories } from '../utils';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { IData } from '../types';

interface IRowProps {
    row: IData;
}

const Row: FunctionComponent<IRowProps> = ({ row }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component='th' scope='row'>
                    {row.name}
                </TableCell>
                <TableCell component='th' scope='row'>
                    {row.provider}
                </TableCell>
                <TableCell component='th' scope='row'>
                    <div>{categories[row.category]}</div>
                </TableCell>
                <TableCell component='th' scope='row'>
                    {row.addedBy}
                </TableCell>
                <TableCell component='th' scope='row'>
                    <Chip label={row.status} color={row.status === 'Downloaded' ? 'primary' : 'info'} variant='outlined'/>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant='h6' gutterBottom component='div'>
                                  Extra
                            </Typography>
                            <Table size='small' aria-label='purchases'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quality</TableCell>
                                        <TableCell>Season</TableCell>
                                        <TableCell>Has Error</TableCell>
                                        <TableCell>url</TableCell>
                                        <TableCell>Aired Episodes</TableCell>
                                        <TableCell>Total Episodes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{row.collabsibleData.quality}</TableCell>
                                        <TableCell>{row.collabsibleData.season}</TableCell>
                                        <TableCell>{row.collabsibleData.hasError ? <Chip label='Error' color='error' variant='outlined'/> : <Chip label='No error' color='primary' variant='outlined' />}</TableCell>
                                        <TableCell>
                                            <Link href={row.collabsibleData.url} color='inherit'>
                                                {row.collabsibleData.url}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{row.collabsibleData.airedEpisodesCount}</TableCell>
                                        <TableCell>{row.collabsibleData.totalEpisodesCount}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default Row;
