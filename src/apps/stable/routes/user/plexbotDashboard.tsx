import React, { FunctionComponent } from 'react';
import globalize from '../../../../scripts/globalize';

import Page from '../../../../components/Page';

const PlexBotDashboard: FunctionComponent = () => {
    return (
        <Page
            id='plexBotIndexPage'
            title='PlexBot'
            className='mainAnimatedPage libraryPage userPreferencesPage userPasswordPage noSecondaryNavPage'
        >
            <h1>Plex Bot</h1>
        </Page>
    );
};

export default PlexBotDashboard;
