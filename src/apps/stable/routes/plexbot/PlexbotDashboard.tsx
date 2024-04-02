// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-no-bind */

import React, { FunctionComponent, useEffect } from 'react';

// TODO Trad
// import globalize from '../../../../scripts/globalize';

import { TablePagination } from '@mui/material';

import { useSearchParams } from 'react-router-dom';
import { useFetchplexBot } from 'hooks/useFetchplexBot';

import { TProvider, TStatus, Data } from './types';

import Page from '../../../../components/Page';
import TableDisplay from './TableDisplay';
import TablePaginationActions from './PaginationAction';

import './plexbotDashboard.scss';

function createData(
    id: string,
    name: string,
    provider: TProvider,
    category: number,
    addedBy: string,
    status: TStatus
): Data {
    return { id, name, provider, category, addedBy, status };
}

const convertToNumber = (value: string | number): number => {
    return typeof value === 'string' ? parseInt(value as string, 10) : value;
};

const PlexBotDashboard: FunctionComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = React.useState(convertToNumber(searchParams.get('page') as string) || 0);
    const [rowsPerPage, setRowsPerPage] = React.useState(convertToNumber(searchParams.get('rowsPerPage') as string) || 25);

    const { data: plexLinks, isLoading } = useFetchplexBot(page, rowsPerPage);

    const rows = plexLinks?.items.map((item) => {
        return createData(
            item.id,
            item.name,
            item.provider.name as TProvider,
            item.category,
            item.createdBy,
            item.downloaded ? 'Downloaded' : 'Planed');
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
        <Page
            id='plexBotIndexPage'
            title='PlexBot'
            className='mainAnimatedPage libraryPage backdropPage collectionEditorPage pageWithAbsoluteTabs withTabs'
        >
            <div className='padded-left padded-right padded-bottom-page'>

                <h1>Plexbot</h1>

                { isLoading && <div>Loading...</div>}

                { !isLoading && plexLinks && rows && (
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
        </Page>
    );
};

export default PlexBotDashboard;

