// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-no-bind */

import React, { FunctionComponent, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetPlexBotProviders } from 'hooks/useGetPlexProviders';
import Page from '../../../../components/Page';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { categories } from './utils';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { IPlexBotPaginatedResponse, IProviderSearch } from './types';
import { ProviderApiRequestFactory } from '../../../../utils/plex-bot-ts/apis/ProviderApi';
import { createConfiguration } from 'utils/plex-bot-ts';

const BASE_URL = '/plexbot/api/providers';

const Search: FunctionComponent = () => {
    const [currentProvider, setCurrentProvider] = React.useState('');
    const [currentCategory, setCurrentCategory] = React.useState('');
    const [search, setSearch] = React.useState('');

    const [shouldFetch, setShouldFetch] = useState(false);

    const handleProviderChange = (event: SelectChangeEvent) => {
        setCurrentProvider(event.target.value as string);
    };
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCurrentCategory(event.target.value as string);
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value as string);
    };

    const { data: plexProviders, isLoading } = useGetPlexBotProviders();

    const fetchSearch = async () => {
        if (!window) throw new Error('Window is not available');

        // add body to the request
        // eslint-disable-next-line sonarjs/prefer-immediate-return
        const response = await window.ApiClient
            .getJSON(window.ApiClient.getUrl(`${BASE_URL}/f50f9f1b-5bc5-498d-a575-ea412149862b/search`, {
                category: 0,
                query: search
            }), true)
            .then((res) => res);

        return response as IPlexBotPaginatedResponse<IProviderSearch>;
    };

    const { isLoading: isSearchLoading, data: searchResult } = useQuery([ 'GetSearch'], fetchSearch, {
        enabled: shouldFetch
    });

    console.log({ plexProviders }, 'plexProviders');

    return (
        <Page
            id='plexBotIndexPage'
            title='PlexBot'
            className='mainAnimatedPage libraryPage'
        >

            <div className='padded-left padded-right padded-bottom-page'>

                <h1>Search</h1>

                { isLoading && <div>Loading...</div>}

                { !isLoading && plexProviders && (
                    <Box
                        component='form'
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' }
                        }}
                        noValidate
                        autoComplete='off'
                    >
                        <FormControl>

                            <InputLabel id='provider-select-input'>Providers</InputLabel>
                            <Select
                                labelId='provider-select-label'
                                id='provider-select'
                                value={currentProvider}
                                label='Provider'
                                onChange={handleProviderChange}
                            >
                                {plexProviders.map((provider) => (
                                    <MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id='category-input'>Category</InputLabel>
                            <Select
                                labelId='category-select-label'
                                id='category-select'
                                value={currentCategory}
                                label='Category'
                                onChange={handleCategoryChange}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>{category}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        <TextField
                            id='outlined-search-field'
                            value={search}
                            onChange={handleSearchChange}
                            label='Search'
                            variant='outlined'
                        />
                        <Button variant='outlined' onClick={() => setShouldFetch(true)}>Search</Button>
                    </Box>
                )}

                {
                    searchResult && !isSearchLoading && (
                        <div>
                            <h2>Search Results</h2>
                            <ul>
                                {searchResult.items.map((result) => (
                                    <li key={result.title}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                component='img'
                                                alt='img thumbnail'
                                                height='140'
                                                image={result.thumbnailUrl}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant='h5' component='div'>
                                                    {result.title}
                                                </Typography>
                                                <Typography variant='body2' color='text.secondary'>
                                                    {result.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }

            </div>

        </Page>
    );
};

export default Search;
