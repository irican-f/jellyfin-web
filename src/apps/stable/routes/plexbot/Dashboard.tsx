// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-no-bind */

import React, { FunctionComponent, useCallback } from 'react';

import { Routes, Route } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';

import PlexBotDashboard from './PlexBotDashnboard/PlexbotDashboard';
import useCurrentTab from 'hooks/useCurrentTab';
import Page from 'components/Page';
import Search from './Search/Search';

const TabRoutes = [
    {
        path: '/',
        tabs: [
            {
                index: 0,
                label: 'Dashboard'
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
                {TabRoutes.map(route =>
                    route.tabs.map(({ index, label }) => (
                        <Tab
                            key={`${route.path}-tab-${index}`}
                            label={label}
                            data-tab-index={`${index}`}
                            onClick={onTabClick}
                        />
                    ))
                )}
            </Tabs>

            <Routes>
                {TabRoutes.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <Box sx={{
                                paddingTop:10
                            }}>
                                {activeTab === 0 && (
                                    <PlexBotDashboard />
                                )}
                                {activeTab === 1 && (
                                    <Search />
                                )}
                            </Box>
                        }
                    />
                ))}
            </Routes>

        </Page>

    );
};

export default Dashboard;

