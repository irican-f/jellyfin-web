// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-no-bind */

import React, { FunctionComponent, useEffect } from 'react';
import { TablePagination } from '@mui/material';

import { useSearchParams } from 'react-router-dom';
import { useFetchplexBot } from 'hooks/Plexbot/useFetchplexBot';

import { TStatus, IData, ICollabsibleData } from '../types';

import TableDisplay from './TableDisplay';
import TablePaginationActions from './PaginationAction';

function createData(
    id: string,
    name: string,
    provider: string,
    category: number,
    addedBy: string,
    status: TStatus,
    collabsibleData: ICollabsibleData
): IData {
    return { id, name, provider, category, addedBy, status, collabsibleData };
}

const convertToNumber = (value: string | number): number => {
    return typeof value === 'string' ? parseInt(value as string, 10) : value;
};

const PlexBotDashboard: FunctionComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = React.useState(convertToNumber(searchParams.get('page') as string) || 0);
    const [rowsPerPage, setRowsPerPage] = React.useState(convertToNumber(searchParams.get('rowsPerPage') as string) || 25);

    const { data: plexLinks, isLoading } = useFetchplexBot(page, rowsPerPage);
    console.log({ plexLinks });

    const rows = plexLinks?.items?.map((item) => {
        return createData(
            item?.id || '',
            item?.name || '',
            item.provider?.name || '',
            item.category || 0,
            item.createdBy || '',
            item.downloaded ? 'Downloaded' : 'Active',
            {
                season: item.season || 0,
                quality: item.quality || '',
                version: item.version || '',
                hasError: item.hasError || false,
                url: item?.provider?.url ? item.provider.url + item.url : '',
                totalEpisodesCount: item.totalEpisodesCount || 0,
                airedEpisodesCount: item.airedEpisodesCount || 0
            }
        );
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    useEffect(() => {
        setSearchParams({
            ...searchParams,
            rowsPerPage: rowsPerPage.toString(),
            page: page.toString()
        });
    }, [page, rowsPerPage, searchParams, setSearchParams]);

    return (

        <div className='padded-left padded-right padded-bottom-page'>

            <h1>DashBoard</h1>

            { isLoading && <div>Loading...</div>}

            { !isLoading && plexLinks && plexLinks.totalPages && rows && (
                <TableDisplay
                    rows={rows}
                    rowPerPage={rowsPerPage}
                >

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        colSpan={3}
                        count={plexLinks.totalPages}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableDisplay>
            )}
        </div>
    );
};

export default PlexBotDashboard;

