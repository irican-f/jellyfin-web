// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-no-bind */

import React, { FunctionComponent, useCallback } from 'react';

import Page from '../../../../components/Page';
import { Tabs, Tab } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import useCurrentTab from 'hooks/useCurrentTab';

const TabRoutes = [
    {
        path: '/',
        tabs: [
            {
                index: 0,
                label: 'Link Display'
            }, {
                index: 1,
                label: 'Search'
            }
        ]
    }
];

const Dashboard: FunctionComponent = () => {
    const { searchParams, setSearchParams, activeTab } = useCurrentTab();

    const onTabClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        const tabIndex = event.currentTarget.dataset.tabIndex;

        if (tabIndex) {
            searchParams.set('tab', tabIndex);
            setSearchParams(searchParams);
        }
    }, [ searchParams, setSearchParams ]);

    return (
        <Page
            id='plexBotIndexPage'
            title='PlexBot'
            className='mainAnimatedPage libraryPage'
        >

            <div className='padded-left padded-right padded-bottom-page'>

                <h1>Dashboard</h1>
                <Routes>
                    {
                        TabRoutes.map(route => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Tabs
                                        value={activeTab}
                                        sx={{
                                            width: '100%',
                                            flexShrink: {
                                                xs: 0,
                                                lg: 'unset'
                                            },
                                            order: {
                                                xs: 100,
                                                lg: 'unset'
                                            }
                                        }}
                                    >
                                        {
                                            route.tabs.map(({ index, label }) => (
                                                <Tab
                                                    key={`${route.path}-tab-${index}`}
                                                    label={label}
                                                    data-tab-index={`${index}`}
                                                    onClick={onTabClick}
                                                />
                                            ))
                                        }
                                    </Tabs>
                                }
                            />
                        ))
                    }
                </Routes>
            </div>

        </Page>
    );
};

export default Dashboard;

